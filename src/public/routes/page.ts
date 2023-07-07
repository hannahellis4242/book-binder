import { Router } from "express";

const data = {
  title: "Page Sequence Calculator",
  nav: [
    { text: "home", href: "/" },
    { text: "page sequence", href: "/page" },
    { text: "signature finder", href: "/signature" },
  ],
};

const page = Router();
page.get("/page", (_, res) => res.render("page", data));
export default page;
