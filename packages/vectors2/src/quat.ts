import {
    dot,
    magSq,
    ReadonlyVec,
    Vec
} from "./api";
import { maddN4, mulN4, Vec4 } from "./vec4";

export const mulQ =
    (a: Vec, b: ReadonlyVec) => {
        const [ax, ay, az, aw] = a;
        const [bx, by, bz, bw] = b;
        a[0] = ax * bw + aw * bx + ay * bz - az * by;
        a[1] = ay * bw + aw * by + az * bx - ax * bz;
        a[2] = az * bw + aw * bz + ax * by - ay * bx;
        a[3] = aw * bw - ax * bx - ay * by - az * bz;
        return a;
    };

export const mulVQ =
    (p: Vec, q: ReadonlyVec) => {
        const [px, py, pz] = p;
        const [qx, qy, qz, qw] = q;
        const ix = qw * px + qy * pz - qz * py;
        const iy = qw * py + qz * px - qx * pz;
        const iz = qw * pz + qx * py - qy * px;
        const iw = -qx * px - qy * py - qz * pz;
        p[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        p[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        p[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
        return p;
    };

export const conjugateQ =
    (a: Vec) => (a[0] *= -1, a[1] *= -1, a[2] *= -1, a);

export const invertQ =
    (a: Vec) => {
        let d = magSq(a);
        d = d > 0 ? -1 / d : 0;
        a[0] *= d;
        a[1] *= d;
        a[2] *= d;
        a[3] *= -d;
        return a;
    };

export const mixQ =
    (a: Vec, b: ReadonlyVec, t: number, eps = 1e-3) => {
        const d = dot(a, b);
        if (Math.abs(d) < 1.0) {
            const theta = Math.acos(d);
            const stheta = Math.sqrt(1 - d * d);
            let u, v;
            if (Math.abs(stheta) < eps) {
                u = v = 0.5;
            } else {
                u = Math.sin(theta * (1 - t)) / stheta;
                v = Math.sin(theta * t) / stheta;
            }
            return maddN4(mulN4(a, u), b, v);
        }
    };

export class Quat extends Vec4 {

    static fromAxisAngle(axis: ReadonlyVec, theta: number) {
        return quatFromAxisAngle(axis, theta);
    }

    mulQ(q: Quat) {
        mulQ(this, q);
        return this;
    }

    mulV(p: Vec) {
        return mulVQ(p, this);
    }

    mixQ(q: Quat, t: number) {
        mixQ(this, q, t);
        return this;
    }
}

export const quat =
    (x = 0, y = 0, z = 0, w = 1) => new Quat([x, y, z, w]);

export const quatFromAxisAngle =
    (axis: ReadonlyVec, theta: number) => {
        theta /= 2;
        const s = Math.sin(theta);
        return new Quat([
            s * axis[0],
            s * axis[1],
            s * axis[2],
            Math.cos(theta)
        ]);
    };
