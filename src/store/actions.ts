import { AppDispatch } from './store';
import { REQUEST_MORE_TICKETS, REQUEST_SEARCH_ID, REQUEST_TICKETS, SET_ERROR, SET_LOADING, SET_PRICE_FILTER, SET_TRANSFER_FILTERS } from './actionTypes';
import { api } from '../api/api';
import { ITicket } from '../types/ITicket';
import { FilterPrices } from '../types/FiterPrices';
import { TransferFilters } from '../types/TransferFilters';
import { IAppState } from '../types/IAppState';

export interface SetPriceFilterAction {
  type: typeof SET_PRICE_FILTER;
  payload: FilterPrices;
}

export interface SetTransferFiltersAction {
  type: typeof SET_TRANSFER_FILTERS;
  payload: TransferFilters[];
}

export interface RequestSearchIdAction {
  type: typeof REQUEST_SEARCH_ID;
  payload: string;
}

export interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string | null;
}

export interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

export interface RequestTicketsAction {
  type: typeof REQUEST_TICKETS;
  payload: {
    tickets: ITicket[];
    stop: boolean;
  };
}

export interface RequestMoreTickets {
  type: typeof REQUEST_MORE_TICKETS;
}

export type Action = SetPriceFilterAction | SetTransferFiltersAction | SetErrorAction | SetLoadingAction | RequestSearchIdAction | RequestTicketsAction | RequestMoreTickets;

const setPriceFilter = (filter: FilterPrices): SetPriceFilterAction => {
  return { type: SET_PRICE_FILTER, payload: filter };
};

const setTransferFilters = (filters: TransferFilters[]): SetTransferFiltersAction => {
  return { type: SET_TRANSFER_FILTERS, payload: filters };
};

const setError = (error: string | null): SetErrorAction => {
  return { type: SET_ERROR, payload: error };
};

const setLoading = (value: boolean): SetLoadingAction => {
  return { type: SET_LOADING, payload: value };
};

const requestSearchId = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const id = await api.getSearchId();
      dispatch({ type: REQUEST_SEARCH_ID, payload: id });

      return id;
    } catch (error) {
      let message = 'Unknown error';
      if (error instanceof Error) {
        message = error.message;
      }

      dispatch(setError(message));
      return null;
    }
  };
};

const requestTickets = (searchId: string) => {
  return async (dispatch: AppDispatch, getState: () => IAppState) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const state = getState();
    if (state.total <= state.currentTicketsCount) {
      try {
        const { tickets, stop } = await api.getTickets(searchId);
        dispatch({ type: REQUEST_TICKETS, payload: { tickets, stop } });
      } catch (error) {
        let message = 'Unknown error';
        if (error instanceof Error) {
          message = error.message;
        }

        dispatch(setError(message));
        dispatch(setLoading(false));
        return false;
      }
    }

    dispatch({ type: REQUEST_MORE_TICKETS });
    dispatch(setLoading(false));

    return true;
  };
};

export const actions = {
  setPriceFilter,
  setTransferFilters,
  requestSearchId,
  requestTickets,
};
