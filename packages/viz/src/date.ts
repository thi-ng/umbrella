import type { Domain } from "./api";

export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;
export const WEEK = 7 * DAY;
export const MONTH = 30.4375 * DAY;
export const YEAR = 365.25 * DAY;

export const floorDay = (epoch: number) => {
    const d = new Date(epoch);
    return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
};

export const floorMonth = (epoch: number) => {
    const d = new Date(epoch);
    return Date.UTC(d.getUTCFullYear(), d.getUTCMonth());
};

export const floorYear = (epoch: number) => {
    const d = new Date(epoch);
    return Date.UTC(d.getUTCFullYear(), 0);
};

export const ceilDay = (epoch: number) => {
    const d = new Date(epoch + DAY);
    return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
};

export const ceilMonth = (epoch: number) => {
    let d = new Date(epoch);
    d = new Date(epoch + DAYS_IN_MONTH[d.getUTCMonth()] * DAY);
    return Date.UTC(d.getUTCFullYear(), d.getUTCMonth());
};

export const ceilYear = (epoch: number) => {
    const d = new Date(epoch);
    return Date.UTC(d.getUTCFullYear() + 1, 0);
};

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export function* years([from, to]: Domain) {
    const d1 = new Date(from);
    const d2 = new Date(to);
    for (
        let y1 = d1.getUTCFullYear(), y2 = d2.getUTCFullYear();
        y1 <= y2;
        y1++
    ) {
        const epoch = Date.UTC(y1, 0);
        if (epoch >= from) yield epoch;
    }
}

export function* months([from, to]: Domain) {
    const d1 = new Date(from);
    const d2 = new Date(to);
    let m1 = d1.getUTCMonth();
    let y1 = d1.getUTCFullYear();
    const m2 = d2.getUTCMonth();
    const y2 = d2.getUTCFullYear();
    while (y1 <= y2 || m1 <= m2) {
        const epoch = Date.UTC(y1, m1);
        if (epoch >= from && epoch < to) yield epoch;
        if (++m1 === 12) {
            m1 = 0;
            ++y1;
        }
    }
}

export function* days([from, to]: Domain) {
    const t1 = new Date(from);
    const t2 = new Date(to);
    let d1 = t1.getUTCDate();
    let m1 = t1.getUTCMonth();
    let y1 = t1.getUTCFullYear();
    const d2 = t2.getUTCDate();
    const m2 = t2.getUTCMonth();
    const y2 = t2.getUTCFullYear();
    while (y1 <= y2 || m1 <= m2 || d1 <= d2) {
        const epoch = Date.UTC(y1, m1, d1);
        if (epoch >= from && epoch < to) yield epoch;
        if (++d1 > DAYS_IN_MONTH[m1]) {
            d1 = 1;
            if (++m1 === 12) {
                m1 = 0;
                ++y1;
            }
        }
    }
}
