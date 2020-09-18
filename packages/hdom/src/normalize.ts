import {
    isArray as isa,
    isNotStringAndIterable as isi,
    isPlainObject as iso,
} from "@thi.ng/checks";
import { illegalArgs } from "@thi.ng/errors";
import { mergeEmmetAttribs, NO_SPANS, RE_TAG } from "@thi.ng/hiccup";
import type { HDOMOpts } from "./api";

const isArray = isa;
const isNotStringAndIterable = isi;
const isPlainObject = iso;

/**
 * Expands single hiccup element/component into its canonical form:
 *
 * ```
 * [tagname, {attribs}, ...children]
 * ```
 *
 * Emmet-style ID and class names in the original tagname are moved into
 * the attribs object, e.g.:
 *
 * ```
 * ["div#foo.bar.baz"] => ["div", {id: "foo", class: "bar baz"}]
 * ```
 *
 * If both Emmet-style classes AND a `class` attrib exists, the former
 * are appended to the latter:
 *
 * ```
 * ["div.bar.baz", {class: "foo"}] => ["div", {class: "foo bar baz"}]
 * ```
 *
 * Elements with `__skip` attrib enabled and no children, will have an
 * empty text child element injected.
 *
 * @param spec - single hdom component
 * @param keys -
 *
 * @internal
 */
export const normalizeElement = (spec: any[], keys: boolean) => {
    let tag = spec[0];
    let hasAttribs = isPlainObject(spec[1]);
    let match: RegExpExecArray | null;
    let name: string;
    let attribs;
    if (typeof tag !== "string" || !(match = RE_TAG.exec(tag))) {
        illegalArgs(`${tag} is not a valid tag name`);
    }
    name = match![1];
    // return orig if already normalized and satisfies key requirement
    if (tag === name && hasAttribs && (!keys || spec[1].key)) {
        return spec;
    }
    attribs = hasAttribs ? { ...spec[1] } : {};
    mergeEmmetAttribs(attribs, match![2], match![3]);
    return attribs.__skip && spec.length < 3
        ? [name, attribs]
        : [name, attribs, ...spec.slice(hasAttribs ? 2 : 1)];
};

/**
 * See {@link HDOMImplementation} interface for further details.
 *
 * @param opts - hdom config options
 * @param tree - component tree
 */
export const normalizeTree = (opts: Partial<HDOMOpts>, tree: any) =>
    _normalizeTree(
        tree,
        opts,
        opts.ctx,
        [0],
        opts.keys !== false,
        opts.span !== false
    );

const _normalizeTree = (
    tree: any,
    opts: Partial<HDOMOpts>,
    ctx: any,
    path: number[],
    keys: boolean,
    span: boolean
): any => {
    if (tree == null) {
        return;
    }
    if (isArray(tree)) {
        if (tree.length === 0) {
            return;
        }
        let norm,
            nattribs = tree[1],
            impl;
        // if available, use branch-local normalize implementation
        if (
            nattribs &&
            (impl = nattribs.__impl) &&
            (impl = impl.normalizeTree)
        ) {
            return impl(opts, tree);
        }
        const tag = tree[0];
        // use result of function call
        // pass ctx as first arg and remaining array elements as rest args
        if (typeof tag === "function") {
            return _normalizeTree(
                tag.apply(null, [ctx, ...tree.slice(1)]),
                opts,
                ctx,
                path,
                keys,
                span
            );
        }
        // component object w/ life cycle methods
        // (render() is the only required hook)
        if (typeof tag.render === "function") {
            const args = [ctx, ...tree.slice(1)];
            norm = _normalizeTree(
                tag.render.apply(tag, args),
                opts,
                ctx,
                path,
                keys,
                span
            );
            if (isArray(norm)) {
                (<any>norm).__this = tag;
                (<any>norm).__init = tag.init;
                (<any>norm).__release = tag.release;
                (<any>norm).__args = args;
            }
            return norm;
        }
        norm = normalizeElement(tree, keys);
        nattribs = norm[1];
        if (nattribs.__normalize === false) {
            return norm;
        }
        if (keys && nattribs.key === undefined) {
            nattribs.key = path.join("-");
        }
        if (norm.length > 2) {
            const tag = norm[0];
            const res = [tag, nattribs];
            span = span && !NO_SPANS[tag];
            for (let i = 2, j = 2, k = 0, n = norm.length; i < n; i++) {
                let el = norm[i];
                if (el != null) {
                    const isarray = isArray(el);
                    if (
                        (isarray && isArray(el[0])) ||
                        (!isarray && isNotStringAndIterable(el))
                    ) {
                        for (let c of el) {
                            c = _normalizeTree(
                                c,
                                opts,
                                ctx,
                                path.concat(k),
                                keys,
                                span
                            );
                            if (c !== undefined) {
                                res[j++] = c;
                            }
                            k++;
                        }
                    } else {
                        el = _normalizeTree(
                            el,
                            opts,
                            ctx,
                            path.concat(k),
                            keys,
                            span
                        );
                        if (el !== undefined) {
                            res[j++] = el;
                        }
                        k++;
                    }
                }
            }
            return res;
        }
        return norm;
    }
    if (typeof tree === "function") {
        return _normalizeTree(tree(ctx), opts, ctx, path, keys, span);
    }
    if (typeof tree.toHiccup === "function") {
        return _normalizeTree(
            tree.toHiccup(opts.ctx),
            opts,
            ctx,
            path,
            keys,
            span
        );
    }
    if (typeof tree.deref === "function") {
        return _normalizeTree(tree.deref(), opts, ctx, path, keys, span);
    }
    return span
        ? ["span", keys ? { key: path.join("-") } : {}, tree.toString()]
        : tree.toString();
};
