import { isString } from "util";

export const isHexColorString = (x: any): x is string =>
    isString(x) && /#([a-f0-9]{3}|[a-f0-9]{4}(?:[a-f0-9]{2}){0,2})\b/gi.test(x);
