import { Attribs, AttribVal, ReferrerAttribs, RelAttribs } from "./api";
import { defElement, defElements } from "./def";
import { NumOrString } from "@thi.ng/api";

interface AnchorAttribs extends Attribs, ReferrerAttribs, RelAttribs {
    download: AttribVal<string>;
    href: AttribVal<string>;
    hreflang: AttribVal<string>;
    ping: AttribVal<string | string[]>;
    target: AttribVal<string>;
    type: AttribVal<string>;
}

export const anchor = defElement<Partial<AnchorAttribs>>("a");

export const abbr = defElement<{ title: AttribVal<string> } & Partial<Attribs>>(
    "abbr"
);

export const br = defElement<never, never>("br");

export const data = defElement<
    { value: AttribVal<NumOrString> } & Partial<Attribs>
>("data");

export const quote = defElement<{ cite: AttribVal<string> } & Partial<Attribs>>(
    "q"
);

export const time = defElement<
    { datetime: AttribVal<string> } & Partial<Attribs>
>("time");

export const [
    code,
    cite,
    em,
    i,
    kbd,
    mark,
    small,
    span,
    strong,
    sub,
    sup,
] = defElements([
    "code",
    "cite",
    "em",
    "i",
    "kbd",
    "mark",
    "small",
    "span",
    "strong",
    "sub",
    "sup",
]);

export interface EditAttribs extends Attribs {
    cite: AttribVal<string>;
    datetime: AttribVal<string>;
}

export const [del, ins] = defElements<Partial<EditAttribs>>(["del", "ins"]);
