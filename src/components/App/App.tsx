import { FC, useEffect } from 'react';
import { connect } from 'react-redux';

import classes from './App.module.sass';

import Loader from '../Loader/Loader';
import TicketList from '../TicketList/TicketList';
import Filter from '../Filter/Filter';
import FilterPrice from '../FilterPrice/FilterPrice';
import BottomButton from '../BottomButton/BottomButton';
import logo from '../../assets/logoo.svg';
import Alert from '../Alert/Alert';
import { ITicket } from '../../types/ITicket';
import { AppDispatch } from '../../store/store';
import { actions } from '../../store/actions';
import { IAppState } from '../../types/IAppState';
import { EFilterPrices } from '../../types/EFiterPrices';
import { ETransferFilters } from '../../types/ETransferFilters';

interface IAppProps {
  requestSearchId: () => Promise<string | null>;
  requestTickets: (searchId: string) => Promise<boolean>;
  searchId: string | null;
  error: string | null;
  isLoading: boolean;
  tickets: ITicket[];
  filterPrice: EFilterPrices;
  transferFilters: ETransferFilters[];
  currentTicketsCount: number;
  stop: boolean;
}

const getTotalDuration = (ticket: ITicket) => {
  const segA = ticket.segments[0];
  const segB = ticket.segments[1];

  return segA.duration + segB.duration;
};

const sortByCheapPrice = (ticketA: ITicket, ticketB: ITicket) => {
  return ticketA.price - ticketB.price;
};

const sortByDuration = (ticketA: ITicket, ticketB: ITicket) => {
  const dA = getTotalDuration(ticketA);
  const dB = getTotalDuration(ticketB);

  return dA - dB;
};

const sortByOptimal = (ticketA: ITicket, ticketB: ITicket) => {
  const byPrice = sortByCheapPrice(ticketA, ticketB) / 10;
  const byDuration = sortByDuration(ticketA, ticketB);
  return byPrice + byDuration;
};

const filterByTransferFilters = (filters: ETransferFilters[], ticket: ITicket) => {
  if (filters.length === 0) return true;

  let valid = false;
  const stopsA = ticket.segments[0].stops;
  const stopsB = ticket.segments[1].stops;
  if (filters.includes(ETransferFilters.None)) {
    valid = stopsA.length === 0 || stopsB.length === 0;
  } else if (filters.includes(ETransferFilters.One)) {
    valid = stopsA.length === 1 || stopsB.length === 1;
  } else if (filters.includes(ETransferFilters.Two)) {
    valid = stopsA.length === 2 || stopsB.length === 2;
  } else if (filters.includes(ETransferFilters.Three)) {
    valid = stopsA.length === 3 || stopsB.length === 3;
  }

  return valid;
};

const processTickets = (tickets: ITicket[], filterPrice: EFilterPrices, transferFilters: ETransferFilters[], currentCount: number) => {
  const newTickets = tickets.slice(0, currentCount);

  if (filterPrice === EFilterPrices.Cheap) {
    newTickets.sort(sortByCheapPrice);
  } else if (filterPrice === EFilterPrices.Fastest) {
    newTickets.sort(sortByDuration);
  } else if (filterPrice === EFilterPrices.Optimal) {
    newTickets.sort(sortByOptimal);
  }

  return newTickets.filter((ticket) => {
    return filterByTransferFilters(transferFilters, ticket);
  });
};

const App: FC<IAppProps> = ({ requestSearchId, requestTickets, searchId, tickets, error, isLoading, filterPrice, transferFilters, currentTicketsCount, stop }) => {
  useEffect(() => {
    requestSearchId().then((id) => {
      if (id != null) {
        requestTickets(id);
      }
    });
  }, []);

  const onClickMore = () => {
    if (searchId != null) {
      requestTickets(searchId);
    }
  };

  const processedTickets = processTickets(tickets, filterPrice, transferFilters, currentTicketsCount);

  const renderStatus = () => {
    if (isLoading) {
      return <Loader className={classes.loader}></Loader>;
    }

    if (error) {
      return <Alert message={error} className={classes.status} type="error"></Alert>;
    }

    if (processedTickets.length === 0) {
      return <Alert message="Not found" className={classes.status} type="info"></Alert>;
    }

    return null;
  };

  const canLoadMore = !isLoading && !stop;
  return (
    <div className={classes.container}>
      <div className={classes['image-block']}>
        <img src={logo} alt="logo" className={classes.image} />
      </div>
      <main className={classes.main}>
        <div className={classes.left}>
          <Filter />
        </div>
        <div className={classes.right}>
          <FilterPrice />
          <TicketList tickets={processedTickets} />
          <div className={classes['right-bottom']}>
            {renderStatus()}
            {canLoadMore && (
              <BottomButton className={classes['more-btn']} onClick={onClickMore}>
                Показать еще 5 билетов!
              </BottomButton>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  return {
    searchId: state.searchId,
    error: state.error,
    tickets: state.tickets,
    isLoading: state.isLoading,
    filterPrice: state.filterPrice,
    transferFilters: state.transferFilters,
    currentTicketsCount: state.currentTicketsCount,
    stop: state.stop,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    requestSearchId: () => {
      return dispatch(actions.requestSearchId());
    },
    requestTickets: (searchId: string) => {
      return dispatch(actions.requestTickets(searchId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
