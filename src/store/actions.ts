import { AppDispatch } from './store';
import { REQUEST_MORE_TICKETS, ADD_TICKETS, SET_ERROR, SET_LOADING, SET_PRICE_FILTER, SET_SEARCH_ID, SET_TRANSFER_FILTERS } from './actionTypes';
import { api } from '../api/api';
import { ITicket } from '../types/ITicket';
import { EFilterPrices } from '../types/EFiterPrices';
import { ETransferFilters } from '../types/ETransferFilters';
import { IAppState } from '../types/IAppState';

export interface SetPriceFilterAction {
  type: typeof SET_PRICE_FILTER;
  payload: EFilterPrices;
}

export interface SetTransferFiltersAction {
  type: typeof SET_TRANSFER_FILTERS;
  payload: ETransferFilters[];
}

export interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string | null;
}

export interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

export interface AddTicketsAction {
  type: typeof ADD_TICKETS;
  payload: ITicket[];
}

export interface RequestMoreTicketsAction {
  type: typeof REQUEST_MORE_TICKETS;
}

export interface SetSearchIdAction {
  type: typeof SET_SEARCH_ID;
  payload: string;
}

export type Action = SetPriceFilterAction | SetTransferFiltersAction | SetErrorAction | SetLoadingAction | AddTicketsAction | RequestMoreTicketsAction | SetSearchIdAction;

const setPriceFilter = (filter: EFilterPrices): SetPriceFilterAction => {
  return { type: SET_PRICE_FILTER, payload: filter };
};

const setTransferFilters = (filters: ETransferFilters[]): SetTransferFiltersAction => {
  return { type: SET_TRANSFER_FILTERS, payload: filters };
};

const setError = (error: string | null): SetErrorAction => {
  return { type: SET_ERROR, payload: error };
};

const setLoading = (value: boolean): SetLoadingAction => {
  return { type: SET_LOADING, payload: value };
};

const setSearchId = (value: string): SetSearchIdAction => {
  return { type: SET_SEARCH_ID, payload: value };
};

const addTickets = (value: ITicket[]): AddTicketsAction => {
  return { type: ADD_TICKETS, payload: value };
};
const requestMoreTickets = (): RequestMoreTicketsAction => {
  return { type: REQUEST_MORE_TICKETS };
};

const requestSearchId = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const id = await api.getSearchId();
      dispatch(setSearchId(id));

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

const requestAllTickets = () => {
  return async (dispatch: AppDispatch, getState: () => IAppState) => {
    const searchId = getState().searchId || '';
    dispatch(setLoading(true));
    dispatch(setError(null));

    let stop = false;
    let tries = 0;
    const fetch = async () => {
      while (!stop) {
        try {
          const data = await api.getTickets(searchId);
          dispatch(addTickets(data.tickets));
          stop = data.stop;
          tries = 0;
          await fetch();
        } catch (error) {
          tries++;
          if (tries <= 3) {
            await fetch();
            continue;
          }
          let message = 'Unknown error';
          if (error instanceof Error) {
            message = error.message;
          }
          stop = true;
          dispatch(setError(message));
        }
      }
    };
    await fetch();
    dispatch(setLoading(false));
  };
};

export const actions = {
  setPriceFilter,
  setTransferFilters,
  requestSearchId,
  requestAllTickets,
  requestMoreTickets,
};
