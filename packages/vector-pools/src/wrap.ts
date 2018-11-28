import { IVector, Vec } from "@thi.ng/vectors3/api";
import { gvec } from "@thi.ng/vectors3/gvec";
import { Vec2 } from "@thi.ng/vectors3/vec2";
import { Vec3 } from "@thi.ng/vectors3/vec3";
import { Vec4 } from "@thi.ng/vectors3/vec4";

export const wrap =
    (buf: Vec, size: number, idx: number, stride: number): IVector<any> => {
        switch (size) {
            case 2:
                return new Vec2(buf, idx, stride);
            case 3:
                return new Vec3(buf, idx, stride);
            case 4:
                return new Vec4(buf, idx, stride);
            default:
                return gvec(buf, size, idx, stride);
        }
    };
