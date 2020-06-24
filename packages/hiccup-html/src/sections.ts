import { defElement, defElements } from "./def";

export const [
    address,
    article,
    aside,
    footer,
    header,
    hgroup,
    main,
    nav,
    section,
] = defElements([
    "article",
    "aside",
    "footer",
    "header",
    "hgroup",
    "main",
    "nav",
    "section",
]);

export const [h1, h2, h3, h4, h5, h6] = [1, 2, 3, 4, 5, 6].map((i) =>
    defElement("h" + i)
);
