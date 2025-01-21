// SPDX-License-Identifier: Apache-2.0
export function mul_m22v2_aos(
    out: usize,
    mat: usize,
    vec: usize,
    num: usize
): usize {
    const res = out;
    num >>= 1;
    const m0 = v128.load(mat);
    const m1 = v128.shuffle<f32>(m0, m0, 0, 1, 0, 1);
    const m2 = v128.shuffle<f32>(m0, m0, 2, 3, 2, 3);
    for (; num-- > 0; ) {
        // v1xv1xv2xv2x * m.0101 + v1yv1yv2yv2y * m.2323
        const v = v128.load(vec);
        v128.store(
            out,
            f32x4.add(
                f32x4.mul(v128.shuffle<f32>(v, v, 0, 0, 2, 2), m1),
                f32x4.mul(v128.shuffle<f32>(v, v, 1, 1, 3, 3), m2)
            )
        );
        out += 16;
        vec += 16;
    }
    return res;
}

export function mul_m23v2_aos(
    out: usize,
    mat: usize,
    vec: usize,
    num: usize
): usize {
    const res = out;
    num >>= 1;
    const m0 = v128.load(mat);
    const m1 = v128.shuffle<f32>(m0, m0, 0, 1, 0, 1);
    const m2 = v128.shuffle<f32>(m0, m0, 2, 3, 2, 3);
    let m3 = v128.load(mat, 16);
    m3 = v128.shuffle<f32>(m3, m3, 0, 1, 0, 1);
    for (; num-- > 0; ) {
        // v1xv1xv2xv2x * m.0101 + v1yv1yv2yv2y * m.2323 + m.4545
        const v = v128.load(vec);
        v128.store(
            out,
            f32x4.add(
                f32x4.add(
                    f32x4.mul(v128.shuffle<f32>(v, v, 0, 0, 2, 2), m1),
                    f32x4.mul(v128.shuffle<f32>(v, v, 1, 1, 3, 3), m2)
                ),
                m3
            )
        );
        out += 16;
        vec += 16;
    }
    return res;
}

export function mul_m44v4_aos(
    out: usize,
    mat: usize,
    vec: usize,
    num: usize,
    so: usize,
    sa: usize
): usize {
    so <<= 2;
    sa <<= 2;
    const res = out;
    const m0 = v128.load(mat);
    const m1 = v128.load(mat, 16);
    const m2 = v128.load(mat, 32);
    const m3 = v128.load(mat, 48);
    for (; num-- > 0; ) {
        const v = v128.load(vec);
        // v.xxxx * m.0123 + v.yyyy * m.4567 + v.zzzz * m.89ab + v.wwww * m.cdef
        // TODO ryg's shuffle opt:
        // https://fgiesen.wordpress.com/2015/02/05/a-small-note-on-simd-matrix-vector-multiplication/
        v128.store(
            out,
            f32x4.add(
                f32x4.add(
                    f32x4.mul(v128.shuffle<f32>(v, v, 0, 0, 0, 0), m0),
                    f32x4.mul(v128.shuffle<f32>(v, v, 1, 1, 1, 1), m1)
                ),
                f32x4.add(
                    f32x4.mul(v128.shuffle<f32>(v, v, 2, 2, 2, 2), m2),
                    f32x4.mul(v128.shuffle<f32>(v, v, 3, 3, 3, 3), m3)
                )
            )
        );
        out += so;
        vec += sa;
    }
    return res;
}
