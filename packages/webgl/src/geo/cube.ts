import { DrawMode, ModelSpec } from "../api/model.js";

export interface CubeOpts {
    size: number;
    normal: boolean;
    uv: boolean;
}

// prettier-ignore
export const defCubeModel = (opts?: Partial<CubeOpts>) => {
    opts = { size: 1, normal: true, uv: true, ...opts};
    const s = opts.size!;
    const spec: ModelSpec = {
        attribs: {
            position: {
                data: new Float32Array([s, s, -s, s, s, s, s, -s, s, s, -s, -s, -s, s, s, -s, s, -s, -s, -s, -s, -s, -s, s, -s, s, s, s, s, s, s, s, -s, -s, s, -s, -s, -s, -s, s, -s, -s, s, -s, s, -s, -s, s, s, s, s, -s, s, s, -s, -s, s, s, -s, s, -s, s, -s, s, s, -s, s, -s, -s, -s, -s, -s])
            },
        },
        indices:{
            data: new Uint16Array([0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23])
        },
        uniforms: {},
        shader: <any>null,
        mode: DrawMode.TRIANGLES,
        num: 36
    };
    opts.normal && (spec.attribs.normal = {
        data: new Float32Array([1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1])
    });
    opts.uv && (spec.attribs.uv = {
        data: new Float32Array([1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1]),
        size: 2
    });
    return spec;
};
