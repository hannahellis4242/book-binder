import Report from "../model/Report";

export const show = (x: Report): string =>
  `pages ${x.pages}\nmaximum ${x.maxAllowed}\n`;
