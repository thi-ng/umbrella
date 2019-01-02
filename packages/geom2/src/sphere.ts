import { Vec } from "@thi.ng/vectors3/api";
import { dot3 } from "@thi.ng/vectors3/dot";
import { maddN3 } from "@thi.ng/vectors3/maddn";
import { magSq3 } from "@thi.ng/vectors3/magsq";
import { sub3 } from "@thi.ng/vectors3/sub";
import {
    intersectShape,
    Ray,
    Sphere,
    Type,
} from "./api";
import { distSq3 } from "@thi.ng/vectors3/distsq";

export const sphere =
    (pos: Vec, r = 1) => new Sphere(pos, r);

intersectShape.addAll({

    [`${Type.SPHERE}-${Type.SPHERE}`]:
        (a: Sphere, b: Sphere) =>
            distSq3(a.pos, b.pos) <= Math.pow(a.r + b.r, 2),

    [`${Type.SPHERE}-${Type.RAY}`]:
        ({ pos: spos, r: r }: Sphere, { pos: rpos, dir }: Ray) => {
            const delta = sub3([], spos, rpos);
            const w = dot3(delta, dir);
            let d = r * r + w * w - magSq3(delta);
            if (d >= 0) {
                d = Math.sqrt(d);
                const a = w + d;
                const b = w - d;
                d = a >= 0 ?
                    b >= 0 ?
                        a > b ?
                            b :
                            a :
                        a :
                    b >= 0 ?
                        b :
                        undefined;
                // reuse delta as out
                return d !== undefined ?
                    maddN3(delta, rpos, dir, d) :
                    d;
            }
        },
});

// export const isecRaySphere = (ray: Ray, sphere: Sphere) => {
//     const w = sub3([], ray.pos, sphere.pos);
//     const rd = ray.dir;
//     const b = 2 * dot3(w, rd);
//     const a = magSq3(rd);
//     const c = magSq3(w) - sphere.r * sphere.r;
//     let d = b * b - 4 * a * c;
//     return d >= 0 && ((d = (-b - Math.sqrt(d)) / (2 * a)) >= 0) ?
//         maddN3([], ray.pos, rd, d) :
//         undefined;
// };
