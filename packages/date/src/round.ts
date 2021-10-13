import { DAY, HOUR, MINUTE, RoundingFn, SECOND, WEEK } from "./api.js";
import { ensureDate } from "./checks.js";

/**
 * Rounds down `epoch` to minute precision.
 *
 * @param epoch
 */
export const floorSecond: RoundingFn = (epoch) => {
    const d = ensureDate(epoch);
    return Date.UTC(
        d.getUTCFullYear(),
        d.getUTCMonth(),
        d.getUTCDate(),
        d.getUTCHours(),
        d.getUTCMinutes(),
        d.getUTCSeconds()
    );
};

/**
 * Rounds down `epoch` to minute precision.
 *
 * @param epoch
 */
export const floorMinute: RoundingFn = (epoch) => {
    const d = ensureDate(epoch);
    return Date.UTC(
        d.getUTCFullYear(),
        d.getUTCMonth(),
        d.getUTCDate(),
        d.getUTCHours(),
        d.getUTCMinutes()
    );
};

/**
 * Rounds down `epoch` to hour precision.
 *
 * @param epoch
 */
export const floorHour: RoundingFn = (epoch) => {
    const d = ensureDate(epoch);
    return Date.UTC(
        d.getUTCFullYear(),
        d.getUTCMonth(),
        d.getUTCDate(),
        d.getUTCHours()
    );
};

/**
 * Rounds down `epoch` to day precision
 *
 * @param epoch
 */
export const floorDay: RoundingFn = (epoch) => {
    const d = ensureDate(epoch);
    return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
};

/**
 * Rounds down `epoch` to week precision. Assumes ISO8601 week logic, i.e. weeks
 * start on Monday.
 *
 * @param epoch
 */
export const floorWeek: RoundingFn = (epoch) => {
    const d = ensureDate(epoch);
    const w = d.getUTCDay();
    return (
        Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) -
        ((w || 7) - 1) * DAY
    );
};

/**
 * Rounds down `epoch` to month precision.
 *
 * @param epoch
 */
export const floorMonth: RoundingFn = (epoch) => {
    const d = ensureDate(epoch);
    return Date.UTC(d.getUTCFullYear(), d.getUTCMonth());
};

/**
 * Rounds down `epoch` to month precision, but at beginning of a quarter.
 *
 * @param epoch
 */
export const floorQuarter: RoundingFn = (epoch) => {
    const d = ensureDate(epoch);
    return Date.UTC(d.getUTCFullYear(), ((d.getUTCMonth() / 3) | 0) * 3);
};

/**
 * Rounds down `epoch` to year precision.
 *
 * @param epoch
 */
export const floorYear: RoundingFn = (epoch) =>
    Date.UTC(ensureDate(epoch).getUTCFullYear(), 0);

/**
 * Rounds up `epoch` to minute precision.
 *
 * @param epoch
 */
export const ceilSecond: RoundingFn = (epoch) =>
    floorSecond(ensureDate(epoch).getTime() + SECOND);

/**
 * Rounds up `epoch` to minute precision.
 *
 * @param epoch
 */
export const ceilMinute: RoundingFn = (epoch) =>
    floorMinute(ensureDate(epoch).getTime() + MINUTE);

/**
 * Rounds up `epoch` to hour precision.
 *
 * @param epoch
 */
export const ceilHour: RoundingFn = (epoch) =>
    floorHour(ensureDate(epoch).getTime() + HOUR);

/**
 * Rounds up `epoch` to day precision
 *
 * @param epoch
 */
export const ceilDay: RoundingFn = (epoch) =>
    floorDay(ensureDate(epoch).getTime() + DAY);

/**
 * Rounds up `epoch` to week precision. Assumes ISO8601 week logic, i.e. weeks
 * start on Monday.
 *
 * @param epoch
 */
export const ceilWeek: RoundingFn = (epoch) =>
    floorWeek(ensureDate(epoch).getTime() + WEEK);

/**
 * Rounds up `epoch` to month precision
 *
 * @param epoch
 */
export const ceilMonth: RoundingFn = (epoch) => {
    const d = ensureDate(epoch);
    let y = d.getUTCFullYear();
    let m = d.getUTCMonth() + 1;
    m > 11 && y++;
    return Date.UTC(y, m % 12);
};

/**
 * Rounds up `epoch` to month precision (beginning of next quarter)
 *
 * @param epoch
 */
export const ceilQuarter: RoundingFn = (epoch) => {
    const d = ensureDate(epoch);
    let y = d.getUTCFullYear();
    let m = (((d.getUTCMonth() + 3) / 3) | 0) * 3;
    m > 11 && y++;
    return Date.UTC(y, m % 12);
};

/**
 * Rounds up `epoch` to year precision
 *
 * @param epoch
 */
export const ceilYear: RoundingFn = (epoch) =>
    Date.UTC(ensureDate(epoch).getUTCFullYear() + 1, 0);
