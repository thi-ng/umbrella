import type { FnN } from "@thi.ng/api";
import { DAY } from "./api";

/**
 * Rounds down `epoch` to beginning of its day.
 *
 * @param epoch
 */
export const floorDay: FnN = (epoch) => {
    const d = new Date(epoch);
    return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
};

/**
 * Rounds down `epoch` to beginning of its month.
 *
 * @param epoch
 */
export const floorMonth: FnN = (epoch) => {
    const d = new Date(epoch);
    return Date.UTC(d.getUTCFullYear(), d.getUTCMonth());
};

/**
 * Rounds down `epoch` to beginning of its year.
 *
 * @param epoch
 */
export const floorYear: FnN = (epoch) => {
    const d = new Date(epoch);
    return Date.UTC(d.getUTCFullYear(), 0);
};

/**
 * Rounds up `epoch` to beginning of following day.
 *
 * @param epoch
 */
export const ceilDay: FnN = (epoch) => {
    const d = new Date(epoch + DAY);
    return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
};

/**
 * Rounds up `epoch` to beginning of following month.
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
 * Rounds up `epoch` to beginning of following year (no overflow checking!).
 *
 * @param epoch
 */
export const ceilYear: FnN = (epoch) => {
    const d = new Date(epoch);
    return Date.UTC(d.getUTCFullYear() + 1, 0);
};
