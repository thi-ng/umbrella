import type { Nullable } from "@thi.ng/api";
import type { Attribs } from "./api";

export interface ElementFactory<T, B> {
    (attribs?: Nullable<T>, ...body: B[]): [string, Nullable<T>, ...B[]];
    (emmet: string, attribs?: Nullable<T>, ...body: B[]): [
        string,
        Nullable<T>,
        ...B[]
    ];
}

/**
 * HOF element. Returns new optimized element factory for given tag
 * name, optional `baseAttribs` defaults and generics for defining
 * supported attributes and children. See {@link ElementFactory} for
 * supported call formats of the resulting function..
 *
 * @param tag
 * @param baseAttribs
 */
export const defElement = <T = Partial<Attribs>, B = any>(
    tag: string,
    baseAttribs?: Partial<T>
): ElementFactory<T, B> => (...args: any[]): any => {
    const $tag = typeof args[0] === "string" ? tag + args.shift() : tag;
    const n = args.length;
    const attribs =
        n > 0
            ? baseAttribs
                ? { ...baseAttribs, ...args[0] }
                : args[0]
            : baseAttribs || null;
    return n > 1 ? [$tag, attribs, ...args.slice(1)] : [$tag, attribs];
};

/**
 * @internal
 */
export const defElements = <T = Partial<Attribs>, B = any>(tags: string[]) =>
    tags.map((t) => defElement<T, B>(t));
