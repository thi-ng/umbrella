import { EPS } from "@thi.ng/math/api";
import { Vec2 } from "@thi.ng/vectors/vec2";

// https://en.wikipedia.org/wiki/Liang%E2%80%93Barsky_algorithm
// https://github.com/thi-ng/c-thing/blob/master/src/geom/clip/liangbarsky.c

export const liangBarsky2 =
    (la: Vec2, lb: Vec2, tl: Vec2, br: Vec2, ca?: Vec2, cb?: Vec2): [Vec2, Vec2, number, number] => {
        const [lax, lay] = la;
        const dx = lb.x - lax;
        const dy = lb.y - lay;
        let a = 0;
        let b = 1;

        const clip = (p: number, q: number) => {
            if (q < 0 && Math.abs(p) < EPS) {
                return 0;
            }
            const r = q / p;
            if (p < 0) {
                if (r > b) {
                    return false;
                } else if (r > a) {
                    a = r;
                }
            } else if (p > 0) {
                if (r < a) {
                    return false;
                } else if (r < b) {
                    b = r;
                }
            }
            return true;
        };

        if (!(clip(-dx, -(tl.x - lax)) &&
            clip(dx, br.x - lax) &&
            clip(-dy, -(tl.y - lay)) &&
            clip(dy, br.y - lay))) {
            return;
        }

        !ca && (ca = new Vec2());
        !cb && (cb = new Vec2());

        ca.setS(a * dx + lax, a * dy + lay);
        cb.setS(b * dx + lax, b * dy + lay);

        return [ca, cb, a, b];
    };
