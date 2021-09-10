import type { ICompare, ICopy, IEqualsDelta, IEquiv } from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks/is-number";
import { isString } from "@thi.ng/checks/is-string";
import { Z2, Z3, Z4 } from "@thi.ng/strings/pad-left";
import { DAY, HOUR, MaybeDate, MINUTE, Period, Precision, SECOND } from "./api";
import { defFormat } from "./format";
import { LOCALE } from "./i18n";
import {
    dayInYear,
    daysInMonth,
    ensureDate,
    ensureEpoch,
    isLeapYear,
    precisionToID,
    weekInYear,
} from "./utils";

export const dateTime = (epoch?: MaybeDate, prec?: Precision) =>
    new DateTime(epoch, prec);

/**
 * Epoch abstraction with adjustable coarseness/precision. All date fields in
 * UTC only.
 */
export class DateTime
    implements
        ICopy<DateTime>,
        ICompare<MaybeDate>,
        IEquiv,
        IEqualsDelta<MaybeDate>
{
    t: number;
    s: number;
    m: number;
    h: number;
    d: number;
    M: number;
    y: number;

    constructor(epoch: MaybeDate = Date.now(), prec: Precision = "t") {
        const x = ensureDate(epoch);
        const id = precisionToID(prec);
        this.y = x.getUTCFullYear();
        this.M = id >= 1 ? x.getUTCMonth() : 0;
        this.d = id >= 2 ? x.getUTCDate() : 1;
        this.h = id >= 3 ? x.getUTCHours() : 0;
        this.m = id >= 4 ? x.getUTCMinutes() : 0;
        this.s = id >= 5 ? x.getUTCSeconds() : 0;
        this.t = id >= 6 ? x.getUTCMilliseconds() : 0;
    }

    /**
     * Readonly property, returning 1-based quarter
     *
     * @remarks
     * - 1 = Jan - Mar
     * - 2 = Apr - Jun
     * - 3 = Jul - Sep
     * - 4 = Oct - Dec
     */
    get q() {
        return ((this.M / 3) | 0) + 1;
    }

    /**
     * Alias readonly property, same as {@link DateTime.weekInYear}.
     */
    get w() {
        return this.weekInYear();
    }

    set(d: MaybeDate) {
        const $d = ensureDateTime(d);
        this.y = $d.y;
        this.M = $d.M;
        this.d = $d.d;
        this.h = $d.h;
        this.m = $d.m;
        this.s = $d.s;
        this.t = $d.t;
        return this;
    }

    copy() {
        return new DateTime(this.toISOString());
    }

    getTime() {
        return Date.UTC(this.y, this.M, this.d, this.h, this.m, this.s, this.t);
    }

    withPrecision(prec: Precision) {
        return new DateTime(this, prec);
    }

    setPrecision(prec: Precision) {
        const precID = precisionToID(prec);
        precID < 6 && (this.t = 0);
        precID < 5 && (this.s = 0);
        precID < 4 && (this.m = 0);
        precID < 3 && (this.h = 0);
        precID < 2 && (this.d = 1);
        precID < 1 && (this.M = 0);
        return this;
    }

    compare(d: MaybeDate) {
        return this.getTime() - ensureEpoch(d);
    }

    /**
     * Returns true if this instance is before the given date, i.e. if
     * `this.compare(d) < 0`.
     *
     * @param d
     */
    isBefore(d: MaybeDate) {
        return this.compare(d) < 0;
    }

    /**
     * Returns true if this instance is before the given date, i.e. if
     * `this.compare(d) > 0`.
     *
     * @param d
     */
    isAfter(d: MaybeDate) {
        return this.compare(d) > 0;
    }

    equiv(o: any) {
        return maybeIsDate(o) ? this.compare(o) === 0 : false;
    }

    eqDelta(d: MaybeDate, eps = 0) {
        return Math.abs(this.getTime() - ensureDate(d).getTime()) <= eps;
    }

    daysInMonth() {
        return daysInMonth(this.y, this.M);
    }

    dayInYear() {
        return dayInYear(this.y, this.M, this.d);
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
        return weekInYear(this.y, this.M, this.d);
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
        return this.weekInYear();
    }

    decWeek() {
        this.d -= 7;
        if (this.d < 1) {
            this.decMonth();
            this.d += this.daysInMonth();
        }
        return this.weekInYear();
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

    incQuarter() {
        this.M += 3;
        if (this.M > 11) {
            this.M %= 12;
            this.y++;
        }
        return this.q;
    }

    decQuarter() {
        this.M -= 3;
        if (this.M < 0) {
            this.M += 12;
            this.y--;
        }
        return this.q;
    }

    incYear() {
        // TODO epoch overflow handling, throw error?
        return ++this.y;
    }

    decYear() {
        // TODO epoch underflow handling, throw error?
        return --this.y;
    }

    /**
     * Returns a new `DateTime` instance relative to this date, but with given
     * period added/subtracted.
     *
     * @param x
     * @param prec
     */
    add(x: number, prec: Period): DateTime {
        if (prec === "w") return this.add(x * 7, "d");
        if (prec === "q") return this.add(x * 3, "M");
        const res = this.copy();
        const precID = precisionToID(prec);
        if (precID >= 2) {
            res.set(
                res.getTime() + x * [DAY, HOUR, MINUTE, SECOND, 1][precID - 2]
            );
        } else if (prec === "M") {
            const y = (x / 12) | 0;
            res.y += y;
            x -= y * 12;
            const m = res.M + x;
            m > 11 && res.y++;
            m < 0 && res.y--;
            res.M = m % 12;
            if (res.M < 0) res.M += 12;
            res.d = Math.min(res.d, res.daysInMonth());
        } else if (prec === "y") {
            res.y += x;
        }
        return res;
    }

    toDate() {
        return new Date(this.toISOString());
    }

    toJSON() {
        return this.toISOString();
    }

    toString() {
        return this.toDate().toUTCString();
    }

    /**
     * Returns formatted version using current {@link LOCALE.dateTime}
     * formatter.
     *
     * @remarks
     * The host environment's locale is NOT used. Only the currently active
     * `LOCALE` is relevant.
     */
    toLocaleString() {
        return defFormat(LOCALE.dateTime)(this, true);
    }

    toISOString() {
        return `${Z4(this.y)}-${Z2(this.M + 1)}-${Z2(this.d)}T${Z2(
            this.h
        )}:${Z2(this.m)}:${Z2(this.s)}.${Z3(this.t)}Z`;
    }

    valueOf() {
        return this.getTime();
    }
}

/**
 * Coerces `x` to a {@link DateTime} instance.
 *
 * @param x
 */
export const ensureDateTime = (x: MaybeDate, prec: Precision = "t") =>
    x instanceof DateTime ? x : new DateTime(x, prec);

/**
 * Returns true if `x` is a {@link MaybeDate}.
 *
 * @param x
 */
export const maybeIsDate = (x: any) =>
    x instanceof DateTime || x instanceof Date || isNumber(x) || isString(x);
