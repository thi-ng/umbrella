import type { Attribs, EventAttribs, StringAttrib } from "./api";
import { defElement, defElements } from "./def";

export interface HtmlAttribs extends Attribs {
    xmlns: StringAttrib;
}

export const html = defElement<Partial<HtmlAttribs>>("html");

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
    noscript,
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
    "noscript",
    "section",
]);

export const [h1, h2, h3, h4, h5, h6] = [1, 2, 3, 4, 5, 6].map((i) =>
    defElement("h" + i)
);
