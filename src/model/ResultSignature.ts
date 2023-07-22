import PageErrorData from "./PageErrorData";

export default class ResultSignature extends PageErrorData {
  constructor(title: string, public readonly result: string[]) {
    super(title, undefined);
  }
}
