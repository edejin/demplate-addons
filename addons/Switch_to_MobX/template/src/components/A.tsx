import React, {useEffect} from 'react';
import {T} from '@/components/Translate';
import {Button} from 'antd';
import {log} from '@/utils';
import {FieldTimeOutlined} from '@ant-design/icons';
import {testStore} from '@/store/test';
import {observer} from 'mobx-react-lite';

export const A = observer(() => {
  const {a} = testStore;

  useEffect(() => {
    log('Rerender A!!!');
  });
  return (
    <div>
      <T z="text <span>{value}</span>." values={{span: (chunks: any) => <span>{chunks}</span>, value: a}}/>
      <Button onClick={() => testStore.addA()}>+</Button>
      <Button onClick={() => testStore.removeA()}>-</Button>
      <Button onClick={() => testStore.addAWithDelay(3000)}>
        <FieldTimeOutlined/>
      </Button>
    </div>
  );
});
