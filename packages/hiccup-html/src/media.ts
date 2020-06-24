import type { Attribs, AttribVal, CORSAttribs, ReferrerAttribs } from "./api";
import { defElement } from "./def";

export interface ImageAttribs extends Attribs, CORSAttribs, ReferrerAttribs {
    alt: AttribVal<string>;
    decoding: AttribVal<"sync" | "async" | "auto">;
    height: AttribVal<number>;
    importance: AttribVal<"high" | "low" | "auto">;
    ismap: AttribVal<boolean>;
    loading: AttribVal<"eager" | "lazy">;
    sizes: AttribVal<string | string[]>; // comma
    src: AttribVal<string>;
    srcset: AttribVal<string | string[]>; // comma
    usemap: AttribVal<boolean>;
    width: AttribVal<number>;
}

export const img = defElement<Partial<ImageAttribs>, never>("img");

export const picture = defElement("picture");

export interface SourceAttribs extends Attribs {
    media: AttribVal<string>;
    src: AttribVal<string>;
    sizes: AttribVal<string | string[]>; // comma
    srcset: AttribVal<string | string[]>; // comma
    type: AttribVal<string>;
}

export const source = defElement<Partial<SourceAttribs>, never>("source");
