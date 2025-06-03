import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { Logger } from '../../rest/logger/index.js';
import { Component } from '../../types/index.js';
import { OfferEntity } from '../offer/offer.entity.js';
import { CommentService } from './comment-service.interface.js';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { SortType } from '../../rest/types/sort-type.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    await comment.populate('userId');

    await this.updateOfferRating(dto.offerId);

    this.logger.info(`Created new comment with id: ${comment._id}`);
    return comment;
  }

  public async findAllForOffer(
    offerId: string,
    limit = 50,
    skip = 0
  ): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({ offerId })
      .sort({ createdAt: SortType.Down })
      .skip(skip)
      .limit(limit)
      .populate('userId')
      .exec();
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel.deleteMany({ offerId }).exec();
    this.logger.info(`Deleted ${result.deletedCount} comments for offerId: ${offerId}`);

    await this.updateOfferRating(offerId);

    return result.deletedCount;
  }

  private async updateOfferRating(offerId: string): Promise<void> {
    const aggregation = await this.commentModel.aggregate([
      { $match: { offerId } },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          average: { $avg: '$rating' }
        }
      }
    ]);

    const commentCount = aggregation[0]?.count ?? 0;
    const rating = aggregation[0]?.average ?? 0;

    await this.offerModel.findByIdAndUpdate(offerId, {
      commentCount,
      rating
    });

    this.logger.info(`Updated rating (${rating}) and comment count (${commentCount}) for offerId: ${offerId}`);
  }
}
