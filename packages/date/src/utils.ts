import { DAYS_IN_MONTH } from "./api";

export const isLeapYear = (y: number) =>
    !(y % 4) && (!!(y % 100) || !(y % 400));

export const daysInMonth = (m: number, isLeap: boolean) => {
    const days = DAYS_IN_MONTH[m];
    return days + (m === 1 && isLeap ? 1 : 0);
};

export const mapWeekday = (d: number) => (d > 0 ? d : 7);
