import { isString } from "@thi.ng/checks/is-string";
import type { HDOMImplementation } from "./api";

export const resolveRoot = (root: any, impl: HDOMImplementation<any>) =>
    isString(root) ? impl.getElementById(root) : root;
