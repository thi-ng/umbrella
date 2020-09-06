import type { ICopy, IDeref } from "@thi.ng/api";
import type { IColor } from "./api";
import { ColorMode } from "./constants";

export const css = (col: string) => new CSS(col);

export class CSS implements IColor, ICopy<CSS>, IDeref<string> {
    value: string;

    constructor(col: string) {
        this.value = col;
    }

    get mode() {
        return ColorMode.CSS;
    }

    copy() {
        return new CSS(this.value);
    }

    deref() {
        return this.value;
    }
}
