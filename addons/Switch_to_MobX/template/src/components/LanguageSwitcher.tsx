import React from 'react';
import {Locale, localeStore} from '@/store/locale';
import styled from 'styled-components';
import {TranslationOutlined} from '@ant-design/icons';
import {observer} from 'mobx-react-lite';

const Wrapper = styled.div`
  float: right;
  /* 'rtl:ignore' cannot be first line :)  */
  /* rtl:ignore */
  border-right: 1px solid red;
  padding: 0 8px;
  font-size: 16px;
  cursor: pointer;
`;

export const LanguageSwitcher = observer(() => {
  const {
    locale
  } = localeStore;

  return (
    <Wrapper onClick={() => localeStore.setLocale(locale === Locale.EN ? Locale.AR : Locale.EN)}>
      <TranslationOutlined/>
    </Wrapper>
  );
});
