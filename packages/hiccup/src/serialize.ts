import { implementsFunction } from "@thi.ng/checks/implements-function";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { isFunction } from "@thi.ng/checks/is-function";
import { isString } from "@thi.ng/checks/is-string";

import { TAG_REGEXP, VOID_TAGS } from "./api";
import { css } from "./css";

/**
 * Recursively normalizes and serializes given tree as HTML/SVG/XML string.
 * Expands any embedded component functions with their results. Each node of the
 * input tree can have one of the following input forms:
 *
 * ```js
 * ["tag", ...]
 * ["tag#id.class1.class2", ...]
 * ["tag", {other: "attrib"}, ...]
 * ["tag", {...}, "body", function, ...]
 * [function, arg1, arg2, ...]
 * [iterable]
 * ```
 *
 * Tags can be defined in "Zencoding" convention, e.g.
 *
 * ```js
 * ["div#foo.bar.baz", "hi"] // <div id="foo" class="bar baz">hi</div>
 * ```
 *
 * The presence of the attributes object (2nd array index) is optional.
 * Any attribute values, incl. functions are allowed. If the latter,
 * the function is called with the full attribs object as argument and
 * MUST return a string. This allows for the dynamic creation of attrib
 * values based on other attribs.
 *
 * ```js
 * ["div#foo", {bar: (attribs) => attribs.id + "-bar"}]
 * // <div id="foo" bar="foo-bar"></div>
 * ```
 *
 * The `style` attribute can ONLY be defined as string or object.
 *
 * ```js
 * ["div", {style: {color: "red", background: "#000"}}]
 * // <div style="color:red;background:#000;"></div>
 * ```
 *
 * Boolean attribs are serialized in HTML5 syntax (present or not).
 * `null` or empty string attrib values are ignored.
 *
 * Any `null` or `undefined` array values (other than in head position)
 * will be removed, unless a function is in head position.
 *
 * A function in head position of a node acts as composition & delayed
 * execution mechanism and the function will only be executed at
 * serialization time. In this case all other elements of that node /
 * array are passed as arguments when that function is called.
 * The return value the function MUST be a valid new tree
 * (or `undefined`).
 *
 * ```js
 * const foo = (a, b) => ["div#" + a, b];
 *
 * [foo, "id", "body"] // <div id="id">body</div>
 * ```
 *
 * Functions located in other positions are called **without** args
 * and can return any (serializable) value (i.e. new trees, strings,
 * numbers, iterables or any type with a suitable `.toString()`
 * implementation).
 *
 * @param tree elements / component tree
 * @param escape auto-escape entities
 */
export const serialize = (tree: any[], escape = false) => _serialize(tree, escape);

const _serialize = (tree: any, esc: boolean) => {
    if (tree == null) {
        return "";
    }
    if (Array.isArray(tree)) {
        if (!tree.length) {
            return "";
        }
        let tag = tree[0];
        if (isFunction(tag)) {
            return _serialize(tag.apply(null, tree.slice(1)), esc);
        }
        if (isString(tag)) {
            tree = normalize(tree);
            tag = tree[0];
            let attribs = tree[1];
            let body = tree[2];
            let res = `<${tag}`;
            for (let a in attribs) {
                if (attribs.hasOwnProperty(a)) {
                    let v = attribs[a];
                    if (v != null) {
                        if (isFunction(v)) {
                            if (/^on\w+/.test(a) || (v = v(attribs)) == null) {
                                continue;
                            }
                        }
                        if (v === true) {
                            res += " " + a;
                        } else if (v !== false) {
                            v = v.toString();
                            if (v.length) {
                                res += ` ${a}="${esc ? escape(v) : v}"`;
                            }
                        }
                    }
                }
            }
            if (body) {
                if (VOID_TAGS[tag]) {
                    throw new Error(`No body allowed in tag: ${tag}`);
                }
                res += ">";
                for (let i = 0, n = body.length; i < n; i++) {
                    res += _serialize(body[i], esc);
                }
                return res += `</${tag}>`;
            } else if (!VOID_TAGS[tag]) {
                return res += `></${tag}>`;
            }
            return res += "/>";
        }
        if (iter(tree)) {
            return _serializeIter(tree, esc);
        }
        throw new Error(`invalid tree node: ${tree}`);
    }
    if (isFunction(tree)) {
        return _serialize(tree(), esc);
    }
    if (implementsFunction(tree, "deref")) {
        return _serialize(tree.deref(), esc);
    }
    if (iter(tree)) {
        return _serializeIter(tree, esc);
    }
    return esc ? escape(tree.toString()) : tree;
};

const _serializeIter = (iter: Iterable<any>, esc: boolean) => {
    const res = [];
    for (let i of iter) {
        res.push(_serialize(i, esc));
    }
    return res.join("");
}

const normalize = (tag: any[]) => {
    let el = tag[0], match, id, clazz;
    const attribs: any = {};
    if (!isString(el) || !(match = TAG_REGEXP.exec(el))) {
        throw new Error(`"${el}" is not a valid tag name`);
    }
    el = match[1];
    id = match[2];
    clazz = match[3];
    if (id) {
        attribs.id = id;
    }
    if (clazz) {
        attribs.class = clazz.replace(/\./g, " ");
    }
    if (tag.length > 1) {
        let i = 1;
        const att = tag[1];
        if (isPlainObject(att) && !implementsFunction(att, "deref")) {
            Object.assign(attribs, att);
            i++;
        }
        if (isPlainObject(attribs.style)) {
            attribs.style = css(attribs.style);
        }
        tag = tag.slice(i).filter((x) => x != null);
        if (tag.length > 0) {
            return [el, attribs, tag];
        }
    }
    return [el, attribs];
};

const iter = (x) => !isString(x) && x[Symbol.iterator] !== undefined;
