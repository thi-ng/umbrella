import { DAYS_IN_MONTH } from "./api";

export const isLeapYear = (year: number) =>
    !(year % 4) && (!!(year % 100) || !(year % 400));

export const daysInMonth = (year: number, month: number) => {
    const days = DAYS_IN_MONTH[month];
    return days + ~~(month === 1 && isLeapYear(year));
};

export const mapWeekday = (day: number) => (day > 0 ? day : 7);
