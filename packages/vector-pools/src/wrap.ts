import {
    gvec,
    IVector,
    Vec,
    Vec2,
    Vec3,
    Vec4
} from "@thi.ng/vectors3";

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
