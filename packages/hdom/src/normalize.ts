import { isArray } from "@thi.ng/checks/is-array";
import { implementsFunction } from "@thi.ng/checks/implements-function";
import { isFunction } from "@thi.ng/checks/is-function";
import { isIterable } from "@thi.ng/checks/is-iterable";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { isString } from "@thi.ng/checks/is-string";
import { TAG_REGEXP } from "@thi.ng/hiccup/api";

export function normalizeElement(spec: any[], keys: boolean) {
    let match, id, clazz, attribs;
    let tag = spec[0];
    let hasAttribs = isPlainObject(spec[1]) && !implementsFunction(spec[1], "deref");
    if (!isString(tag) || !(match = TAG_REGEXP.exec(tag))) {
        throw new Error(`${tag} is not a valid tag name`);
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

export function normalizeTree(el: any, path = [0], keys = true, span = true) {
    if (el == null) {
        return;
    }
    if (isArray(el)) {
        if (el.length === 0) {
            return;
        }
        const tag = el[0];
        let norm;
        // use result of function call & pass remaining array elements as args
        if (isFunction(tag)) {
            return normalizeTree(tag.apply(null, el.slice(1)), path.slice(), keys, span);
        }
        // component object w/ life cycle methods (render() is the only required hook)
        if (implementsFunction(tag, "render")) {
            const args = el.slice(1);
            norm = normalizeTree(tag.render.apply(null, args), path.slice(), keys, span);
            if (norm !== undefined) {
                if (keys && norm[1].key === undefined) {
                    norm[1].key = path.join("-");
                }
                norm.__init = tag.init;
                norm.__release = tag.release;
                norm.__args = args;
            }
            return norm;
        }
        norm = normalizeElement(el, keys);
        if (keys && norm[1].key === undefined) {
            norm[1].key = path.join("-");
        }
        if (norm.length > 2) {
            const tag = norm[0];
            const res = [tag, norm[1]];
            span = span && !NO_SPANS[tag];
            for (let i = 2, j = 2, k = 0, n = norm.length; i < n; i++) {
                let el = norm[i];
                if (el != null) {
                    const isarray = isArray(el);
                    if ((isarray && isArray(el[0])) || (!isarray && !isString(el) && isIterable(el))) {
                        for (let c of el) {
                            c = normalizeTree(c, [...path, k], keys, span);
                            if (c !== undefined) {
                                res[j++] = c;
                            }
                            k++;
                        }
                    } else {
                        el = normalizeTree(el, [...path, k], keys, span);
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
        return normalizeTree(el(), path, keys, span);
    }
    if (implementsFunction(el, "deref")) {
        return normalizeTree(el.deref(), path.slice(), keys, span);
    }
    return span ?
        ["span", keys ? { key: path.join("-") } : {}, el.toString()] :
        el.toString();
}
