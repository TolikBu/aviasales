import cuid from 'cuid';
import { ITicket } from '../types/ITicket';

const BASE_URL = 'https://aviasales-test-api.kata.academy';
const BASE_LOGO_URL = 'http://pics.avs.io/99/36';

const request = async <T>(path: string, options?: RequestInit) => {
  const res = await fetch(path, options);

  if (!res.ok) {
    throw Error(`failed to fetch ${res.statusText}`);
  }

  return (await res.json()) as T;
};

const getSearchId = async (): Promise<string> => {
  const data = await request<{ searchId: string }>(`${BASE_URL}/search`);

  return data.searchId;
};

const getTickets = async (searchId: string): Promise<{ tickets: ITicket[]; stop: boolean }> => {
  const data = await request<{ tickets: ITicket[]; stop: boolean }>(`${BASE_URL}/tickets?searchId=${searchId}`);

  const { stop } = data;
  // console.log(data);
  const tickets = data.tickets.map((item) => {
    const id = cuid();
    const logoPath = `${BASE_LOGO_URL}/${item.carrier}.png`;
    return {
      ...item,
      id,
      carrierLogoPath: logoPath,
    };
  });

  return { tickets, stop };
};

export const api = {
  getSearchId,
  getTickets,
};
