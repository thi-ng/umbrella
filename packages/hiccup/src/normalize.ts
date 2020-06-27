import { deref } from "@thi.ng/api";
import { isPlainObject, isString } from "@thi.ng/checks";
import { illegalArgs } from "@thi.ng/errors";
import { RE_TAG } from "./api";
import { mergeClasses } from "./classes";

export const normalize = (tag: any[]) => {
    let el = tag[0];
    let match: RegExpExecArray | null;
    let id: string;
    let clazz: string;
    const hasAttribs = isPlainObject(tag[1]);
    const attribs: any = hasAttribs ? { ...tag[1] } : {};
    if (!isString(el) || !(match = RE_TAG.exec(el))) {
        illegalArgs(`"${el}" is not a valid tag name`);
    }
    el = match![1];
    id = match![2];
    clazz = match![3];
    id && (attribs.id = id);
    let aclass = deref(attribs.class);
    if (clazz) {
        clazz = clazz.replace(/\./g, " ");
        attribs.class = aclass ? mergeClasses(clazz, aclass) : clazz;
    } else if (aclass) {
        attribs.class = isString(aclass) ? aclass : mergeClasses("", aclass);
    }
    if (tag.length > 1) {
        tag = tag.slice(hasAttribs ? 2 : 1).filter((x) => x != null);
        if (tag.length > 0) {
            return [el, attribs, tag];
        }
    }
    return [el, attribs];
};
