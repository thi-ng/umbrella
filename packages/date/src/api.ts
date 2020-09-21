import type { Fn } from "@thi.ng/api";

/**
 * Second duration in milliseconds
 */
export const SECOND = 1000;
/**
 * Minute duration in milliseconds
 */
export const MINUTE = 60 * SECOND;
/**
 * Hour duration in milliseconds
 */
export const HOUR = 60 * MINUTE;
/**
 * Day duration in milliseconds
 */
export const DAY = 24 * HOUR;
/**
 * Week duration in milliseconds
 */
export const WEEK = 7 * DAY;
/**
 * Mean month duration (30.4375 days) in milliseconds
 */
export const MONTH = 30.4375 * DAY;
/**
 * Mean year duration (365.25 days) in milliseconds
 */
export const YEAR = 365.25 * DAY;

/**
 * Days per month LUT (non-leap year)
 */
export const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export interface Locale {
    /**
     * Names of months
     */
    months: string[];
    /**
     * Names of weekdays (starting w/ Sunday)
     */
    days: string[];
}

export interface IEpoch {
    getTime(): number;
}

export interface EpochIteratorConstructor {
    ([from, to]: (number | IEpoch)[]): EpochIterator;
    (from: number | IEpoch, to: number | IEpoch): EpochIterator;
}

export type EpochIterator = IterableIterator<number>;

export type Precision = "y" | "M" | "d" | "h" | "m" | "s" | "t";

export type FormatFn = Fn<Date, string>;
