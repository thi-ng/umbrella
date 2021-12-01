import { padLeft } from "@thi.ng/strings/pad-left";
import { percent as $percent } from "@thi.ng/strings/percent";
import { maybeParseFloat, maybeParseInt } from "@thi.ng/strings/parse";
import type { CellTransform } from "./api.js";

/**
 * Cell parse value transform. Returns uppercased version of given input.
 *
 * @param x
 */
export const upper: CellTransform = (x) => x.toUpperCase();

/**
 * Cell parse value transform. Returns lowercased version of given input.
 *
 * @param x
 */
export const lower: CellTransform = (x) => x.toLowerCase();

/**
 * Higher-order cell parse value transform. Attempts to parse cell values as
 * floating point number or returns `defaultVal` if not possible.
 *
 * @param defaultVal
 */
export const float =
    (defaultVal = 0): CellTransform =>
    (x) =>
        maybeParseFloat(x, defaultVal);

/**
 * Higher-order cell parse value transform. Attempts to parse cell values as
 * integer or returns `defaultVal` if not possible.
 *
 * @param defaultVal
 */
export const int =
    (defaultVal = 0): CellTransform =>
    (x) =>
        maybeParseInt(x, defaultVal, 10);

/**
 * Higher-order cell parse value transform. Attempts to parse cell values as
 * hexadecimal integer or returns `defaultVal` if not possible.
 *
 * @param defaultVal
 */
export const hex =
    (defaultVal = 0): CellTransform =>
    (x) =>
        maybeParseInt(x, defaultVal, 16);

export const percent: CellTransform = (x) => maybeParseFloat(x) * 0.01;

/**
 * Higher-order cell parse value transform. Attempts to parse cell values as
 * Unix epoch/timestamp or returns `defaultVal` if not possible.
 *
 * @param defaultVal
 */
export const epoch =
    (defaultVal = 0): CellTransform =>
    (x) => {
        const res = Date.parse(x);
        return isNaN(res) ? defaultVal : res;
    };

/**
 * Higher-order cell parse value transform. Attempts to parse cell values as JS
 * `Date` instance or returns `defaultVal` if not possible.
 *
 * @param defaultVal
 */
export const date =
    (defaultVal?: Date): CellTransform =>
    (x) => {
        const epoch = Date.parse(x);
        if (isNaN(epoch)) return defaultVal;
        const res = new Date();
        res.setTime(epoch);
        return res;
    };

/**
 * Cell parse value transform. Attempts to parse cell values as JS `URL`
 * instances.
 *
 * @param x
 */
export const url: CellTransform = (x) => new URL(x);

// formatters

export const zeroPad = (digits: number) => padLeft(digits, "0");

export const formatFloat =
    (prec = 2) =>
    (x: number) =>
        x.toFixed(prec);

/**
 * Higher order cell value formatter. Takes normalized values and formats them
 * as percentage with given `precision` (number of fractional digits).
 */
export const formatPercent = $percent;
