import got from 'got';
import { OfferWithUserId, UserWithId } from '../../types/mock-server-data-types.js';

export class JsonServerClient {
  constructor(private baseUrl: string) {}

  async fetchOffers() {
    const response = await got<OfferWithUserId[]>(`${this.baseUrl}/offers`, { responseType: 'json' });
    return response.body;
  }

  async fetchUsers() {
    const response = await got<UserWithId[]>(`${this.baseUrl}/users`, { responseType: 'json' });
    return response.body;
  }
}
