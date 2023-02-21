//nb this function assumes the list is sorted already
const uniq = <T>(
  xs: T[],
  eq: (a: T, b: T) => boolean = (a: T, b: T) => a === b
) =>
  xs.reduce((acc, x): T[] => {
    if (acc.length === 0) {
      return [x];
    }
    const last = acc[acc.length - 1];
    if (eq(last, x)) {
      return acc;
    }
    acc.push(x);
    return acc;
  }, [] as T[]);

export default uniq;
