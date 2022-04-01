export default function adaptObject(arr) {
  return arr.map((el) => {
    const obj = {};

    if (el.country === null || '') {
      obj.country = 'не указано';
    } else {
      obj.country = el.country;
    }
    if (el.director === null || '') {
      obj.director = 'не указано';
    } else {
      obj.director = el.director;
    }
    if (el.duration === null || '') {
      obj.duration = 0;
    } else {
      obj.duration = el.duration;
    }
    if (el.description === null || '') {
      obj.description = 'не указано';
    } else {
      obj.description = el.description;
    }
    if (el.image === null) {
      obj.image = 'https://images.unsplash.com/photo-1588066801004-3d2a8ef323d7';
    } else {
      obj.image = `https://api.nomoreparties.co${el.image.url}`;
    }
    if (el.trailerLink === null) {
      obj.trailer = 'https://www.youtube.com';
    } else {
      obj.trailer = el.trailerLink;
    }
    if (el.nameRU === null || '') {
      obj.nameRU = 'не указано';
    } else {
      obj.nameRU = el.nameRU;
    }
    if (el.nameEN === null || '') {
      obj.nameEN = 'не указано';
    } else {
      obj.nameEN = el.nameEN;
    }
    obj.movieId = el.id;
    obj.thumbnail = `https://api.nomoreparties.co${el.image.formats.thumbnail.url}`;
    obj.year = el.year;
    return obj;
  });
}
