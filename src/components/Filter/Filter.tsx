import classes from './Filter.module.sass';

function Filter(): JSX.Element {
  return (
    <div className={classes['filter']}>
      <div className={classes['title']}>Количество пересадок</div>
      <label className={classes['item']}>
        <input name="brands[]" value="1" type="checkbox" className={classes['checkbox']} />
        Все
      </label>
      <label className={classes['item']}>
        <input name="brands[]" value="1" type="checkbox" className={classes['checkbox']} />
        Без пересадок
      </label>
      <label className={classes['item']}>
        <input name="brands[]" value="1" type="checkbox" className={classes['checkbox']} />1 пересадка
      </label>
      <label className={classes['item']}>
        <input name="brands[]" value="1" type="checkbox" className={classes['checkbox']} />2 пересадки
      </label>
      <label className={classes['item']}>
        <input name="brands[]" value="1" type="checkbox" className={classes['checkbox']} />3 пересадки
      </label>
    </div>
  );
}

export default Filter;
