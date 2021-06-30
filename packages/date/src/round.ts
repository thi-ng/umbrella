import type { FnN } from "@thi.ng/api";
import { DAY, HOUR, MINUTE, SECOND } from "./api";

/**
 * Rounds down `epoch` to minute precision.
 *
 * @param epoch
 */
export const floorSecond: FnN = (epoch) => {
    const d = new Date(epoch);
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
export const floorMinute: FnN = (epoch) => {
    const d = new Date(epoch);
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
export const floorHour: FnN = (epoch) => {
    const d = new Date(epoch);
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
export const floorDay: FnN = (epoch) => {
    const d = new Date(epoch);
    return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
};

/**
 * Rounds down `epoch` to month precision.
 *
 * @param epoch
 */
export const floorMonth: FnN = (epoch) => {
    const d = new Date(epoch);
    return Date.UTC(d.getUTCFullYear(), d.getUTCMonth());
};

/**
 * Rounds down `epoch` to year precision.
 *
 * @param epoch
 */
export const floorYear: FnN = (epoch) => {
    const d = new Date(epoch);
    return Date.UTC(d.getUTCFullYear(), 0);
};

/**
 * Rounds up `epoch` to minute precision.
 *
 * @param epoch
 */
export const ceilSecond: FnN = (epoch) => floorSecond(epoch + SECOND);

/**
 * Rounds up `epoch` to minute precision.
 *
 * @param epoch
 */
export const ceilMinute: FnN = (epoch) => floorMinute(epoch + MINUTE);

/**
 * Rounds up `epoch` to hour precision.
 *
 * @param epoch
 */
export const ceilHour: FnN = (epoch) => floorHour(epoch + HOUR);

/**
 * Rounds up `epoch` to day precision
 *
 * @param epoch
 */
export const ceilDay: FnN = (epoch) => floorDay(epoch + DAY);

/**
 * Rounds up `epoch` to month precision
 *
 * @param epoch
 */
export const ceilMonth: FnN = (epoch) => {
    const d = new Date(epoch);
    let y = d.getUTCFullYear();
    let m = d.getUTCMonth() + 1;
    m > 11 && y++;
    return Date.UTC(y, m % 12);
};

/**
 * Rounds up `epoch` to year precision
 *
 * @param epoch
 */
export const ceilYear: FnN = (epoch) => {
    const d = new Date(epoch);
    return Date.UTC(d.getUTCFullYear() + 1, 0);
};
