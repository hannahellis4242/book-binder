const calcualteSignaturePageSequence = (sheets: number): number[] => {
  const pages = 4 * sheets;
  const pageSequence = [];
  {
    let index = 0;
    let next = pages - 1;
    while (index < pages) {
      pageSequence.push(next);
      const step = index % 4;
      if (step % 2 == 0) {
        next = pages - 1 - next;
      } else if (step % 4 == 1) {
        ++next;
      } else if (step % 4 == 3) {
        --next;
      }
      ++index;
    }
  }
  return pageSequence;
};

const calculatePageNumbers = (signatures: number[][]): number[] => {
  const pageNumbers: number[] = [];
  let runningPageNumbers = 0;
  signatures.forEach((signature) => {
    const pagesInSignature = signature.length;
    signature.forEach((pageNumber) => {
      pageNumbers.push(runningPageNumbers + pageNumber);
    });
    runningPageNumbers += pagesInSignature;
  });
  return pageNumbers;
};

export const createPageSequence = (arr: number[]): number[] =>
  calculatePageNumbers(
    arr.map((sheets) => calcualteSignaturePageSequence(sheets))
  );
