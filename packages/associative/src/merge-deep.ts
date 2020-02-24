import { isPlainObject } from "@thi.ng/checks";
import { mergeObjWith } from "./merge-with";
import type { IObjectOf } from "@thi.ng/api";

export const mergeDeepObj = (
    dest: IObjectOf<any>,
    ...xs: IObjectOf<any>[]
): any =>
    mergeObjWith(
        (a, b) =>
            isPlainObject(a) && isPlainObject(b) ? mergeDeepObj(a, b) : b,
        dest,
        ...xs
    );
