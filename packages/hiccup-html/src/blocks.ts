import type { Attribs } from "./api";
import { defElement } from "./def";

export const blockquote = defElement("blockquote");

export const div = defElement("div");

export const figure = defElement("figure");

export const figcaption = defElement("figcaption");

export const hr = defElement<Partial<Attribs>, never>("hr");

export const para = defElement("p");

export const pre = defElement("pre");

export const span = defElement("span");
