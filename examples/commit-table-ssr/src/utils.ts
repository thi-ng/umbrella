import { padLeft } from "@thi.ng/strings";

const Z2 = padLeft(2, "0");

/**
 * Transforms ISO8601 string into `YYYY-MM-DD` UTC string.
 *
 * @param iso
 */
export const formatDate = (iso: string) => {
    const d = new Date(Date.parse(iso));
    return `${d.getUTCFullYear()}-${Z2(d.getUTCMonth() + 1)}-${Z2(d.getUTCDate())}`;
};
