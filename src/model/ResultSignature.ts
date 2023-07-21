import { decode } from "../utils";
import PageErrorData from "./PageErrorData";

export default class ResultPage extends PageErrorData {
  constructor(title: string, public readonly result: string[], error?: string) {
    super(title, error);
  }
}
