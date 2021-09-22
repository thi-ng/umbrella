import { OnePole } from "./onepole";

/**
 * One-pole DC blocker based on {@link OnePole}.
 *
 * @param freq
 */
export const dcBlock = (freq: number) => new DCBlock("lp", freq);

export class DCBlock extends OnePole {
    next(x: number) {
        return x - super.next(x);
    }
}
