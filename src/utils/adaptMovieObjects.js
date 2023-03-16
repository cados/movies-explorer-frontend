export default function adaptMovieObjects(arr) {
  return arr.map(({
    country,
    director,
    duration,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    id,
    year,
  }) => ({
    country: country || 'не указано',
    director: director || 'не указано',
    duration: duration || 0,
    description: description || 'не указано',
    image: image ? `https://api.nomoreparties.co${image.url}` : 'https://images.unsplash.com/photo-1588066801004-3d2a8ef323d7',
    trailer: trailerLink || 'https://www.youtube.com',
    nameRU: nameRU || 'не указано',
    nameEN: nameEN || 'не указано',
    movieId: id,
    thumbnail: image ? `https://api.nomoreparties.co${image.formats.thumbnail.url}` : '',
    year,
  }));
}
