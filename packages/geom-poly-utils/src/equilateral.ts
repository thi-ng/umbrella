import type { FnU2 } from "@thi.ng/api";
import { THIRD_PI } from "@thi.ng/math/api";
import type { Vec } from "@thi.ng/vectors";
import { maddN2 } from "@thi.ng/vectors/maddn";
import { mag } from "@thi.ng/vectors/mag";
import { normalize } from "@thi.ng/vectors/normalize";
import { perpendicularCCW } from "@thi.ng/vectors/perpendicular";
import { sub2 } from "@thi.ng/vectors/sub";

export const equilateralTriangle2: FnU2<Vec, Vec[]> = (a, b) => {
    const dir = sub2([], b, a);
    const c = normalize(
        null,
        perpendicularCCW([], dir),
        mag(dir) * Math.sin(THIRD_PI)
    );
    return [a, b, maddN2(null, dir, 0.5, c)];
};
