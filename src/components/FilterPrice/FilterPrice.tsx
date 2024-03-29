import React from 'react';
import { useDispatch, connect } from 'react-redux';
import classNames from 'classnames';

import classes from './FilterPrice.module.sass';
import { actions } from '../../store/actions';
import { AppDispatch } from '../../store/store';
import { EFilterPrices } from '../../types/EFiterPrices';
import { IAppState } from '../../types/IAppState';

const items = [
  { type: EFilterPrices.Cheap, label: 'Самый дешевый' },
  { type: EFilterPrices.Fastest, label: 'Самый быстрый' },
  { type: EFilterPrices.Optimal, label: 'Оптимальный' },
];

interface IPriceFilterProps {
  className?: string;
  currentPriceFilter: EFilterPrices;
}

const FilterPrice: React.FC<IPriceFilterProps> = ({ className, currentPriceFilter }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className={classNames(classes['price-filter'], className)}>
      <ul className={classes.list}>
        {items.map((item) => {
          const isActive = item.type === currentPriceFilter;
          const onClick = () => {
            dispatch(actions.setPriceFilter(item.type));
          };
          return (
            <li key={item.type} className={classNames(classes.item, isActive && classes['item-active'])}>
              <button type="button" onClick={onClick} className={classes['item-btn']}>
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  return {
    currentPriceFilter: state.filterPrice,
  };
};

export default connect(mapStateToProps)(FilterPrice);
