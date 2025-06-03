export const CreateOfferValidationMessage = {
  title: {
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  createdDate: {
    invalidFormat: 'Publication date must be a valid ISO date',
  },
  city: {
    invalid: 'City must be one of: Paris, Cologne, Brussels, Amsterdam, Hamburg, Dusseldorf',
  },
  preview: {
    invalidFormat: 'Preview image must be a valid URL',
  },
  photos: {
    invalidFormat: 'Photos must be an array of 6 valid URLs',
    minItems: 'There must be exactly 6 photos',
    maxItems: 'There must be exactly 6 photos',
    itemType: 'Each photo must be a valid URL string',
  },
  isPremium: {
    invalidFormat: 'isPremium must be a boolean',
  },
  isFavorite: {
    invalidFormat: 'isFavorite must be a boolean',
  },
  rating: {
    invalidFormat: 'Rating must be a number between 1.0 and 5.0',
    invalidValue: 'Rating must be between 1.0 and 5.0',
  },
  type: {
    invalid: 'Type must be one of: apartment, house, room, hotel',
  },
  numberOfRooms: {
    minValue: 'Minimum number of rooms is 1',
    maxValue: 'Maximum number of rooms is 8',
  },
  numberOfGuests: {
    minValue: 'Minimum number of guests is 1',
    maxValue: 'Maximum number of guests is 10',
  },
  rentalCost: {
    invalidFormat: 'Rental cost must be an integer',
    minValue: 'Minimum rental cost is 100',
    maxValue: 'Maximum rental cost is 100000',
  },
  facilities: {
    invalidFormat: 'Facilities must be a list of valid items from predefined set',
    invalidValue: 'Each facility must be a valid value from the enum',
  },
  authorId: {
    invalidId: 'userId field must be a valid ObjectId',
  },
  coordinates: {
    invalid: 'Coordinates must include valid latitude and longitude',
    invalidFormat: 'Latitude and longitude must be valid numbers',
  },
};
