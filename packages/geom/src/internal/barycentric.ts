import { IVector } from "@thi.ng/vectors/api";
import { Vec3 } from "@thi.ng/vectors/vec3";

export const toBarycentric =
    <T extends IVector<T>>
        (a: Readonly<T>, b: Readonly<T>, c: Readonly<T>, p: Readonly<T>, out = new Vec3()) => {

        const u = b.subNew(a);
        const v = c.subNew(a);
        const w = p.subNew(a);
        const uu = u.magSq();
        const vv = v.magSq();
        const uv = u.dot(v);
        const uw = u.dot(w);
        const vw = v.dot(w);
        const d = 1 / (uv * uv - uu * vv);
        const s = d * (uv * vw - vv * uw);
        const t = d * (uv * uw - uu * vw);
        return out.setS(1 - (s + t), s, t);
    };

export const fromBarycentric =
    <T extends IVector<T>>
        (a: Readonly<T>, b: Readonly<T>, c: Readonly<T>, p: Readonly<Vec3>, out?: T) =>
        a.mulNewN(p.x, out).maddN(b, p.y).maddN(c, p.z);
