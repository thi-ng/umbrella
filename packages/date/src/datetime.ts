import { DAYS_IN_MONTH, Precision } from "./api";

export class DateTime {
    t: number;
    s: number;
    m: number;
    h: number;
    d: number;
    M: number;
    y: number;

    constructor(epoch: number, id: Precision = "t") {
        const x = new Date(epoch);
        const prec = "yMdhmst".indexOf(id);
        this.y = prec >= 0 ? x.getUTCFullYear() : 1970;
        this.M = prec >= 1 ? x.getUTCMonth() : 0;
        this.d = prec >= 2 ? x.getUTCDate() : 1;
        this.h = prec >= 3 ? x.getUTCHours() : 0;
        this.m = prec >= 4 ? x.getUTCMinutes() : 0;
        this.s = prec >= 5 ? x.getUTCSeconds() : 0;
        this.t = prec >= 6 ? x.getUTCMilliseconds() : 0;
    }

    getTime() {
        return Date.UTC(this.y, this.M, this.d, this.h, this.m, this.s, this.t);
    }

    incMillisecond() {
        if (++this.t > 999) {
            this.t = 0;
            this.incSecond();
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

    incMinute() {
        if (++this.m > 59) {
            this.m = 0;
            this.incHour();
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

    incDay() {
        if (++this.d > DAYS_IN_MONTH[this.M]) {
            this.d = 1;
            this.incMonth();
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

    incYear() {
        // TODO epoch overflow handling, throw error?
        return ++this.y;
    }
}
