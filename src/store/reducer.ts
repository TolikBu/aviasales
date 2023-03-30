import { SET_PRICE_FILTER, SET_TRANSFER_FILTERS, SET_SEARCH_ID, SET_ERROR, SET_LOADING, REQUEST_MORE_TICKETS, ADD_TICKETS } from './actionTypes';
import { Action } from './actions';
import { IAppState } from '../types/IAppState';
import { EFilterPrices } from '../types/EFiterPrices';

const TICKETS_PER_REQUEST = 5;

const initialState: IAppState = {
  filterPrice: EFilterPrices.Cheap,
  transferFilters: [],
  searchId: null,
  error: null,
  tickets: [],
  isLoading: false,
  currentTicketsCount: TICKETS_PER_REQUEST,
};

export const reducer = (state = initialState, action: Action): IAppState => {
  switch (action.type) {
    case SET_PRICE_FILTER:
      return { ...state, filterPrice: action.payload };
    case SET_TRANSFER_FILTERS:
      return { ...state, transferFilters: action.payload };
    case SET_SEARCH_ID:
      return { ...state, searchId: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    case ADD_TICKETS:
      return { ...state, tickets: state.tickets.concat(action.payload) };

    case REQUEST_MORE_TICKETS: {
      return {
        ...state,
        currentTicketsCount: Math.min(state.currentTicketsCount + TICKETS_PER_REQUEST, state.tickets.length),
      };
    }
    default:
      return state;
  }
};
