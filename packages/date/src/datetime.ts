import type { ICompare, ICopy, IEqualsDelta, IEquiv } from "@thi.ng/api";
import { DAYS_IN_MONTH_OFFSET, Precision } from "./api";
import { daysInMonth, isLeapYear, mapWeekday } from "./utils";

export const dateTime = (epoch?: DateTime | Date | number, prec?: Precision) =>
    new DateTime(epoch, prec);

/**
 * Epoch abstraction with adjustable coarseness/precision. All date fields in
 * UTC only.
 */
export class DateTime
    implements
        ICopy<DateTime>,
        ICompare<DateTime | Date | number>,
        IEquiv,
        IEqualsDelta<DateTime | Date | number>
{
    t: number;
    s: number;
    m: number;
    h: number;
    d: number;
    M: number;
    y: number;

    constructor(
        epoch: DateTime | Date | number = Date.now(),
        prec: Precision = "t"
    ) {
        const x = ensureDate(epoch);
        const id = "yMdhmst".indexOf(prec);
        this.y = x.getUTCFullYear();
        this.M = id >= 1 ? x.getUTCMonth() : 0;
        this.d = id >= 2 ? x.getUTCDate() : 1;
        this.h = id >= 3 ? x.getUTCHours() : 0;
        this.m = id >= 4 ? x.getUTCMinutes() : 0;
        this.s = id >= 5 ? x.getUTCSeconds() : 0;
        this.t = id >= 6 ? x.getUTCMilliseconds() : 0;
    }

    copy() {
        return new DateTime(this.getTime());
    }

    getTime() {
        return Date.UTC(this.y, this.M, this.d, this.h, this.m, this.s, this.t);
    }

    compare(d: DateTime | Date | number) {
        return this.getTime() - ensureDate(d).getTime();
    }

    equiv(o: any) {
        return o instanceof DateTime ||
            o instanceof Date ||
            typeof o === "number"
            ? this.compare(o) === 0
            : false;
    }

    eqDelta(d: DateTime | Date | number, eps = 0) {
        return Math.abs(this.getTime() - ensureDate(d).getTime()) <= eps;
    }

    daysInMonth() {
        return daysInMonth(this.y, this.M);
    }

    dayInYear() {
        return (
            DAYS_IN_MONTH_OFFSET[this.M] +
            this.d +
            ~~(this.M > 1 && this.isLeapYear())
        );
    }

    /**
     * Returns week number according to ISO8601.
     *
     * @remarks
     * Reference:
     * https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
     *
     */
    weekInYear() {
        const start = mapWeekday(new Date(Date.UTC(this.y, 0, 1)).getDay());
        if (!this.M) {
            if (start === 5 && this.d < 4) return 53;
            if (start === 6 && this.d < 3) return 52 + ~~isLeapYear(this.y - 1);
            if (start === 7 && this.d < 2) return 52;
        }
        const offset = (start < 5 ? 8 : 15) - start;
        return Math.ceil((this.dayInYear() - offset) / 7 + 1);
    }

    /**
     * Leap years are multiple of 4, excludingcentennial years that aren’t
     * multiples of 400.
     */
    isLeapYear() {
        return isLeapYear(this.y);
    }

    incMillisecond() {
        if (++this.t > 999) {
            this.t = 0;
            this.incSecond();
        }
        return this.t;
    }

    decMillisecond() {
        if (--this.t < 0) {
            this.t = 999;
            this.decSecond();
        }
        return this.t;
    }

    incSecond() {
        if (++this.s > 59) {
            this.s = 0;
            this.incMinute();
        }
        return this.s;
    }

    decSecond() {
        if (--this.s < 0) {
            this.s = 59;
            this.decMinute();
        }
        return this.s;
    }

    incMinute() {
        if (++this.m > 59) {
            this.m = 0;
            this.incHour();
        }
        return this.m;
    }

    decMinute() {
        if (--this.m < 0) {
            this.m = 59;
            this.decHour();
        }
        return this.m;
    }

    incHour() {
        if (++this.h > 23) {
            this.h = 0;
            this.incDay();
        }
        return this.h;
    }

    decHour() {
        if (--this.h < 0) {
            this.h = 23;
            this.decDay();
        }
        return this.h;
    }

    incDay() {
        if (++this.d > this.daysInMonth()) {
            this.d = 1;
            this.incMonth();
        }
        return this.d;
    }

    decDay() {
        if (--this.d < 1) {
            this.decMonth();
            this.d = this.daysInMonth();
        }
        return this.d;
    }

    incWeek() {
        this.d += 7;
        const max = this.daysInMonth();
        if (this.d > max) {
            this.d -= max;
            this.incMonth();
        }
        return this.d;
    }

    decWeek() {
        this.d -= 7;
        if (this.d < 1) {
            this.decMonth();
            this.d += this.daysInMonth();
        }
        return this.d;
    }

    incMonth() {
        if (++this.M > 11) {
            this.M = 0;
            ++this.y;
        }
        return this.M;
    }

    decMonth() {
        if (--this.M < 0) {
            this.M = 11;
            --this.y;
        }
        return this.M;
    }

    incYear() {
        // TODO epoch overflow handling, throw error?
        return ++this.y;
    }

    decYear() {
        // TODO epoch underflow handling, throw error?
        return --this.y;
    }

    toDate() {
        return new Date(this.getTime());
    }

    toJSON() {
        return this.toISOString();
    }

    toString() {
        return this.toDate().toUTCString();
    }

    toISOString() {
        return this.toDate().toISOString();
    }
}

export const ensureDate = (x: number | DateTime | Date) =>
    typeof x === "number"
        ? new Date(x)
        : x instanceof DateTime
        ? x.toDate()
        : x;
