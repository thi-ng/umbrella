import { implementations } from "@thi.ng/defmulti";
import { maddN, Vec } from "@thi.ng/vectors3";
import { pointAt, Ray, Type } from "./api";

export const ray =
    (pos: Vec, dir: Vec) => new Ray(pos, dir);

implementations(
    Type.RAY,
    {},

    pointAt,
    (ray: Ray, t: number) =>
        maddN([], ray.pos, ray.dir, t)
);
