import { FC } from 'react';
import classNames from 'classnames';

import Card from '../Card/Card';
import { TData } from '../../types/Data';

import classes from './List.module.sass';

interface Props {
  data: TData[];
  addNewCard: () => void;
}

const List: FC<Props> = ({ data, addNewCard }) => {
  return (
    <div className={classes.list}>
      <div className={classes['fast-filter']}>
        <div className={classNames(classes['btn-active'], classes.btn)}>Самый дешевый</div>
        <div className={classNames(classes['btn'])}>Самый быстрый</div>
        <div className={classNames(classes['btn'])}>Оптимальный</div>
      </div>
      {data.map((data: TData) => {
        return <Card key={data.id} data={data} />;
      })}
      <div className={classes['btn-more']} onClick={addNewCard}>
        Показать еще 5 билетов!
      </div>
    </div>
  );
};

export default List;
