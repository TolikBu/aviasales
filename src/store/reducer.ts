import { SET_PRICE_FILTER, SET_TRANSFER_FILTERS, REQUEST_SEARCH_ID, SET_ERROR, SET_LOADING, REQUEST_TICKETS, REQUEST_MORE_TICKETS } from './actionTypes';
import { Action } from './actions';
import { IAppState } from '../types/IAppState';
import { FilterPrices } from '../types/FiterPrices';

const TICKETS_PER_REQUEST = 5;

const initialState: IAppState = {
  filterPrice: FilterPrices.Cheap,
  transferFilters: [],
  searchId: null,
  error: null,
  tickets: [],
  isLoading: true,
  currentTicketsCount: 0,
  total: 0,
  stop: false,
};

export const reducer = (state = initialState, action: Action): IAppState => {
  switch (action.type) {
    case SET_PRICE_FILTER:
      return { ...state, filterPrice: action.payload };
    case SET_TRANSFER_FILTERS:
      return { ...state, transferFilters: action.payload };
    case REQUEST_SEARCH_ID:
      return { ...state, searchId: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    case REQUEST_TICKETS: {
      const { tickets, stop } = action.payload;
      const newTickets = [...state.tickets, ...tickets];
      return {
        ...state,
        error: null,
        isLoading: false,
        tickets: newTickets,
        total: state.total + tickets.length,
        stop,
      };
    }
    case REQUEST_MORE_TICKETS: {
      return {
        ...state,
        currentTicketsCount: Math.min(state.currentTicketsCount + TICKETS_PER_REQUEST, state.total),
      };
    }
    default:
      return state;
  }
};
