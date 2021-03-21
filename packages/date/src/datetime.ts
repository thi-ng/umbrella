import type { ICopy } from "@thi.ng/api";
import { DAYS_IN_MONTH, Precision } from "./api";

export const dateTime = (epoch?: DateTime | Date | number, prec?: Precision) =>
    new DateTime(epoch, prec);

/**
 * Epoch abstraction with adjustable coarseness/precision. All date fields in
 * UTC only.
 */
export class DateTime implements ICopy<DateTime> {
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

    daysInMonth() {
        const days = DAYS_IN_MONTH[this.M];
        return days + (this.M === 1 && this.isLeapYear() ? 1 : 0);
    }

    /**
     * Leap years are multiple of 4, excludingcentennial years that aren’t
     * multiples of 400.
     */
    isLeapYear() {
        return !(this.y % 4) && (!!(this.y % 100) || !(this.y % 400));
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
