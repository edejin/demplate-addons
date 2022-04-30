#!/usr/bin/env node

const inquirer = require("inquirer");
const fsExtra = require('fs-extra');
const fs = require('fs');

inquirer
  .prompt([
    {
      type: "list",
      name: "addon",
      message: "Select addon",
      choices: [
        ...fs.readdirSync('./node_modules/demplate-addons/addons/', {withFileTypes: true})
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
        fsExtra.copySync(`./node_modules/demplate-addons/addons/${addon}/template`, '.', {
          overwrite: true
        });
        const rawDataAddon = fs.readFileSync(`node_modules/demplate-addons/addons/${addon}/template.json`);
        const rawDataPackage = fs.readFileSync(`./package.json`);
        const {
          package: {
            dependencies = {},
            devDependencies = {}
          }
        } = JSON.parse(rawDataAddon);
        const packageJson = JSON.parse(rawDataPackage);
        fs.writeFileSync('./package.json', JSON.stringify({
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
  });