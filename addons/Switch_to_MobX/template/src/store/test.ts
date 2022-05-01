import {sleep} from '@/utils';
import {action, makeObservable, observable} from 'mobx';

class TestStore {
  a: number = 0;
  b: number = 0;

  constructor() {
    makeObservable(this, {
      a: observable,
      b: observable,
      addA: action,
      removeA: action,
      addB: action,
      clearB: action
    })
  }

  addA() {
    this.a++;
  }

  removeA() {
    this.a--;
  }

  addB() {
    this.b++;
  }

  clearB() {
    this.b = 0;
  }

  addAWithDelay = async (d: number) => {
    await sleep(d);
    this.addA();
  }
}

export const testStore = new TestStore();
