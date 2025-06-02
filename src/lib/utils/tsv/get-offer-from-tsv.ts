import { Offer, City, HousingType, Facility } from '../../../types/offer.js';
import { UserType } from '../../../types/user.js';

export function getOfferFromTsv(tsvLine: string): Offer {
  const [
    title, description, publicationDate, city, preview,
    photos, isPremium, isFavorite, rating, type,
    numberOfRooms, numberOfGuests, rentalCost, facilities,
    authorName, authorEmail, authorAvatar, authorPassword, authorType,
    latitude, longitude
  ] = tsvLine.split('\t');

  return {
    title,
    description,
    publicationDate: new Date(publicationDate),
    city: city as City,
    preview,
    photos: photos.split(','),
    isPremium: isPremium === 'true',
    isFavorite: isFavorite === 'true',
    rating: Number(rating),
    type: type as HousingType,
    numberOfRooms: Number(numberOfRooms),
    numberOfGuests: Number(numberOfGuests),
    rentalCost: Number(rentalCost),
    facilities: facilities.split(',') as Facility[],
    author: {
      name: authorName,
      email: authorEmail,
      avatar: authorAvatar,
      password: authorPassword,
      type: authorType as UserType
    },
    numberOfComments: 0,
    coordinates: {
      latitude: Number(latitude),
      longitude: Number(longitude)
    }
  };
}
