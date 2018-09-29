import { isString } from "@thi.ng/checks/is-string";

export const resolveRoot = (root: any) =>
    isString(root) ?
        document.getElementById(root) :
        root;