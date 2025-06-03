export const CreateCommentMessages = {
  text: {
    invalidFormat: 'Text is required',
    lengthField: 'min length is 5, max is 2024',
  },
  rating: {
    invalidFormat: 'Rating is required',
    min: 'Rating must be at least 1',
    max: 'Rating must be at most 5',
  },
  offerId: {
    invalidFormat: 'offerId field must be a valid id',
  },
  userId: {
    invalidFormat: 'userId field must be a valid id',
  },
} as const;
