import {action, makeObservable, observable} from 'mobx';

export enum Locale {
  EN = 'en',
  AR = 'ar'
}

const defaultLocale = Locale.EN;

export const RTLLocales = [Locale.AR];

class LocaleStore {
  locale: Locale;

  constructor() {
    makeObservable(this, {
      locale: observable,
      setLocale: action
    })
    this.locale = (localStorage.getItem('locale_mobx') as Locale) || defaultLocale;
  }

  setLocale(v: Locale) {
    localStorage.setItem('locale_mobx', v);
    this.locale = v;
  }
}

export const localeStore = new LocaleStore();
