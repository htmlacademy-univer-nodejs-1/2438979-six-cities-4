import { CreateOfferDto } from './dto/create-offer.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { City } from '../../types/index.js';
import { Types } from 'mongoose';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string | Types.ObjectId): Promise<DocumentType<OfferEntity> | null>;
  change(dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  deleteById(id: string | Types.ObjectId): Promise<void>;
  findAll(limit: number, skip: number): Promise<DocumentType<OfferEntity>[]>;
  findTopPremium(city: City): Promise<DocumentType<OfferEntity>[]>;
  findAllFavourite(userId: string | Types.ObjectId, limit: number, skip: number): Promise<DocumentType<OfferEntity>[]>;
  addToFavourite(offerId: string | Types.ObjectId, userId: string | Types.ObjectId): Promise<void>;
  removeFromFavourite(offerId: string | Types.ObjectId, userId: string | Types.ObjectId): Promise<void>;
  updateRatingAndCommentCount(offerId: string | Types.ObjectId): Promise<void>;
}
