#!/usr/bin/env node

const inquirer = require("inquirer");
const fsExtra = require('fs-extra');
const fs = require('fs');
const { exec } = require('child_process');

const dirPath = './node_modules/demplate-addons/addons/';

const ifYarn = () => fs.existsSync('./yarn.lock');

const mergeJson = (from, to) => {

  const rawDataAddon = fs.readFileSync(from);
  const rawDataPackage = fs.readFileSync(to);
  const {
    package: {
      dependencies = {},
      devDependencies = {}
    }
  } = JSON.parse(rawDataAddon);
  const packageJson = JSON.parse(rawDataPackage);
  fs.writeFileSync(to, JSON.stringify({
    ...packageJson,
    dependencies: {
      ...(packageJson.dependencies || {}),
      ...dependencies
    },
    devDependencies: {
      ...(packageJson.devDependencies || {}),
      ...devDependencies
    }
  }, null, 2));
}

inquirer
  .prompt([
    {
      type: "list",
      name: "addon",
      message: "Select addon",
      choices: [
        ...fs.readdirSync(dirPath, {withFileTypes: true})
          .filter(dirent => dirent.isDirectory())
          .map(dirent => dirent.name),
        "exit"]
    }
  ])
  .then((answers) => {
    const {
      addon
    } = answers;
    switch (addon) {
      case 'exit':
        break;
      default:
        fsExtra.copySync(`${dirPath}${addon}/template`, '.', {
          overwrite: true
        });
        mergeJson(`${dirPath}${addon}/template.json`, `./package.json`);
        if (ifYarn()) {
          exec('yarn')
        } else {
          exec('npm install')
        }
    }
  });