import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../types/index.js';
import { CommentService } from './comment-service.interface.js';
import { CommentEntity, CommentModel } from './comment.entity.js';
import { DefaultCommentService } from './default-comment.service.js';
import CommentController from './comment.controller.js';
import { Controller } from '../../rest/index.js';

export function createCommentContainer(): Container {
  const container = new Container();
  container.bind<CommentService>(Component.CommentService).to(DefaultCommentService).inSingletonScope();
  container.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);
  container.bind<Controller>(Component.CommentController).to(CommentController).inSingletonScope();
  return container;
}
