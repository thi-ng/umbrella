import { FilterType } from "../api";
import { OnePole } from "./onepole";

/**
 * One-pole DC blocker based on {@link OnePole}.
 *
 * @param freq
 */
export const dcblocker = (freq: number) => new DCBlocker(FilterType.LP, freq);

export class DCBlocker extends OnePole {
    next(x: number) {
        return x - super.next(x);
    }
}
