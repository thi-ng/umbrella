import { isArrayLike, isNumber } from "@thi.ng/checks";
import { illegalArgs } from "@thi.ng/errors";
import { asVec2, ReadonlyVec, Vec2 } from "@thi.ng/vectors";

export const args3 = (args: any[]) => {
    let points = args[0], attribs;
    if (isArrayLike(points[0])) {
        points = (<ReadonlyVec[]>points).map(asVec2);
        attribs = args[1];
    } else if (args.length >= 3 &&
        isArrayLike(points) &&
        isArrayLike(args[1]) &&
        isArrayLike(args[2])) {
        points = [asVec2(<any>points), asVec2(args[1]), asVec2(args[2])];
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
        illegalArgs();
    }
    return [points, attribs];
};

export const args4 = (args: any[]) => {
    let points = args[0], attribs;
    if (isArrayLike(points[0])) {
        points = (<ReadonlyVec[]>points).map(asVec2);
        attribs = args[1];
    } else if (args.length >= 4 &&
        isArrayLike(points) &&
        isArrayLike(args[1]) &&
        isArrayLike(args[2]) &&
        isArrayLike(args[3])) {
        points = [asVec2(<any>points), asVec2(args[1]), asVec2(args[2]), asVec2(args[3])];
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
        illegalArgs();
    }
    return [points, attribs];
};

export const argsN = (args: any[]) => {
    let points = args[0], attribs;
    if (isNumber(points[0])) {
        points = Vec2.mapBuffer(
            points,
            args[1] || points.length / 2,
            args[2] || 0,
            args[3] || 1,
            args[4] || 2
        );
        attribs = args[5];
    } else if (isArrayLike(points[0])) {
        points = (<ReadonlyVec[]>points).map(asVec2);
        attribs = args[1];
    }
    return [points, attribs];
};
