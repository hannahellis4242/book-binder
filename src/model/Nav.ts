import Link from "./Link";
export default class Nav {
  nav: Link[];
  constructor() {
    this.nav = [
      { text: "home", href: "/" },
      { text: "create", href: "/create/start" },
      { text: "page sequence", href: "/page" },
      { text: "signature finder", href: "/signature" },
    ];
  }
}
