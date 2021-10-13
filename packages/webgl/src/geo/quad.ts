import { DrawMode, ModelSpec } from "../api/model.js";

export interface QuadOpts {
    /**
     * Side length of the quad in each direction (always square).
     *
     * @defaultValue 2.0
     */
    size: number;
    /**
     * @defaultValue true
     */
    uv: boolean;
    /**
     * If true, the quad's position will be centered around (0,0). If false, the
     * quad's bottom-left corner will be at (0,0).
     *
     * @defaultValue true
     */
    center: boolean;
}

export const defQuadModel = (opts?: Partial<QuadOpts>): ModelSpec => {
    let { size, uv, center } = { size: 2, uv: true, center: true, ...opts };
    size *= 0.5;
    const o = center ? 0 : size;
    return {
        attribs: {
            position: {
                data: new Float32Array([
                    o - size,
                    o - size,
                    o + size,
                    o - size,
                    o - size,
                    o + size,
                    o + size,
                    o + size,
                ]),
                size: 2,
            },
            ...(uv
                ? {
                      uv: {
                          data: new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]),
                          size: 2,
                      },
                  }
                : null),
        },
        uniforms: {},
        shader: <any>null,
        mode: DrawMode.TRIANGLE_STRIP,
        num: 4,
    };
};
