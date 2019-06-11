import { sin } from "@thi.ng/dsp";
import { start } from "@thi.ng/hdom";
import { adaptDPI, canvasWebGL, dropdown } from "@thi.ng/hdom-components";
import {
    concat,
    lookAt,
    perspective,
    transform44
} from "@thi.ng/matrices";
import { fromPromise, metaStream, stream } from "@thi.ng/rstream";
import {
    compileModel,
    cube,
    cubeMap,
    draw,
    GLMat4,
    GLSL,
    ModelSpec,
    shader,
    ShaderSpec,
    VERSION_CHECK
} from "@thi.ng/webgl";

const CUBEMAP_SHADER: ShaderSpec = {
    vs: `void main() {
gl_Position = u_mvp * vec4(a_position, 1.0);
v_normal = normalize(a_position.xyz);
}`,
    fs: `void main() {
o_fragColor = texture(u_texture, normalize(v_normal));
}`,
    pre: VERSION_CHECK(300, "", "#define texture textureCube"),
    attribs: {
        position: GLSL.vec3
    },
    varying: {
        normal: GLSL.vec3
    },
    uniforms: {
        mvp: GLSL.mat4,
        texture: GLSL.samplerCube
    },
    state: {
        depth: true
    }
};

const CUBE_MAPS = [
    ["langholmen2", "Langholmen"],
    ["golden-gate", "Golden Gate"],
    ["maskonaive2", "Maskonaive"]
];

const app = () => {
    const selection = stream<string>();
    selection.next(CUBE_MAPS[0][0]);
    let model: ModelSpec;
    const canvas = canvasWebGL({
        init: (_, gl) => {
            selection
                .subscribe(
                    metaStream((id: string) =>
                        fromPromise(loadCubeMap(`assets/${id}/`))
                    )
                )
                .subscribe({
                    next(faces) {
                        try {
                            model = compileModel(gl, {
                                ...cube({ normal: false, uv: false }),
                                shader: shader(gl, CUBEMAP_SHADER),
                                uniforms: {},
                                textures: [
                                    cubeMap(gl, faces, {
                                        filter: [
                                            gl.LINEAR_MIPMAP_LINEAR,
                                            gl.LINEAR
                                        ],
                                        mipmap: true
                                    })
                                ]
                            });
                        } catch (err) {
                            console.warn(err);
                        }
                    },
                    error(e) {
                        console.warn(e);
                    }
                });
        },
        // prettier-ignore
        update: (el, gl, __, time) => {
            if (!model) return;
            const bg = 0.1;
            const p = perspective([], 45, gl.drawingBufferWidth/gl.drawingBufferHeight, 0.01, 5);
            const v = lookAt([],[0, 0, sin(time, 0.00008, 1.99, 2)],[0, 0, 0], [0, 1, 0]);
            const m = transform44([], [0, 0, 0], [sin(time, 0.0001, 0.7, 0.5), time * 0.0007,0], 1);
            model.uniforms!.mvp = <GLMat4>concat([], p, v, m);
            adaptDPI(el, window.innerWidth, window.innerHeight);
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            gl.clearColor(bg, bg, bg, 1);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            draw(model);
        }
    });
    return () => [
        "div.sans-serif",
        [canvas, { width: window.innerWidth, height: window.innerHeight }],
        [
            "div.fixed.top-0.left-0.z-1.ma3",
            [
                dropdown,
                {
                    onchange: (e: Event) =>
                        selection.next((<HTMLSelectElement>e.target).value)
                },
                CUBE_MAPS,
                selection.deref()
            ]
        ]
    ];
};

const imagePromise = (url: string) =>
    new Promise<HTMLImageElement>((resolve, fail) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (e) => {
            console.warn("error loading: " + url);
            fail(e);
        };
        img.src = url;
    });

const loadCubeMap = (base: string) =>
    Promise.all(
        ["posx", "negx", "posy", "negy", "posz", "negz"].map((id) =>
            imagePromise(base + id + ".jpg")
        )
    );

const cancel = start(app());

if (process.env.NODE_ENV !== "production") {
    const hot = (<any>module).hot;
    hot && hot.dispose(cancel);
}
