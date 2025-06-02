import { DocumentType } from '@typegoose/typegoose';
import { UUID } from 'node:crypto';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';

export interface CommentService {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findAllForOffer(offerId: UUID, limit: number, skip: number): Promise<DocumentType<CommentEntity>[]>;
}
