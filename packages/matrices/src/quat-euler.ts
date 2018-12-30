import { X3, Y3, Z3 } from "@thi.ng/vectors3/api";
import { mulQ } from "./mulq";
import { quatFromAxisAngle } from "./quat-axis-angle";

const axisOrder = {
    "xyz": [X3, Y3, Z3],
    "yxz": [Y3, X3, Z3],
    "xzy": [X3, Z3, Y3],
    "zxy": [Z3, X3, Y3],
    "yzx": [Y3, Z3, X3],
    "zyx": [Z3, Y3, X3],
};

export const quatFromEuler =
    (order: keyof typeof axisOrder, a: number, b: number, c: number) => {
        const [aa, ab, ac] = axisOrder[order];
        return mulQ(null,
            mulQ([],
                quatFromAxisAngle(aa, a),
                quatFromAxisAngle(ab, b)),
            quatFromAxisAngle(ac, c)
        );
    };
