import Report from "../model/Report";

const createSequenceInstruction = (
  sequence: number[],
  input: string,
  output: string
): string =>
  `pdftk ${input} cat ` +
  sequence.map((x) => x.toString()).join(" ") +
  ` output ${output}`;

const createScript = (
  { pageSequence, signaturePageSequence }: Report,
  filename: string
): string =>
  "#!/bin/bash\n" +
  createSequenceInstruction(pageSequence, filename, "full_binding.pdf") +
  "\n" +
  signaturePageSequence
    .map((sequence, i) =>
      createSequenceInstruction(
        sequence,
        filename,
        `signature_${i + 1}_binding.pdf`
      )
    )
    .join("\n");

export default createScript;
