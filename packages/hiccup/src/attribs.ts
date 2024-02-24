import { deref } from "@thi.ng/api/deref";
import { isArray } from "@thi.ng/checks/is-array";
import { isString } from "@thi.ng/checks/is-string";

/**
 * Takes a space separated string of existing CSS class names and merges it with
 * `val`, which is either another string or string array of class names, an
 * object of booleans or an `IDeref` evaluating to either. Returns updated class
 * string.
 *
 * @remarks
 * If `val` evaluates to a string, it will be appended to `existing`.
 *
 * If `val` is an array, it will be joined as space-separated string and
 * concatenated to the existing one.
 *
 * If `val` is an object, its keys are used as class names and their values
 * indicate if the class should be added or removed from the existing set.
 *
 * @example
 * ```ts
 * import { mergeClasses } from "@thi.ng/hiccup";
 *
 * mergeClasses("foo bar", { foo: false, baz: true })
 * // "bar baz"
 *
 * mergeClasses("foo", ["bar", "baz"]);
 * // "foo bar baz"
 *
 * mergeClasses("foo bar", "baz");
 * // "foo bar baz"
 * ```
 *
 * @param existing -
 * @param val -
 */
export const mergeClasses = (existing: string, val: any) => {
	val = deref(val);
	if (val == null) return existing;
	if (isArray(val)) val = val.join(" ");
	if (isString(val)) return existing ? existing + " " + val : val;
	const classes = new Set(existing ? existing.split(" ") : undefined);
	for (let id in val) {
		deref(val[id]) ? classes.add(id) : classes.delete(id);
	}
	return [...classes].join(" ");
};

/**
 * Takes an attrib object and optional element ID and CSS class names from Emmet-style
 * hiccup tag, then transforms and merges definitions, returns attribs.
 *
 * @param attribs -
 * @param id -
 * @param classes -
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
