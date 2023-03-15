import { ITicket } from './ITicket';
import { FilterPrices } from './FiterPrices';
import { TransferFilters } from './TransferFilters';

export interface IAppState {
  filterPrice: FilterPrices;
  transferFilters: TransferFilters[];
  searchId: string | null;
  error: string | null;
  tickets: ITicket[];
  isLoading: boolean;
  currentTicketsCount: number;
  total: number;
  stop: boolean;
}
