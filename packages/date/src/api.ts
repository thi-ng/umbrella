import type { Fn } from "@thi.ng/api";

export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;
export const WEEK = 7 * DAY;
export const MONTH = 30.4375 * DAY;
export const YEAR = 365.25 * DAY;

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

export interface EpochIteratorConstructor {
    ([from, to]: number[]): EpochIterator;
    (from: number, to: number): EpochIterator;
}

export type EpochIterator = IterableIterator<number>;

export type Precision = "y" | "M" | "d" | "h" | "m" | "s" | "t";

export type FormatFn = Fn<Date, string>;
