import { ModelSpec } from "../api";

export const FULLSCREEN_QUAD: ModelSpec = {
    attribs: {
        position: {
            data: new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
            size: 2
        },
        uv: {
            data: new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]),
            size: 2
        }
    },
    uniforms: {},
    shader: null,
    mode: 5, // TRIANGLE_STRIP,
    num: 4
};
