import { mixN4 } from "@thi.ng/vectors3/mixn";
import { Color, ReadonlyColor } from "./api";
import { setC4 } from "@thi.ng/vectors3/setc";
import { mix as _mix } from "@thi.ng/math/mix";

export const mix: (out: Color, a: ReadonlyColor, b: ReadonlyColor, t: number) => Color =
    mixN4;

export const mixAlpha =
    (out: Color, a: ReadonlyColor, b: ReadonlyColor) =>
        setC4(
            out || a,
            _mix(a[0], b[0], a[3]),
            _mix(a[0], b[0], a[3]),
            _mix(a[0], b[0], a[3]),
            a[3]
        );
