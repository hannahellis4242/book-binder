import PageErrorData from "./PageErrorData";

export default class ResultPage extends PageErrorData {
  result: string;
  constructor(title: string, result: number[], error?: string) {
    super(title, error);
    this.result = result.join(", ");
  }
}
