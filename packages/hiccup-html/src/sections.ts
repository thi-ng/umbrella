import { defElement, defElements } from "./def";
import { EventAttribs, Attribs } from "./api";

export type BodyEventAttribs = EventAttribs<
    | "onafterprint"
    | "onbeforeprint"
    | "onbeforeunload"
    | "onerror"
    | "onhashchange"
    | "onlanguagechange"
    | "onload"
    | "onmessage"
    | "onoffline"
    | "ononline"
    | "onpopstate"
    | "onredo"
    | "onstorage"
    | "onundo"
    | "onunload",
    Event
>;

export interface BodyAttribs extends Attribs, BodyEventAttribs {}

export const body = defElement<Partial<BodyAttribs>>("body");

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
    "address",
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
