import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { isString } from "@thi.ng/checks/is-string";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { RE_TAG } from "./api.js";
import { mergeEmmetAttribs } from "./attribs.js";

export const normalize = (tag: any[]) => {
	let name = tag[0];
	let match: RegExpExecArray | null;
	const hasAttribs = isPlainObject(tag[1]);
	const attribs: any = hasAttribs ? { ...tag[1] } : {};
	if (!isString(name) || !(match = RE_TAG.exec(name))) {
		illegalArgs(`"${name}" is not a valid tag name`);
	}
	name = match![1];
	mergeEmmetAttribs(attribs, match![2], match![3]);
	if (tag.length > 1) {
		tag = tag.slice(hasAttribs ? 2 : 1).filter((x) => x != null);
		if (tag.length > 0) {
			return [name, attribs, tag];
		}
	}
	return [name, attribs];
};
