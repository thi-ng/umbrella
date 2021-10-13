import { isFunction } from "@thi.ng/checks/is-function";
import type { TransformSpec } from "./api.js";

/**
 * Higher-order deep object transformer used by {@link (mapDeep:1)}.
 * Accepts a nested `spec` array reflecting same key structure as the
 * object to be mapped, but with functions or sub-specs as their values.
 * Returns a new function, which when called, recursively applies nested
 * transformers in post-order traversal (child transformers are run
 * first) and returns the result of the root transformer.
 *
 * @remarks
 * The transform specs are given as arrays in this format:
 *
 * ```ts
 * [tx-function, { key1: [tx-function, {...}], key2: tx-fn }]
 * ```
 *
 * If a key in the spec has no further sub maps, its transform function
 * can be given directly without having to wrap it into the usual array
 * structure.
 *
 * @example
 * ```ts
 * // source object to be transformed
 * src = {
 *    meta: {
 *      author: { name: "Alice", email: "a@b.com" },
 *      date: 1041510896000
 *    },
 *    type: "post",
 *    title: "Hello world",
 *    body: "Ratione necessitatibus doloremque itaque."
 * };
 *
 * // deep transformation spec
 * spec = [
 *    // root transform (called last)
 *    ({type, meta, title, body}) => ["div", {class: type}, title, meta, body],
 *    // object of transform sub-specs
 *    {
 *      meta: [
 *        ({author, date}) => ["div.meta", author, `(${date})`],
 *        {
 *          author: ({email, name}) => ["a", {href: `mailto:${email}`}, name],
 *          date: (d) => new Date(d).toLocaleString()
 *        }
 *      ],
 *      title: (title) => ["h1", title]
 *    }
 * ];
 *
 * // build transformer & apply to src
 * deepTransform(spec)(src);
 *
 * // [ "div",
 * //   { class: "article" },
 * //   [ "h1", "Hello world" ],
 * //   [ "div.meta",
 * //     [ "a", { href: "mailto:a@.b.com" }, "Alice" ],
 * //     "./2/2003, 12:34:56 PM)" ],
 * //   "Ratione necessitatibus doloremque itaque." ]
 * ```
 *
 * @param spec - transformation spec
 */
export const deepTransform = (spec: TransformSpec): ((x: any) => any) => {
    if (isFunction(spec)) {
        return <any>spec;
    }
    const mapfns = Object.keys(spec[1] || {}).reduce(
        (acc: any, k) => ((acc[k] = deepTransform((<any>spec)[1][k])), acc),
        {}
    );
    return (x) => {
        const res = { ...x };
        for (let k in mapfns) {
            res[k] = mapfns[k](res[k]);
        }
        return spec[0](res);
    };
};
