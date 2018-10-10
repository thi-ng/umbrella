import { Vec2 } from "@thi.ng/vectors/vec2";
import { isNumber } from "@thi.ng/checks/is-number";

export const args3 = (args: any[]) => {
    let points = args[0], attribs;
    if (points instanceof Vec2) {
        points = [points, args[1], args[2]];
        attribs = args[3];
    } else if (isNumber(points[0])) {
        points = Vec2.mapBuffer(
            points,
            3,
            args[1] || 0,
            args[2] || 1,
            args[3] || 2
        );
        attribs = args[4];
    } else {
        attribs = args[1];
    }
    return [points, attribs];
};

export const args4 = (args: any[]) => {
    let points = args[0], attribs;
    if (points instanceof Vec2) {
        points = [points, args[1], args[2], args[3]];
        attribs = args[4];
    } else if (isNumber(points[0])) {
        points = Vec2.mapBuffer(
            points,
            4,
            args[1] || 0,
            args[2] || 1,
            args[3] || 2
        );
        attribs = args[4];
    } else {
        attribs = args[1];
    }
    return [points, attribs];
};
