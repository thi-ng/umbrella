import { FilterType } from "../api";
import { OnePole } from "./onepole";

export const dcblocker = (fc: number) => new DCBlocker(FilterType.LP, fc);

export class DCBlocker extends OnePole {
    next(x: number) {
        return x - super.next(x);
    }
}
