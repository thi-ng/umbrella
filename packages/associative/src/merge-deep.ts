import type { IObjectOf, Nullable } from "@thi.ng/api";
import { isPlainObject } from "@thi.ng/checks";
import { mergeObjWith } from "./merge-with";

export const mergeDeepObj = (
    dest: IObjectOf<any>,
    ...xs: Nullable<IObjectOf<any>>[]
): any =>
    mergeObjWith(
        (a, b) =>
            isPlainObject(a) && isPlainObject(b) ? mergeDeepObj(a, b) : b,
        dest,
        ...xs
    );
