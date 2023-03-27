import { FC } from 'react';

import format from 'date-fns/format';
import classes from './Ticket.module.sass';

import { ITicket } from '../../types/ITicket';

interface ITicketProps {
  data: ITicket;
}

const pad = (num: number) => {
  return `0${num}`.slice(-2);
};

const minsToMS = (mins: number) => {
  return mins * 60 * 1000;
};

const formatTransfersAmount = (amount: number) => {
  if (amount === 0) {
    return 'Без пересадок';
  }

  if (amount === 1) {
    return '1 пересадка';
  }

  return `${amount} пересадки`;
};

const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return `${pad(hours)}:${pad(minutes)}`;
};

const formatTime = (date: string, duration: number) => {
  const dateA = new Date(date);
  const dateB = new Date(dateA.getTime() + minsToMS(duration));

  const pattern = 'kk:mm';
  return `${format(dateA, pattern)} - ${format(dateB, pattern)}`;
};

const formatTransfers = (transfers: string[]) => {
  return transfers.join(', ');
};

const Ticket: FC<ITicketProps> = ({ data }) => {
  const { price, carrierLogoPath } = data;
  const segA = data.segments[0];
  const segB = data.segments[1];
  return (
    <div className={classes.ticket}>
      <div className={classes.header}>
        <div className={classes.price}>
          {price.toLocaleString('ru-RU', {
            style: 'currency',
            currency: 'RUB',
          })}
        </div>
        <img src={carrierLogoPath} alt="Logo" className={classes.logo} />
      </div>
      <div className={classes.body}>
        <ul className={classes.rows}>
          <li className={classes.row}>
            <div className={classes.col}>
              <div className={classes.label}>
                {segA.origin} – {segA.destination}
              </div>
              <div className={classes.text}>{formatTime(segA.date, segA.duration)}</div>
            </div>
            <div className={classes.col}>
              <div className={classes.label}>В пути</div>
              <div className={classes.text}>{formatDuration(segA.duration)}</div>
            </div>
            <div className={classes.col}>
              <div className={classes.label}>{formatTransfersAmount(segA.stops.length)}</div>
              <div className={classes.text}>{formatTransfers(segA.stops)}</div>
            </div>
          </li>
          <li className={classes.row}>
            <div className={classes.col}>
              <div className={classes.label}>
                {segA.origin} – {segB.destination}
              </div>
              <div className={classes.text}>{formatTime(segB.date, segB.duration)}</div>
            </div>
            <div className={classes.col}>
              <div className={classes.label}>В пути</div>
              <div className={classes.text}>{formatDuration(segB.duration)}</div>
            </div>
            <div className={classes.col}>
              <div className={classes.label}>{formatTransfersAmount(segB.stops.length)}</div>
              <div className={classes.text}>{formatTransfers(segB.stops)}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Ticket;
