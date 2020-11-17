import { maybeParseFloat, maybeParseInt } from "@thi.ng/strings";
import { CoercionFn } from "./api";

export const float = (defaultVal = 0): CoercionFn => (x) =>
    maybeParseFloat(x, defaultVal);

export const int = (defaultVal = 0): CoercionFn => (x) =>
    maybeParseInt(x, defaultVal, 10);

export const hex = (defaultVal = 0): CoercionFn => (x) =>
    maybeParseInt(x, defaultVal, 16);
