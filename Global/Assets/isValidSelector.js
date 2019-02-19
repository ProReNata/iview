export default function isValidSelector(value) {
  try {
    document.querySelector(value);

    return true;
  } catch (error) {
    return false;
  }
}
