import type { FnN } from "@thi.ng/api";
import { DAY, DAYS_IN_MONTH } from "./api";

export const floorDay: FnN = (epoch) => {
    const d = new Date(epoch);
    return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
};

export const floorMonth: FnN = (epoch) => {
    const d = new Date(epoch);
    return Date.UTC(d.getUTCFullYear(), d.getUTCMonth());
};

export const floorYear: FnN = (epoch) => {
    const d = new Date(epoch);
    return Date.UTC(d.getUTCFullYear(), 0);
};

export const ceilDay: FnN = (epoch) => {
    const d = new Date(epoch + DAY);
    return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
};

export const ceilMonth: FnN = (epoch) => {
    let d = new Date(epoch);
    d = new Date(epoch + DAYS_IN_MONTH[d.getUTCMonth()] * DAY);
    return Date.UTC(d.getUTCFullYear(), d.getUTCMonth());
};

export const ceilYear: FnN = (epoch) => {
    const d = new Date(epoch);
    return Date.UTC(d.getUTCFullYear() + 1, 0);
};
