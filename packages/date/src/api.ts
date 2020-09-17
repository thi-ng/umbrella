export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;
export const WEEK = 7 * DAY;
export const MONTH = 30.4375 * DAY;
export const YEAR = 365.25 * DAY;

export type Precision = "y" | "M" | "d" | "h" | "m" | "s" | "t";

export const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const MONTH_NAMES = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export interface EpochIteratorConstructor {
    ([from, to]: number[]): EpochIterator;
    (from: number, to: number): EpochIterator;
}

export type EpochIterator = IterableIterator<number>;
