import { Types } from 'mongoose';

export class CreateCommentDto {
  public text!: string;
  public rating!: number;
  public authorId!: Types.ObjectId;
  public offerId!: Types.ObjectId;
}
