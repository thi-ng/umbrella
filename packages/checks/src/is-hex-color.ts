import { isString } from "./is-string.js";

const RE = /^#([a-f0-9]{3}|[a-f0-9]{4}(?:[a-f0-9]{2}){0,2})$/i;

export const isHexColor = (x: any): x is string => isString(x) && RE.test(x);
