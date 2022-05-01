import React, { useCallback, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { log } from '@/utils';
import { ConfigProvider } from 'antd';
import { StyleSheetManager } from 'styled-components';
import rtlcss from 'stylis-rtlcss';
import {Locale, localeStore, RTLLocales} from '@/store/locale';
import { GlobalStyle } from './GlobalStyles';

import enWords from '@/assets/translates/en.json';
import enGB from 'antd/lib/locale/en_GB';

import arWords from '@/assets/translates/ar.json';
import arEG from 'antd/lib/locale/ar_EG';
import {HashRouter} from 'react-router-dom';
import {observer} from 'mobx-react-lite';

const vocabulary: Record<Locale, any> = {
  [Locale.EN]: enWords,
  [Locale.AR]: arWords
};

const antVocabulary = {
  [Locale.EN]: enGB,
  [Locale.AR]: arEG
}

const direction = (locale: Locale) => RTLLocales.includes(locale) ? 'rtl' : 'ltr';

export const Providers: React.FC = observer(({ children }: React.PropsWithChildren<{}>) => {
  const {
    locale
  } = localeStore;

  const errorHandler = useCallback((data) => {
    const { code, descriptor: { id } } = data;
    if (code === 'MISSING_TRANSLATION') {
      log(`Cannot find translate "${id}" in "${locale}"`);
    } else {
      log(data);
    }
  }, [locale]);

  useEffect(() => {
    document.documentElement.dir = direction(locale);
  }, [locale]);

  return (
    <StyleSheetManager {...(direction(locale) === 'rtl' ? { stylisPlugins: [rtlcss] } : {})}>
      <>
        <GlobalStyle />
        <ConfigProvider locale={antVocabulary[locale]} direction={direction(locale)}>
          <IntlProvider locale={locale} messages={vocabulary[locale]} onError={errorHandler}>
            <HashRouter>
              {children}
            </HashRouter>
          </IntlProvider>
        </ConfigProvider>
      </>
    </StyleSheetManager>
  );
});
