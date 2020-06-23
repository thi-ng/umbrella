import type { MaybeDeref } from "@thi.ng/api";
import { Attribs } from "./api";
import { defElement } from "./def";

interface AnchorAttribs extends Attribs {
    download: MaybeDeref<string>;
    href: MaybeDeref<string>;
    hreflang: MaybeDeref<string>;
    ping: MaybeDeref<string | string[]>;
    referrerpolicy: MaybeDeref<
        | "no-referrer"
        | "no-referrer-when-downgrade"
        | "origin"
        | "origin-when-cross-origin"
        | "same-origin"
        | "strict-origin"
        | "strict-origin-when-cross-origin"
        | "unsafe-url"
    >;
    rel: MaybeDeref<string>;
    target: MaybeDeref<string>;
    type: MaybeDeref<string>;
}

export const anchor = defElement<Partial<AnchorAttribs>>("a");
