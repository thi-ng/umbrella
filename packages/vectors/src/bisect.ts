import { HALF_PI, PI } from "@thi.ng/math";
import { VecOpRoVV } from "./api";
import { headingXY } from "./heading";

export const bisect2: VecOpRoVV<number> = (a, b) => {
    const theta = (headingXY(a) + headingXY(b)) / 2;
    return theta <= HALF_PI ? theta : PI - theta;
};
