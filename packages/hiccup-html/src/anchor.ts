import { Attribs, AttribVal } from "./api";
import { defElement } from "./def";

interface AnchorAttribs extends Attribs {
    download: AttribVal<string>;
    href: AttribVal<string>;
    hreflang: AttribVal<string>;
    ping: AttribVal<string | string[]>;
    referrerpolicy: AttribVal<
        | "no-referrer"
        | "no-referrer-when-downgrade"
        | "origin"
        | "origin-when-cross-origin"
        | "same-origin"
        | "strict-origin"
        | "strict-origin-when-cross-origin"
        | "unsafe-url"
    >;
    rel: AttribVal<string>;
    target: AttribVal<string>;
    type: AttribVal<string>;
}

export const anchor = defElement<Partial<AnchorAttribs>>("a");
