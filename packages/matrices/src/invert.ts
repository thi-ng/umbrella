import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { dotC4, dotC6 } from "@thi.ng/vectors/dotc";
import { magSq4 } from "@thi.ng/vectors/magsq";
import { setC, setC4, setC6 } from "@thi.ng/vectors/setc";
import { vop } from "@thi.ng/vectors/vop";
import type { MatOpMU, MultiMatOpMU } from "./api";
import { det44FromCoeffs, detCoeffs44 } from "./determinant";

const dp4 = dotC4;
const dp6 = dotC6;

/**
 * Matrix inversion. Returns `undefined` if matrix is not invertible.
 * Mutates `mat` if `out` is `null`.
 *
 * @param out -
 * @param mat -
 */
export const invert: MultiMatOpMU = vop(1);

export const invert22: MatOpMU = invert.add(4, (out, m) => {
    const [m00, m01, m10, m11] = m;
    let det = dp4(m00, m11, -m01, m10);
    if (det === 0) return;
    det = 1.0 / det;
    return setC4(out || m, m11 * det, -m01 * det, -m10 * det, m00 * det);
});

export const invert23: MatOpMU = invert.add(6, (out, m) => {
    const [m00, m01, m10, m11, m20, m21] = m;
    let det = dp4(m00, m11, -m01, m10);
    if (det === 0) return;
    det = 1.0 / det;
    return setC6(
        out || m,
        m11 * det,
        -m01 * det,
        -m10 * det,
        m00 * det,
        dp4(m10, m21, -m11, m20) * det,
        dp4(m01, m20, -m00, m21) * det
    );
});

export const invert33: MatOpMU = invert.add(9, (out, m) => {
    const [m00, m01, m02, m10, m11, m12, m20, m21, m22] = m;
    const d01 = dp4(m22, m11, -m12, m21);
    const d11 = dp4(m12, m20, -m22, m10);
    const d21 = dp4(m21, m10, -m11, m20);
    let det = dp6(m00, d01, m01, d11, m02, d21);
    if (det === 0) return;
    det = 1.0 / det;
    return setC(
        out || m,
        d01 * det,
        dp4(-m22, m01, m02, m21) * det,
        dp4(m12, m01, -m02, m11) * det,
        d11 * det,
        dp4(m22, m00, -m02, m20) * det,
        dp4(-m12, m00, m02, m10) * det,
        d21 * det,
        dp4(-m21, m00, m01, m20) * det,
        dp4(m11, m00, -m01, m10) * det
    );
});

export const invert44: MatOpMU = invert.add(16, (out, m) => {
    const coeffs = detCoeffs44(m);
    let det = det44FromCoeffs(coeffs);
    if (det === 0) return;
    det = 1.0 / det;
    const [
        m00,
        m01,
        m02,
        m03,
        m10,
        m11,
        m12,
        m13,
        m20,
        m21,
        m22,
        m23,
        m30,
        m31,
        m32,
        m33,
    ] = m;
    const [d00, d01, d02, d03, d04, d05, d06, d07, d08, d09, d10, d11] = coeffs;
    return setC(
        out || m,
        dp6(m11, d11, -m12, d10, m13, d09) * det,
        dp6(-m01, d11, m02, d10, -m03, d09) * det,
        dp6(m31, d05, -m32, d04, m33, d03) * det,
        dp6(-m21, d05, m22, d04, -m23, d03) * det,
        dp6(-m10, d11, m12, d08, -m13, d07) * det,
        dp6(m00, d11, -m02, d08, m03, d07) * det,
        dp6(-m30, d05, m32, d02, -m33, d01) * det,
        dp6(m20, d05, -m22, d02, m23, d01) * det,
        dp6(m10, d10, -m11, d08, m13, d06) * det,
        dp6(-m00, d10, m01, d08, -m03, d06) * det,
        dp6(m30, d04, -m31, d02, m33, d00) * det,
        dp6(-m20, d04, m21, d02, -m23, d00) * det,
        dp6(-m10, d09, m11, d07, -m12, d06) * det,
        dp6(m00, d09, -m01, d07, m02, d06) * det,
        dp6(-m30, d03, m31, d01, -m32, d00) * det,
        dp6(m20, d03, -m21, d01, m22, d00) * det
    );
});

export const invertQ = (out: Vec | null, a: ReadonlyVec) => {
    let d = magSq4(a);
    d = d > 0 ? -1 / d : 0;
    return setC4(out || a, a[0] * d, a[1] * d, a[2] * d, a[3] * -d);
};
