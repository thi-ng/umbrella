import { TaggedFn5 } from "@thi.ng/shader-ast";
import { ITexture, ModelSpec, ShaderUniformSpecs } from "@thi.ng/webgl";

export type MainImageFn = TaggedFn5<
    "vec2",
    "vec2",
    "vec2",
    "int",
    "float",
    "vec4"
>;

export interface ShaderToyOpts {
    canvas: HTMLCanvasElement;
    gl: WebGLRenderingContext;
    /**
     * Main image shader-ast function, taking these args:
     *
     * @param fragCoord vec2
     * @param resolution vec2
     * @param mousePos vec2
     * @param mouseButtons int
     * @param time float (in seconds)
     */
    main: MainImageFn;
    /**
     * Optional additional uniforms
     */
    uniforms?: ShaderUniformSpecs;
    /**
     * Optional textures to bind
     */
    textures?: ITexture[];
}

export interface ShaderToy {
    start(): void;
    stop(): void;
    recompile(main: MainImageFn): void;
    model: ModelSpec;
}
