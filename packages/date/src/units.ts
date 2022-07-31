import type { FnN2, FnN3 } from "@thi.ng/api";
import { DAYS_IN_MONTH, DAYS_IN_MONTH_OFFSET } from "./api.js";
import { isLeapYear } from "./checks.js";

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
