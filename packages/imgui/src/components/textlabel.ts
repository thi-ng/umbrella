import { isPlainObject } from "@thi.ng/checks";
import { ReadonlyVec } from "@thi.ng/vectors";
import { Color } from "../api";

export const textLabelRaw = (
    p: ReadonlyVec,
    attribs: Color | any,
    label: string
) => ["text", isPlainObject(attribs) ? attribs : { fill: attribs }, p, label];
