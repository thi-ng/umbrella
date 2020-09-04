import { fit, mix } from "@thi.ng/math";
import type { Domain, Range, ScaleFn } from "./api";

export const linearScale = ([d1, d2]: Domain, [r1, r2]: Range): ScaleFn => (
    x
) => fit(x, d1, d2, r1, r2);

export const logScale = (
    domain: Domain,
    [r1, r2]: Range,
    base = 10
): ScaleFn => {
    const lb = Math.log(base);
    const log = (x: number) =>
        x > 0 ? Math.log(x) / lb : x < 0 ? -Math.log(-x) / lb : 0;
    const d1l = log(domain[0]);
    const drange = log(domain[1]) - d1l;
    return (x) => mix(r1, r2, (log(x) - d1l) / drange);
};

// export const lensScale = (
//     [d1, d2]: Domain,
//     [r1, r2]: Range,
//     focus = (d1 + d2) / 2,
//     strength: number
// ): ScaleFn => {
//     const dr = d2 - d1;
//     const f = (focus - d1) / dr;
//     return (x) => mixLens(r1, r2, (x - d1) / dr, f, strength);
// };

/*
(defn mix-circular-flipped
  [a b t]
  (mm/submadd
   b a
   (clojure.core/-
    (mm/sub
     (Math/sqrt (mm/sub 1.0 (mm/mul t t))) 1.0))
   a))

(defn mix-lens
  [a b t pos strength]
  (let [v (mm/submadd b a t a)]
    (mm/add (if (< t pos)
                      (mm/subm
                       ((if (pos? strength) mix-circular-flipped mix-circular)
                        a (mm/submadd b a pos a) (/ t pos)) v strength)
                      (mm/subm
                       ((if (neg? strength) mix-circular-flipped mix-circular)
                        (mm/submadd b a pos a) b (mm/subdiv t pos 1.0 pos)) v (abs* strength)))
                    v)))
*/
