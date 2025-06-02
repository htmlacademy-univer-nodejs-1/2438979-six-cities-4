import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { Types } from 'mongoose';
import { Logger } from '../../rest/logger/index.js';
import { Component } from '../../types/index.js';
import { OfferEntity } from '../offer/offer.entity.js';
import { CommentService } from './comment-service.interface.js';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.Logger)
    private readonly logger: Logger,

    @inject(Component.CommentModel)
    private readonly commentModel: types.ModelType<CommentEntity>,

    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(
    dto: CreateCommentDto
  ): Promise<DocumentType<CommentEntity>> {
    const result = await this.commentModel.create(dto);

    const aggregation = await this.commentModel
      .aggregate([
        { $match: { offerId: dto.offerId } },
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
            average: { $avg: '$rating' },
          },
        },
      ])
      .exec();

    if (aggregation.length > 0) {
      await this.offerModel.findByIdAndUpdate(dto.offerId, {
        commentsNumber: aggregation[0].count,
        rating: aggregation[0].average,
      });
    }

    this.logger.info(`Created comment with id '${result._id}'`);

    return result;
  }

  public async findAllForOffer(
    offerId: Types.ObjectId,
    limit: number,
    skip: number
  ): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel.find({ offerId }).skip(skip).limit(limit).exec();
  }
}
