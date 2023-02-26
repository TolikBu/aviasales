import { FC, useState, useRef } from 'react';

import { TData } from '../../types/Data';
import List from '../List/List';
import Filter from '../Filter/Filter';
import logo from '../../assets/logoo.svg';

import classes from './App.module.sass';

const App: FC = () => {
  const [data, setData] = useState([
    {
      id: 1,
      price: 13400,
      time: '21ч 15м',
      airport: 'HKG, JNB',
    },
    {
      id: 2,
      price: 12400,
      time: '3ч 15м',
      airport: 'HKG, JNB',
    },
    {
      id: 3,
      price: 8400,
      time: '8ч 15м',
      airport: 'HKG, JNB',
    },
    {
      id: 4,
      price: 22400,
      time: '17ч 15м',
      airport: 'HKG, JNB',
    },
    {
      id: 5,
      price: 2400,
      time: '13ч 15м',
      airport: 'HKG, JNB',
    },
  ] as TData[]);

  const lastId = useRef(data.length);

  const addNewCard = (): void => {
    const id = lastId.current + 1;
    lastId.current = id;
    const newData = [...data];
    const itemData = {
      id,
      price: 13400,
      time: '21ч 15м',
      airport: 'HKG, JNB',
    };

    newData.push(itemData);

    setData(newData);
  };

  return (
    <div className={classes.app}>
      <div className={classes['image-block']}>
        <img src={logo} alt="logo" className={classes.image} />
      </div>
      <div className={classes['content']}>
        <Filter />
        <List data={data} addNewCard={addNewCard} />
      </div>
    </div>
  );
};

export default App;
