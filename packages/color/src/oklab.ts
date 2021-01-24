import { declareIndices, IVector } from "@thi.ng/vectors";
import type { Color, ColorMode } from "./api";
import { AColor } from "./internal/acolor";
import { ensureArgs } from "./internal/ensure-args";

export function oklab(col: Color, offset?: number, stride?: number): Oklab;
export function oklab(
    l?: number,
    a?: number,
    b?: number,
    alpha?: number
): Oklab;
export function oklab(...args: any[]) {
    return new Oklab(...ensureArgs(args));
}
/**
 * @remarks
 * Reference: https://bottosson.github.io/posts/oklab/
 */
export class Oklab extends AColor<Oklab> implements IVector<Oklab> {
    l!: number;
    a!: number;
    b!: number;
    alpha!: number;

    get mode(): ColorMode {
        return "oklab";
    }

    copy() {
        return new Oklab(this.deref());
    }

    copyView() {
        return new Oklab(this.buf, this.offset, this.stride);
    }

    empty() {
        return new Oklab();
    }
}

declareIndices(Oklab.prototype, ["l", "a", "b", "alpha"]);
