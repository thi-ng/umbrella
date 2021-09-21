import { padLeft } from "@thi.ng/strings/pad-left";
import { maybeParseFloat, maybeParseInt } from "@thi.ng/strings/parse";
import type { CellTransform } from "./api";

export const upper: CellTransform = (x) => x.toUpperCase();

export const lower: CellTransform = (x) => x.toLowerCase();

export const float =
    (defaultVal = 0): CellTransform =>
    (x) =>
        maybeParseFloat(x, defaultVal);

export const int =
    (defaultVal = 0): CellTransform =>
    (x) =>
        maybeParseInt(x, defaultVal, 10);

export const hex =
    (defaultVal = 0): CellTransform =>
    (x) =>
        maybeParseInt(x, defaultVal, 16);

// formatters

export const zeroPad = (digits: number) => padLeft(digits, "0");

export const formatFloat =
    (prec = 2) =>
    (x: number) =>
        x.toFixed(prec);
