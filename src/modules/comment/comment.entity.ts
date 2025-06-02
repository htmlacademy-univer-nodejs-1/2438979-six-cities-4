import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentEntity extends defaultClasses.Base<Types.ObjectId> {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({required: true})
  public text!: string;

  @prop({required: true})
  public rating!: number;

  @prop({required: true})
  public authorId!: Types.ObjectId;

  @prop({required: true})
  public offerId!: Types.ObjectId;
}

export const CommentModel = getModelForClass(CommentEntity);
