import { Offer } from '../../../types/offer.js';

export function getTsvFromOffer(offer: Offer) {
  const fields = [
    offer.title,
    offer.description,
    offer.publicationDate,
    offer.city,
    offer.preview,
    offer.photos.join(','),
    offer.isPremium,
    offer.isFavorite,
    offer.rating,
    offer.type,
    offer.numberOfRooms,
    offer.numberOfGuests,
    offer.rentalCost,
    offer.facilities.join(','),
    offer.author.name,
    offer.author.email,
    offer.author.avatar,
    offer.author.password,
    offer.author.type,
    offer.coordinates.latitude,
    offer.coordinates.longitude
  ];
  return fields.join('\t');
}
