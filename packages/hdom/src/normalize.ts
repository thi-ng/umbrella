import { illegalArgs } from "@thi.ng/api/error";
import { isArray } from "@thi.ng/checks/is-array";
import { implementsFunction } from "@thi.ng/checks/implements-function";
import { isFunction } from "@thi.ng/checks/is-function";
import { isIterable } from "@thi.ng/checks/is-iterable";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { isString } from "@thi.ng/checks/is-string";
import { TAG_REGEXP } from "@thi.ng/hiccup/api";

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
 * @param spec
 * @param keys
 */
export function normalizeElement(spec: any[], keys: boolean) {
    let tag = spec[0], hasAttribs = isPlainObject(spec[1]), match, id, clazz, attribs;
    if (!isString(tag) || !(match = TAG_REGEXP.exec(tag))) {
        illegalArgs(`${tag} is not a valid tag name`);
    }
    // return orig if already normalized and satifies key requirement
    if (tag === match[1] && hasAttribs && (!keys || spec[1].key)) {
        return spec;
    }
    attribs = hasAttribs ? { ...spec[1] } : {};
    id = match[2];
    clazz = match[3];
    if (id) {
        attribs.id = id;
    }
    if (clazz) {
        clazz = clazz.replace(/\./g, " ");
        if (attribs.class) {
            attribs.class += " " + clazz;
        } else {
            attribs.class = clazz;
        }
    }
    return [match[1], attribs, ...spec.slice(hasAttribs ? 2 : 1)];
}

const NO_SPANS = {
    option: 1,
    text: 1,
    textarea: 1,
};

/**
 * Calling this function is a prerequisite before passing a component
 * tree to `diffElement`. Recursively expands given hiccup component
 * tree into its canonical form by:
 *
 * - resolving Emmet-style tags (e.g. from `div#id.foo.bar`)
 * - evaluating embedded functions and replacing them with their result
 * - calling `render` lifecycle method on component objects and using
 *   result
 * - consuming iterables and normalizing results
 * - calling `deref()` on elements implementing `IDeref` interface and
 *   using returned result
 * - calling `.toString()` on any other non-component value `x` and by
 *   default wrapping it in `["span", x]`. The only exceptions to this
 *   are: `option`, `textarea` and SVG `text` elements, for which spans
 *   are always skipped.
 *
 * Additionally, unless `keys` is set to false, an unique `key`
 * attribute is created for each node in the tree. This attribute is
 * used by `diffElement` to figure out if a changed node can be just
 * patched or will need to be replaced/removed. The `key` values are
 * defined by the `path` array arg.
 *
 * For normal usage only the first 2 args should be specified and the
 * rest kept at their defaults.
 *
 * See `normalizeElement` for further details about canonical form.
 *
 * @param el
 * @param ctx
 * @param path
 * @param keys
 * @param span
 */
export function normalizeTree(el: any, ctx: any, path = [0], keys = true, span = true) {
    if (el == null) {
        return;
    }
    if (isArray(el)) {
        if (el.length === 0) {
            return;
        }
        const tag = el[0];
        let norm, nattribs;
        // use result of function call
        // pass ctx as first arg and remaining array elements as rest args
        if (isFunction(tag)) {
            return normalizeTree(tag.apply(null, [ctx, ...el.slice(1)]), ctx, path.slice(), keys, span);
        }
        // component object w/ life cycle methods
        // (render() is the only required hook)
        if (implementsFunction(tag, "render")) {
            const args = [ctx, ...el.slice(1)];
            norm = normalizeTree(tag.render.apply(null, args), ctx, path.slice(), keys, span);
            if (norm !== undefined) {
                nattribs = norm[1];
                if (keys && nattribs.key === undefined) {
                    nattribs.key = path.join("-");
                }
                norm.__init = tag.init;
                norm.__release = tag.release;
                norm.__args = args;
            }
            return norm;
        }
        norm = normalizeElement(el, keys);
        nattribs = norm[1];
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
                    if ((isarray && isArray(el[0])) || (!isarray && !isString(el) && isIterable(el))) {
                        for (let c of el) {
                            c = normalizeTree(c, ctx, path.concat(k), keys, span);
                            if (c !== undefined) {
                                res[j++] = c;
                            }
                            k++;
                        }
                    } else {
                        el = normalizeTree(el, ctx, path.concat(k), keys, span);
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
    if (isFunction(el)) {
        return normalizeTree(el(ctx), ctx, path, keys, span);
    }
    if (implementsFunction(el, "deref")) {
        return normalizeTree(el.deref(), ctx, path.slice(), keys, span);
    }
    return span ?
        ["span", keys ? { key: path.join("-") } : {}, el.toString()] :
        el.toString();
}
