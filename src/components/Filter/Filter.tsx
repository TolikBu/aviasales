import React from 'react';
import { connect } from 'react-redux';
import classes from './Filter.module.sass';

import { ETransferFilters } from '../../types/ETransferFilters';
import { AppDispatch } from '../../store/store';
import { actions } from '../../store/actions';
import { IAppState } from '../../types/IAppState';

interface ITransferPanelProps {
  currentFilters: ETransferFilters[];
  setTransferFilters: (type: ETransferFilters[]) => void;
}

const filters = [
  { name: 'none', type: ETransferFilters.None, label: 'Без пересадок' },
  { name: 'one', type: ETransferFilters.One, label: '1 пересадка' },
  { name: 'two', type: ETransferFilters.Two, label: '2 пересадки' },
  { name: 'three', type: ETransferFilters.Three, label: '3 пересадки' },
];

export const TransferPanel: React.FC<ITransferPanelProps> = ({ setTransferFilters, currentFilters }) => {
  const onCheckAll = (checked: boolean) => {
    const newFilters: ETransferFilters[] = [];
    if (checked) {
      filters.forEach((option) => {
        newFilters.push(option.type);
      });
    }

    setTransferFilters(newFilters);
  };

  const onCheckFilter = (type: ETransferFilters, checked: boolean) => {
    if (checked) {
      setTransferFilters([...currentFilters, type]);
    } else {
      const newFilters: ETransferFilters[] = [...currentFilters];
      const idx = currentFilters.findIndex((v) => v === type);
      if (idx !== -1) {
        newFilters.splice(idx, 1);
      }

      setTransferFilters(newFilters);
    }
  };

  const onChangeHandler = (name: string, checked: boolean, type?: ETransferFilters) => {
    if (name === 'all') {
      onCheckAll(checked);
    } else if (type != null) {
      onCheckFilter(type, checked);
    }
  };

  const renderFilter = (name: string, label: string, checked: boolean, type?: ETransferFilters) => {
    const id = `transfer-${name}`;
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangeHandler(name, e.target.checked, type);
    };

    return (
      <li key={id} className={classes['checkbox-item']}>
        <label className={classes['checkbox-label']} htmlFor={id}>
          <input type="checkbox" id={id} name={name} checked={checked} onChange={onChange} />
          <span className={classes.checkbox}></span>
          <span>{label}</span>
        </label>
      </li>
    );
  };
  return (
    <div className={classes['transfer-panel']}>
      <h3 className={classes.title}>Количество пересадок</h3>
      <ul className={classes.inputs}>
        {renderFilter('all', 'Все', currentFilters.length === filters.length)}
        {filters.map((item) => {
          const checked = currentFilters.includes(item.type);

          return renderFilter(item.name, item.label, checked, item.type);
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  return {
    currentFilters: state.transferFilters,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    setTransferFilters: (filters: ETransferFilters[]) => {
      return dispatch(actions.setTransferFilters(filters));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransferPanel);
