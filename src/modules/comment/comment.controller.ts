import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseController, HttpError, HttpMethod, ValidateDtoMiddleware } from '../../rest/index.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../rest/logger/index.js';
import { CommentService } from './comment-service.interface.js';
import { OfferService } from '../offer/index.js';
import { CommentRdo } from './rdo/comment.rdo.js';
import { CreateCommentRequest } from './types/create-comment-request.type.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { fillDTO } from '../../lib/utils/shared/fill-dto.js';

@injectable()
export default class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create.bind(this),
      middlewares: [
        new ValidateDtoMiddleware(CreateCommentDto)
      ]
    });
  }

  public async create(
    { body }: CreateCommentRequest,
    res: Response
  ): Promise<void> {
    const offerExists = await this.offerService.exists(body.offerId);

    if (!offerExists) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'CommentController'
      );
    }

    const comment = await this.commentService.create(body);
    await this.offerService.incCommentCount(body.offerId);

    this.created(res, fillDTO(CommentRdo, comment));
  }
}
