import { User, Offer } from './index.js';

export type UserWithId = User & {
  userId: string;
};

export type OfferWithUserId = Omit<Offer, 'author'> & {
  userId: string;
};
