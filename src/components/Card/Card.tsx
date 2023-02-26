import { FC } from 'react';

import logo from '../../assets/logo-company.png';
import { TData } from '../../types/Data';

import style from './Card.module.sass';

interface TaskProps {
  data: TData;
}

const Card: FC<TaskProps> = ({ data }) => {
  return (
    <div className={style.card}>
      <div className={style['card-header']}>
        <div className={style['price']}>{data.price} Р</div>
        <img src={logo} alt="" className={style['logo-company']} />
      </div>
      <div className={style['info-flight']}>
        <div className={style['route']}>
          <span className={style['title']}>{data.airport}</span>
          <span className={style['text']}>{data.time}</span>
        </div>
        <div className={style['length']}>
          <span className={style['title']}>В пути</span>
          <span className={style['text']}>{data.time}</span>
        </div>
        <div className={style['stops']}>
          <span className={style['title']}>2 пересадки</span>
          <span className={style['text']}>{data.airport}</span>
        </div>
      </div>
      <div className={style['info-flight']}>
        <div className={style['route']}>
          <span className={style['title']}>{data.airport}</span>
          <span className={style['text']}>{data.time}</span>
        </div>
        <div className={style['length']}>
          <span className={style['title']}>В пути</span>
          <span className={style['text']}>{data.time}</span>
        </div>
        <div className={style['stops']}>
          <span className={style['title']}>1 пересадки</span>
          <span className={style['text']}>{data.airport}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
