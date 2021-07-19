import type { FnN2, FnN3, NumOrString } from "@thi.ng/api";
import { implementsFunction, isNumber, isString } from "@thi.ng/checks";
import {
    DAYS_IN_MONTH,
    DAYS_IN_MONTH_OFFSET,
    MaybeDate,
    Precision,
} from "./api";

/** @internal */
export const Z2 = (x: NumOrString) => {
    let xx = String(x);
    return xx.length > 1 ? xx : "0" + xx;
};

/** @internal */
export const Z3 = (x: NumOrString) => {
    let xx = String(x);
    return xx.length > 2 ? xx : "000".substr(0, 3 - xx.length) + xx;
};

/** @internal */
export const Z4 = (x: NumOrString) => {
    let xx = String(x);
    return xx.length > 3 ? xx : "0000".substr(0, 4 - xx.length) + xx;
};

/**
 * Coerces `x` to a native JS `Date` instance.
 *
 * @param x
 */
export const ensureDate = (x: MaybeDate): Date =>
    isString(x) || isNumber(x)
        ? new Date(x)
        : implementsFunction(x, "toDate")
        ? x.toDate()
        : x;

/**
 * Coerces `x` to a timestamp.
 *
 * @param x
 */
export const ensureEpoch = (x: MaybeDate) =>
    (implementsFunction(x, "getTime") ? x : ensureDate(x)).getTime();

/**
 * Converts a {@link Precision} into a numeric ID.
 *
 * @param prec
 *
 * @internal
 */
export const precisionToID = (prec: Precision) => "yMdhmst".indexOf(prec);

/**
 * Inverse op of {@link precisionToID}.
 *
 * @param id
 *
 * @internal
 */
export const idToPrecision = (id: number) => <Precision>"yMdhmst".charAt(id);

export const isLeapYear = (year: number) =>
    !(year % 4) && (!!(year % 100) || !(year % 400));

export const daysInMonth: FnN2 = (year, month) => {
    const days = DAYS_IN_MONTH[month];
    return days + ~~(month === 1 && isLeapYear(year));
};

export const dayInYear: FnN3 = (y, m, d) =>
    DAYS_IN_MONTH_OFFSET[m] + d + ~~(m > 1 && isLeapYear(y));

export const weekInYear: FnN3 = (y, m, d) => {
    const start = new Date(Date.UTC(y, 0, 1)).getDay() || 7;
    if (!m) {
        if (start === 5 && d < 4) return 53;
        if (start === 6 && d < 3) return 52 + ~~isLeapYear(y - 1);
        if (start === 7 && d < 2) return 52;
    }
    const offset = (start < 5 ? 8 : 15) - start;
    return Math.ceil((dayInYear(y, m, d) - offset) / 7 + 1);
};
