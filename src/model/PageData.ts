import Nav from "./Nav";

export default class PageData extends Nav {
  constructor(public readonly title: string) {
    super();
  }
}
