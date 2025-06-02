import { UUID } from 'node:crypto';

export class CreateCommentDto {
  public text!: string;
  public rating!: number;
  public authorId!: UUID;
  public offerId!: UUID;
}
