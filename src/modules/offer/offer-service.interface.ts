import { CreateOfferDto } from './dto/create-offer.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { PutOfferDto } from './dto/update-offer.dto.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  change(dto: PutOfferDto): Promise<DocumentType<OfferEntity> | null>;
  deleteById(id: string): Promise<void>;
  findAll(limit: number, skip: number): Promise<DocumentType<OfferEntity>[]>;
  findAllPremium(limit: number, skip: number): Promise<DocumentType<OfferEntity>[]>;
  findAllFavourite(userId: string, limit: number, skip: number): Promise<DocumentType<OfferEntity>[]>;
  addToFavourite(offerId: string, userId: string): Promise<void>;
  removeFromFavourite(offerId: string, userId: string): Promise<void>;
  updateRatingAndCommentCount(offerId: string): Promise<void>;
}
