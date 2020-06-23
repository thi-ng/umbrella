import type { Attribs, AttribVal } from "./api";
import { defElement } from "./def";

export interface ImageAttribs extends Attribs {
    alt: AttribVal<string>;
    src: AttribVal<string>;
    width: AttribVal<number>;
    height: AttribVal<number>;
}

export const img = defElement<Partial<ImageAttribs>, never>("img");
