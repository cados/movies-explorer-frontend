export default function defineIncrement(screenWidth) {
  if (screenWidth >= 1280) {
    return 3;
  }
  return 2;
}
