import SignatureList from "../model/SignatureFinder/SignatureList";

const sequenceMatches = ({ signatures }: SignatureList, sequence: number[]) => {
  const expectedArray = signatures
    .flatMap(({ size, count }) => new Array<number>(count).fill(size))
    .sort()
    .map((x) => x.toString())
    .join(",");
  const result = [...sequence]
    .sort()
    .map((x) => x.toString())
    .join(",");
  return result === expectedArray;
};

export default sequenceMatches;
