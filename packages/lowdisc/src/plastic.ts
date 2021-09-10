import { assert } from "@thi.ng/api/assert";
import { kronecker } from "./kronecker";
import { lowDiscrepancy } from "./lowdisc";

/**
 * Computes the `d`-th Harmonious number, with:
 *
 * - d=1 : PHI (Golden ratio)
 * - d=2 : PLASTIC (Plastic number)
 *
 * @remarks
 * See {@link plasticND} for references.
 *
 * @param d
 * @param i
 */
export const phi = (d: number, i = 18) => {
    assert(d > 0, `d must be > 0`);
    d = 1 / (d + 1);
    let x = 2;
    while (i-- > 0) x = (1 + x) ** d;
    return x;
};

/**
 * Additive Recurrence R2 sequence using n-dimensional {@link kronecker}
 * configured with Harmonious Numbers (based on Plastic number).
 *
 * @remarks
 * References:
 *
 * - http://extremelearning.com.au/unreasonable-effectiveness-of-quasirandom-sequences/
 * - https://en.wikipedia.org/wiki/Plastic_number
 * - https://bib.irb.hr/datoteka/628836.Plastic_Number_-_Construct.pdf
 *
 * @param dim
 */
export const plasticND = (dim: number, offset = 0) => {
    const g = phi(dim);
    return lowDiscrepancy(
        new Array(dim)
            .fill(0)
            .map((_, i) => kronecker(1 / Math.pow(g, i + 1), 0.5)),
        offset
    );
};
