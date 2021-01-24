import type { ICopy, IDeref } from "@thi.ng/api";
import type { ColorMode, IColor } from "./api";

export const css = (col: string) => new CSS(col);

export class CSS implements IColor, ICopy<CSS>, IDeref<string> {
    value: string;

    constructor(col: string) {
        this.value = col;
    }

    get mode(): ColorMode {
        return "css";
    }

    copy() {
        return new CSS(this.value);
    }

    deref() {
        return this.value;
    }
}
