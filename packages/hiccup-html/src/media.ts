import type { MaybeDeref } from "@thi.ng/api";
import type { Attribs } from "./api";
import { defElement } from "./def";

export interface ImageAttribs extends Attribs {
    alt: MaybeDeref<string>;
    src: MaybeDeref<string>;
    width: MaybeDeref<number>;
    height: MaybeDeref<number>;
}

export const img = defElement<Partial<ImageAttribs>, never>("img");
