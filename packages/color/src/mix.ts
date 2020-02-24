import { mix as _mix } from "@thi.ng/math";
import { mixN4, setC4 } from "@thi.ng/vectors";
import type { Color, ReadonlyColor } from "./api";

export const mix: (
    out: Color | null,
    a: ReadonlyColor,
    b: ReadonlyColor,
    t: number
) => Color = mixN4;

export const mixAlpha = (
    out: Color | null,
    a: ReadonlyColor,
    b: ReadonlyColor
) =>
    setC4(
        out || a,
        _mix(a[0], b[0], a[3]),
        _mix(a[0], b[0], a[3]),
        _mix(a[0], b[0], a[3]),
        a[3]
    );
