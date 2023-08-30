import SignatureList from "../model/SignatureFinder/SignatureList";

const sequenceMatches = ({ signatures }: SignatureList, sequence: number[]) => {
  const expectedArray = signatures
    .flatMap(({ size, count }) => new Array<number>(count).fill(size))
    .sort();
  const result = [...sequence].sort();
  return result === expectedArray;
};

export default sequenceMatches;
