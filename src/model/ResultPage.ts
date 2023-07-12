import { decode } from "../utils";
import PageErrorData from "./PageErrorData";

export default class ResultPage extends PageErrorData {
  result: string;
  constructor(title: string, result: string, error?: string) {
    super(title, error);
    this.result = decode(result);
  }
}
