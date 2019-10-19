export function mul_m23v2_aos(
    out: usize,
    mat: usize,
    vec: usize,
    num: usize,
    so: usize,
    sa: usize
): usize {
    const res = out;
    so <<= 2;
    sa <<= 2;
    num >>= 1;
    const m = v128.load(mat);
    const m1 = v128.shuffle<f32>(m, m, 0, 1, 0, 1);
    const m2 = v128.shuffle<f32>(m, m, 2, 3, 2, 3);
    let m3 = v128.load(mat, 16);
    m3 = v128.shuffle<f32>(m3, m3, 0, 1, 0, 1);
    for (; num-- > 0; ) {
        // v1xv1xv2xv2x * m.0101 + v1yv1yv2yv2y * m.2323 + m.4545
        const v = v128.load(vec);
        v128.store(
            out,
            v128.add<f32>(
                v128.add<f32>(
                    v128.mul<f32>(v128.shuffle<f32>(v, v, 0, 0, 2, 2), m1),
                    v128.mul<f32>(v128.shuffle<f32>(v, v, 1, 1, 3, 3), m2)
                ),
                m3
            )
        );
        out += so;
        vec += sa;
    }
    return res;
}

export function mul_m23v2_aos_single(
    out: usize,
    mat: usize,
    vec: usize
): usize {
    const m = v128.load(mat);
    const m2 = v128.load(mat, 16);
    // v1xv1xv2xv2x * m.0101 + v1yv1yv2yv2y * m.2323 + m.4545
    const v = v128.load(vec);
    v128.store(
        out,
        v128.add<f32>(
            v128.add<f32>(
                v128.mul<f32>(
                    v128.shuffle<f32>(v, v, 0, 0, 2, 2),
                    v128.shuffle<f32>(m, m, 0, 1, 0, 1)
                ),
                v128.mul<f32>(
                    v128.shuffle<f32>(v, v, 1, 1, 3, 3),
                    v128.shuffle<f32>(m, m, 2, 3, 2, 3)
                )
            ),
            v128.shuffle<f32>(m2, m2, 0, 1, 0, 1)
        )
    );
    return out;
}

export function mul_m44v4_aos(
    out: usize,
    mat: usize,
    vec: usize,
    num: usize,
    so: usize,
    sa: usize
): usize {
    const res = out;
    so <<= 2;
    sa <<= 2;
    for (; num-- > 0; ) {
        mul_m44v4_aos_single(out, mat, vec);
        out += so;
        vec += sa;
    }
    return res;
}

export function mul_m44v4_aos_single(
    out: usize,
    mat: usize,
    vec: usize
): usize {
    // v.xxxx * m.0123 + v.yyyy * m.4567 + v.zzzz * m.89ab + v.wwww * m.cdef
    const v = v128.load(vec);
    v128.store(
        out,
        v128.add<f32>(
            v128.add<f32>(
                v128.mul<f32>(
                    v128.shuffle<f32>(v, v, 0, 0, 0, 0),
                    v128.load(mat)
                ),
                v128.mul<f32>(
                    v128.shuffle<f32>(v, v, 1, 1, 1, 1),
                    v128.load(mat, 16)
                )
            ),
            v128.add<f32>(
                v128.mul<f32>(
                    v128.shuffle<f32>(v, v, 2, 2, 2, 2),
                    v128.load(mat, 32)
                ),
                v128.mul<f32>(
                    v128.shuffle<f32>(v, v, 3, 3, 3, 3),
                    v128.load(mat, 48)
                )
            )
        )
    );
    return out;
}
