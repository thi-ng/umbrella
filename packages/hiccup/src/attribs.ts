import { deref } from "@thi.ng/api/api/deref";
import { isString } from "@thi.ng/checks/is-string";

/**
 * Takes a space separated string of existing CSS class names and merges
 * it with `val`, which is either another string of class names, an
 * object of booleans or an `IDeref` evaluating to either. Returns
 * updated class string.
 *
 * @remarks
 * If `val` evaluates to a string, it will be appended to `existing`.
 *
 * If `val` is an object, its keys are used as class names and their
 * values indicate if the class should be added or removed from the
 * existing set.
 *
 * @example
 * ```ts
 * mergeClasses("foo bar", { foo: false, baz: true })
 * // "bar baz"
 *
 * mergeClasses("foo bar", "baz");
 * // "baz"
 * ```
 *
 * @param existing
 * @param val
 */
export const mergeClasses = (existing: string, val: any) => {
    val = deref(val);
    if (val == null) return existing;
    if (isString(val)) return existing + " " + val;
    const classes = new Set(existing.split(" "));
    for (let id in val) {
        deref(val[id]) ? classes.add(id) : classes.delete(id);
    }
    return [...classes].join(" ");
};

/**
 * Takes an attrib object and optional element ID and CSS class names from Emmet-style
 * hiccup tag, then transforms and merges definitions, returns attribs.
 *
 * @param attribs
 * @param id
 * @param classes
 */
export const mergeEmmetAttribs = (
    attribs: any,
    id?: string,
    classes?: string
) => {
    id && (attribs.id = id);
    let aclass = deref(attribs.class);
    if (classes) {
        classes = classes.replace(/\./g, " ");
        attribs.class = aclass ? mergeClasses(classes, aclass) : classes;
    } else if (aclass) {
        attribs.class = isString(aclass) ? aclass : mergeClasses("", aclass);
    }
    return attribs;
};
