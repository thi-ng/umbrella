import { isString } from "@thi.ng/checks/is-string";

const AUTO_QVAR_PREFIX = "?__q";
let AUTO_QVAR_ID = 0;

export const isQVar = (x: any) =>
    isString(x) && x.charAt(0) === "?";

export const isAutoQVar = (x: any) =>
    isString(x) && x.indexOf(AUTO_QVAR_PREFIX) == 0;

export const autoQVar = () =>
    AUTO_QVAR_PREFIX + (AUTO_QVAR_ID++).toString(36);

export const qvarName = (x: string) =>
    x.substr(1);
