export default function defineAmountMoviesToShow(screenWidth) {
  if (screenWidth >= 1280) {
    return 12;
  }
  if (screenWidth >= 768) {
    return 8;
  }
  return 5;
}
