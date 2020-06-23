import type { Nullable } from "@thi.ng/api";
import type { Attribs } from "./api";

export const defElement = <T = Partial<Attribs>, B = any>(
    tag: string,
    baseAttribs?: Partial<T>
) => (attribs: Nullable<T>, ...body: B[]): [string, Nullable<T>, ...B[]] =>
    baseAttribs
        ? [tag, { ...baseAttribs, ...attribs }, ...body]
        : [tag, attribs, ...body];
