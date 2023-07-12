import PageData from "./PageData";

export default class PageErrorData extends PageData {
  constructor(title: string, public readonly error?: string) {
    super(title);
  }
}
