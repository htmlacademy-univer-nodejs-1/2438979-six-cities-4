import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { Logger } from '../../rest/logger/index.js';
import { BaseController, HttpMethod } from '../../rest/index.js';
import { Component } from '../../types/index.js';
import { UserService } from './user-service.interface.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { RestSchema, Config } from '../../rest/config/index.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) logger: Logger,
    @inject(Component.Config) private config: Config<RestSchema>,
    @inject(Component.UserService) private userService: UserService
  ) {
    super(logger);

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.createUserAsync,
    });
  }

  private async createUserAsync(req: Request, res: Response): Promise<void> {
    const dto = plainToClass(CreateUserDto, req.body);
    const user = await this.userService.create(dto, this.config.get('SALT'));
    this.created(res, user);
  }
}
