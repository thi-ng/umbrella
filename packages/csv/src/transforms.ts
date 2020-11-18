import { maybeParseFloat, maybeParseInt } from "@thi.ng/strings";
import { CellTransform } from "./api";

export const upper: CellTransform = (x) => x.toUpperCase();

export const lower: CellTransform = (x) => x.toLowerCase();

export const float = (defaultVal = 0): CellTransform => (x) =>
    maybeParseFloat(x, defaultVal);

export const int = (defaultVal = 0): CellTransform => (x) =>
    maybeParseInt(x, defaultVal, 10);

export const hex = (defaultVal = 0): CellTransform => (x) =>
    maybeParseInt(x, defaultVal, 16);
