export const backtrackInit = <Problem, Candidate>(
  rejectFn: (p: Problem, c: Candidate) => boolean,
  acceptFn: (p: Problem, c: Candidate) => boolean,
  outputFn: (p: Problem, c: Candidate) => void,
  firstFn: (p: Problem, c: Candidate) => Candidate | null,
  nextFn: (p: Problem, c: Candidate) => Candidate | null
) => {
  const bt = (p: Problem, c: Candidate) => {
    if (rejectFn(p, c)) {
      return;
    }
    if (acceptFn(p, c)) {
      outputFn(p, c);
    }
    let s = firstFn(p, c);
    while (s !== null) {
      bt(p, s);
      s = nextFn(p, s);
    }
  };
  return bt;
};

export const backtrack = <Problem, Candidate>(
  p: Problem,
  c: Candidate,
  rejectFn: (p: Problem, c: Candidate) => boolean,
  acceptFn: (p: Problem, c: Candidate) => boolean,
  outputFn: (p: Problem, c: Candidate) => void,
  firstFn: (p: Problem, c: Candidate) => Candidate | null,
  nextFn: (p: Problem, c: Candidate) => Candidate | null
) => {
  const bt = backtrackInit(rejectFn, acceptFn, outputFn, firstFn, nextFn);
  bt(p, c);
};

export const backtrackFullInit =
  <Problem, Candidate>(
    rootFn: (p: Problem) => Candidate,
    rejectFn: (p: Problem, c: Candidate) => boolean,
    acceptFn: (p: Problem, c: Candidate) => boolean,
    outputFn: (p: Problem, c: Candidate) => void,
    firstFn: (p: Problem, c: Candidate) => Candidate | null,
    nextFn: (p: Problem, c: Candidate) => Candidate | null
  ) =>
  (p: Problem) =>
    backtrackInit(rejectFn, acceptFn, outputFn, firstFn, nextFn)(p, rootFn(p));

export const backtrackFull = <Problem, Candidate>(
  p: Problem,
  rootFn: (p: Problem) => Candidate,
  rejectFn: (p: Problem, c: Candidate) => boolean,
  acceptFn: (p: Problem, c: Candidate) => boolean,
  outputFn: (p: Problem, c: Candidate) => void,
  firstFn: (p: Problem, c: Candidate) => Candidate | null,
  nextFn: (p: Problem, c: Candidate) => Candidate | null
) => {
  const bt = backtrackFullInit(
    rootFn,
    rejectFn,
    acceptFn,
    outputFn,
    firstFn,
    nextFn
  );
  bt(p);
};
