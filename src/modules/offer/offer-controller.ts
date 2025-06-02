import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { isValidObjectId, Types } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { Logger } from '../../rest/logger/index.js';
import { BaseController } from '../../rest/controller/base-controller.abstract.js';
import { HttpError, HttpMethod } from '../../rest/index.js';
import { Component, City } from '../../types/index.js';
import { OfferService } from './offer-service.interface.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) logger: Logger,
    @inject(Component.OfferService) private offerService: OfferService
  ) {
    super(logger);

    this.addRoute({
      path: '/premium/:city',
      method: HttpMethod.Delete,
      handler: this.getPremiumOffersForCityAsync.bind(this),
    });

    this.addRoute({
      path: '/favorite',
      method: HttpMethod.Get,
      handler: this.getFavouriteOffersForUserAsync.bind(this),
    });
    this.addRoute({
      path: '/favorite/:id',
      method: HttpMethod.Post,
      handler: this.addOfferToFavouriteAsync.bind(this),
    });
    this.addRoute({
      path: '/favorite/:id',
      method: HttpMethod.Delete,
      handler: this.removeOfferFromFavouriteAsync.bind(this),
    });

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.getOffersAsync.bind(this),
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.createOfferAsync.bind(this),
    });
    this.addRoute({
      path: '/:id',
      method: HttpMethod.Get,
      handler: this.findOfferByIdAsync.bind(this),
    });
    this.addRoute({
      path: '/:id',
      method: HttpMethod.Put,
      handler: this.changeOfferByIdAsync.bind(this),
    });
    this.addRoute({
      path: '/:id',
      method: HttpMethod.Delete,
      handler: this.deleteOfferById.bind(this),
    });
  }

  private async getOffersAsync(req: Request, res: Response): Promise<void> {
    const { limit, skip } = req.query;

    const defaultLimit = 20;
    const limitValue = limit ? parseInt(limit as string, 10) : defaultLimit;
    if (isNaN(limitValue)) {
      this.sendBadRequest('limit', limit);
    }

    const defaultSkip = 0;
    const skipValue = skip ? parseInt(skip as string, 10) : defaultSkip;
    if (isNaN(skipValue)) {
      this.sendBadRequest('skip', skip);
    }

    const offers = await this.offerService.findAll(limitValue, skipValue);
    this.ok(res, offers);
  }

  private async createOfferAsync(req: Request, res: Response): Promise<void> {
    const dto = plainToClass(CreateOfferDto, req.body);
    dto.authorId = new Types.ObjectId();
    const offer = await this.offerService.create(dto);
    this.created(res, offer);
  }

  private async findOfferByIdAsync(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      this.sendBadRequest('id', id);
    }

    const offer = await this.offerService.findById(new Types.ObjectId(id));
    this.ok(res, offer);
  }

  private async changeOfferByIdAsync(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      this.sendBadRequest('id', id);
    }

    const dto = plainToClass(UpdateOfferDto, req.body);
    dto.id = new Types.ObjectId(id);
    const offer = await this.offerService.change(dto);
    this.ok(res, offer);
  }

  private async deleteOfferById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      this.sendBadRequest('id', id);
    }

    await this.offerService.deleteById(id);
    this.noContent(res, id);
  }

  private async getPremiumOffersForCityAsync(req: Request, res: Response): Promise<void> {
    const { city } = req.params;

    const cityValue = city as City;
    if (!cityValue) {
      this.sendBadRequest('city', city);
    }

    const offers = await this.offerService.findTopPremium(cityValue);
    this.ok(res, offers);
  }

  private async getFavouriteOffersForUserAsync(_req: Request, _res: Response): Promise<void> {
    throw new Error('Method not implemented.');
  }

  private async addOfferToFavouriteAsync(_req: Request, _res: Response): Promise<void> {
    throw new Error('Method not implemented.');
  }

  private async removeOfferFromFavouriteAsync(_req: Request, _res: Response): Promise<void> {
    throw new Error('Method not implemented.');
  }

  private sendBadRequest<T>(paramName: string, value: T): void {
    const error = `Wrong value for ${paramName}: ${value}`;
    this.logger.warn(error);
    throw new HttpError(StatusCodes.BAD_REQUEST, error);
  }
}
