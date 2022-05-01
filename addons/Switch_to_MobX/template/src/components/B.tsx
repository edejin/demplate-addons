import React from 'react';
import {T} from '@/components/Translate';
import {testStore} from '@/store/test';
import {Button} from 'antd';
import {observer} from 'mobx-react-lite';

export const B = observer(() => {
  const {b} = testStore;
  return (
    <div>
      <p><T z="{value, plural, one {{value} item} other {{value} items}}" values={{value: b}}/></p>
      <Button onClick={() => testStore.addB()}>+</Button>
      <Button onClick={() => testStore.clearB()}>0</Button>
    </div>
  );
});
