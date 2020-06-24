import type { Attribs } from "./api";
import { defElement, defElements } from "./def";

export const [blockquote, div, figure, figcaption, para, pre] = defElements([
    "blockquote",
    "div",
    "figure",
    "figcaption",
    "p",
    "pre",
]);

export const hr = defElement<Partial<Attribs>, never>("hr");
