import { Z2 } from "@thi.ng/strings/pad-left";
import { DAY, HOUR, MINUTE, MONTH, SECOND, YEAR } from "./api.js";

/**
 * Returns a time formatter for given FPS (frames / second, in [1..1000] range),
 * e.g. `HH:mm:ss:ff`. The returned function takes a single arg (time in
 * milliseconds) and returns formatted string.
 *
 * @remarks
 * The timecode considers days too, but only includes them in the result if the
 * day part is non-zero. The 4 separators between each field can be customized
 * via 2nd arg (default: all `:`).
 *
 * @example
 * ```ts
 * a = defTimecode(30);
 * a(HOUR + 2*MINUTE + 3*SECOND + 4*1000/30)
 * // "01:02:03:04"
 *
 * a(DAY);
 * // "01:00:00:00:00"
 *
 * b = defTimecode(30, ["d ", "h ", "' ", '" ']);
 * b(Day + HOUR + 2*MINUTE + 3*SECOND + 999)
 * // "01d 01h 02' 03" 29"
 * ```
 *
 * @param fps
 * @param sep
 */
export const defTimecode = (fps: number, sep: ArrayLike<string> = "::::") => {
    const frame = 1000 / fps;
    return (t: number) => {
        const [_, __, d, h, m, s, ms] = decomposeDuration(t);
        const parts = [
            Z2(h),
            sep[1],
            Z2(m),
            sep[2],
            Z2(s),
            sep[3],
            Z2((ms / frame) | 0),
        ];
        d > 0 && parts.unshift(Z2(d), sep[0]);
        return parts.join("");
    };
};

/**
 * Decomposes given duration (in milliseconds) into a tuple of: `[year, month,
 * day, hour, minute, second, millis]`.
 *
 * @param dur
 */
export const decomposeDuration = (dur: number) => {
    const year = (dur / YEAR) | 0;
    dur -= year * YEAR;
    const month = (dur / MONTH) | 0;
    dur -= month * MONTH;
    const day = (dur / DAY) | 0;
    dur -= day * DAY;
    const hour = (dur / HOUR) | 0;
    dur -= hour * HOUR;
    const min = (dur / MINUTE) | 0;
    dur -= min * MINUTE;
    const sec = (dur / SECOND) | 0;
    dur -= sec * SECOND;
    return [year, month, day, hour, min, sec, dur];
};
