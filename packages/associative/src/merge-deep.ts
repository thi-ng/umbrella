import { IObjectOf } from "@thi.ng/api/api";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";

import { mergeObjWith } from "./merge-with";

export function mergeDeepObj(dest: IObjectOf<any>, ...xs: IObjectOf<any>[]) {
    return mergeObjWith(
        (a, b) => isPlainObject(a) && isPlainObject(b) ? mergeDeepObj(a, b) : b,
        dest, ...xs);
}
