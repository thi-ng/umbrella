import type {
    Attribs,
    AttribVal,
    CORSAttribs,
    ImportanceAttribs,
    ReferrerAttribs,
} from "./api";
import { defElement } from "./def";

export interface ImageAttribs
    extends Attribs,
        CORSAttribs,
        ImportanceAttribs,
        ReferrerAttribs {
    alt: AttribVal<string>;
    decoding: AttribVal<"sync" | "async" | "auto">;
    height: AttribVal<number>;
    ismap: AttribVal<boolean>;
    loading: AttribVal<"eager" | "lazy">;
    sizes: AttribVal<string | string[]>;
    src: AttribVal<string>;
    srcset: AttribVal<string | string[]>;
    usemap: AttribVal<boolean>;
    width: AttribVal<number>;
}

export const img = defElement<Partial<ImageAttribs>, never>("img");

export const picture = defElement("picture");

export interface SourceAttribs extends Attribs {
    media: AttribVal<string>;
    src: AttribVal<string>;
    sizes: AttribVal<string | string[]>;
    srcset: AttribVal<string | string[]>;
    type: AttribVal<string>;
}

export const source = defElement<Partial<SourceAttribs>, never>("source");
