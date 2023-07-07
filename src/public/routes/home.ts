import { Router } from "express";

const homeData = {
  title: "Book Binding Calculators",
  nav: [
    { text: "home", href: "/" },
    { text: "page sequence", href: "/page" },
    { text: "signature finder", href: "/signature" },
  ],
};

const home = Router();
home.get("/", (_, res) => res.render("home", homeData));
export default home;
