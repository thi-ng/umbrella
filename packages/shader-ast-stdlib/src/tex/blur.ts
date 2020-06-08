import {
    add,
    assign,
    defn,
    div,
    mul,
    ret,
    Sampler2DSym,
    sub,
    sym,
    texture,
    vec2,
    Vec2Sym,
    Vec4Sym,
} from "@thi.ng/shader-ast";

/**
 * Inline function. Computes single blur step for given +/- offset &
 * weight.
 *
 * @param col -
 * @param tex -
 * @param uv -
 * @param off -
 * @param k -
 */
const singlePass = (
    col: Vec4Sym,
    tex: Sampler2DSym,
    uv: Vec2Sym,
    off: Vec2Sym,
    k: number
) =>
    assign(
        col,
        add(
            col,
            mul(add(texture(tex, add(uv, off)), texture(tex, sub(uv, off))), k)
        )
    );

/**
 * 5x5 gaussian blur texture lookup, optimized, but based on:
 *
 * - {@link http://rastergrid.com/blog/2010/09/efficient-gaussian-blur-with-linear-sampling/}
 * - {@link https://github.com/Jam3/glsl-fast-gaussian-blur}
 *
 * @param tex - sampler2D
 * @param res - resolution
 * @param uv -
 * @param dir - blur pass direction (`vec2(1,0)` or `vec2(0,1)`)
 */
export const blur5 = defn(
    "vec4",
    "blur5",
    ["sampler2D", "vec2", "vec2", "vec2"],
    (tex, res, uv, dir) => {
        let col: Vec4Sym;
        let off: Vec2Sym;
        const k1 = 0.29411764705882354;
        const k2 = 0.35294117647058826;
        return [
            (off = sym(div(mul(vec2(1 + 1 / 3), dir), res))),
            (col = sym(mul(texture(tex, uv), k1))),
            singlePass(col, tex, uv, off, k2),
            ret(col),
        ];
    }
);

/**
 * 9x9 gaussian blur texture lookup, optimized, but based on:
 *
 * - {@link http://rastergrid.com/blog/2010/09/efficient-gaussian-blur-with-linear-sampling/}
 * - {@link https://github.com/Jam3/glsl-fast-gaussian-blur}
 *
 * @param tex - sampler2D
 * @param res - resolution
 * @param uv -
 * @param dir - blur pass direction (`vec2(1,0)` or `vec2(0,1)`)
 */
export const blur9 = defn(
    "vec4",
    "blur9",
    ["sampler2D", "vec2", "vec2", "vec2"],
    (tex, res, uv, dir) => {
        let col: Vec4Sym;
        let off: Vec2Sym;
        let off2: Vec2Sym;
        const k1 = 0.3162162162;
        const k2 = 0.0702702703;
        return [
            (off = sym(div(mul(vec2(1.3846153846), dir), res))),
            (off2 = sym(div(mul(vec2(3.2307692308), dir), res))),
            (col = sym(mul(texture(tex, uv), 0.227027027))),
            singlePass(col, tex, uv, off, k1),
            singlePass(col, tex, uv, off2, k2),
            ret(col),
        ];
    }
);

/**
 * 13x13 gaussian blur texture lookup, optimized, but based on:
 *
 * - {@link http://rastergrid.com/blog/2010/09/efficient-gaussian-blur-with-linear-sampling/}
 * - {@link https://github.com/Jam3/glsl-fast-gaussian-blur}
 *
 * @param tex - sampler2D
 * @param res - resolution
 * @param uv -
 * @param dir - blur pass direction (`vec2(1,0)` or `vec2(0,1)`)
 */
export const blur13 = defn(
    "vec4",
    "blur13",
    ["sampler2D", "vec2", "vec2", "vec2"],
    (tex, res, uv, dir) => {
        let col: Vec4Sym;
        let off: Vec2Sym;
        let off2: Vec2Sym;
        let off3: Vec2Sym;
        const k1 = 0.2969069646728344;
        const k2 = 0.09447039785044732;
        const k3 = 0.010381362401148057;
        return [
            (off = sym(div(mul(vec2(1.411764705882353), dir), res))),
            (off2 = sym(div(mul(vec2(3.2941176470588234), dir), res))),
            (off3 = sym(div(mul(vec2(5.176470588235294), dir), res))),
            (col = sym(mul(texture(tex, uv), 0.1964825501511404))),
            singlePass(col, tex, uv, off, k1),
            singlePass(col, tex, uv, off2, k2),
            singlePass(col, tex, uv, off3, k3),
            ret(col),
        ];
    }
);
