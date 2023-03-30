import { ITicket } from './ITicket';
import { EFilterPrices } from './EFiterPrices';
import { ETransferFilters } from './ETransferFilters';

export interface IAppState {
  filterPrice: EFilterPrices;
  transferFilters: ETransferFilters[];
  searchId: string | null;
  error: string | null;
  tickets: ITicket[];
  isLoading: boolean;
  currentTicketsCount: number;
}
