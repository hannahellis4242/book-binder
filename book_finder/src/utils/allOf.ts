const allOf = <T>(pred: (x: T) => boolean, xs: T[]): boolean => {
  if (xs.length === 0) {
    return true;
  }
  const [head, ...tail] = xs;
  return pred(head) && allOf(pred, tail);
};
export default allOf;
