import { inject, injectable } from 'inversify';
import { City } from '../../types/index.js';
import { OfferService } from './offer-service.interface.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../rest/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`Created new offer with title: '${dto.title}'`);
    return this.populateAuthor(result);
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const offer = await this.offerModel.findById(offerId).exec();
    return offer && this.populateAuthor(offer);
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    const result = await this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .exec();

    if (result) {
      this.logger.info(`Update offer with title: '${result.title}'`);
      return this.populateAuthor(result);
    }

    return null;
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }

  public async findAll(limit: number, skip: number): Promise<DocumentType<OfferEntity>[]> {
    const offers = await this.offerModel.find().skip(skip).limit(limit).exec();
    return Promise.all(offers.map(this.populateAuthor));
  }

  public async findTopPremiumByCity(city: City): Promise<DocumentType<OfferEntity>[]> {
    const offers = await this.offerModel
      .find({ isPremium: true, city })
      .sort({ publicationDate: -1 })
      .limit(3)
      .exec();

    return Promise.all(offers.map(this.populateAuthor));
  }

  public async findAllPremium(city: City, limit: number, skip: number): Promise<DocumentType<OfferEntity>[]> {
    const offers = await this.offerModel.find({ isPremium: true, city }).skip(skip).limit(limit).exec();
    return Promise.all(offers.map(this.populateAuthor));
  }

  public async findAllFavorite(userId: string, limit: number, skip: number): Promise<DocumentType<OfferEntity>[]> {
    const offers = await this.offerModel
      .find({ favoriteUserIds: { $in: [userId] } })
      .skip(skip)
      .limit(limit)
      .exec();

    return Promise.all(offers.map(this.populateAuthor));
  }

  public async addToFavorite(offerId: string, userId: string): Promise<void> {
    await this.offerModel.findByIdAndUpdate(offerId, { $addToSet: { favoriteUserIds: userId } }).exec();
  }

  public async removeFromFavorite(offerId: string , userId: string): Promise<void> {
    await this.offerModel.findByIdAndUpdate(offerId, { $pull: { favoriteUserIds: userId } }).exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndUpdate(offerId, {
      $inc: { commentCount: 1 }
    }).exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({ _id: documentId })) !== null;
  }

  private async populateAuthor(offer: DocumentType<OfferEntity>): Promise<DocumentType<OfferEntity>> {
    return offer.populate('authorId');
  }
}
