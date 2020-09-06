import type { IObjectOf } from "@thi.ng/api";
import { AttribPool } from "@thi.ng/vector-pools";
import type { IndexBufferSpec, IWebGLBuffer } from "./buffers";
import type { AttribBufferData, IShader, UniformValues } from "./shader";
import type { ITexture } from "./texture";

export enum DrawMode {
    POINTS = 0,
    LINES = 1,
    LINE_LOOP = 2,
    LINE_STRIP = 3,
    TRIANGLES = 4,
    TRIANGLE_STRIP = 5,
    TRIANGLE_FAN = 6,
}

export type ModelAttributeSpecs = IObjectOf<ModelAttributeSpec>;

export interface ModelSpec {
    /**
     * Initialized {@link IShader} instance
     */
    shader: IShader;
    /**
     * GLSL attribute declarations
     */
    attribs: ModelAttributeSpecs;
    /**
     * Geometry attributes given as
     * {@link @thi.ng/vector-pools#AttribPool} instance.
     */
    attribPool?: AttribPool;
    /**
     * GLSL uniform value overrides
     */
    uniforms?: UniformValues;
    /**
     * Buffer spec for indexed geometry
     */
    indices?: IndexBufferSpec;
    /**
     * Array of initialized {@link ITexture} instances.
     * Each non-null item will be auto-bound to its respective texture unit,
     * each time the model is drawn via {@link draw}
     */
    textures?: ITexture[];
    /**
     * Extra configuration for instanced geometry
     */
    instances?: InstancingSpec;
    /**
     * WebGL draw mode. Defaults to `TRIANGLES`
     */
    mode?: DrawMode;
    /**
     * Number of vertices/indices to draw
     */
    num: number;
}

/**
 * Data specification of a single WebGL attribute
 */
export interface ModelAttributeSpec {
    /**
     * Backing {@link WebGLArrayBuffer} instance. Usually this will be
     * auto-initialized by {@link compileBuffers}
     */
    buffer?: IWebGLBuffer<AttribBufferData>;
    /**
     * Raw attribute data from which `buffer` will be initialized
     */
    data?: AttribBufferData;
    /**
     * Attribute element size (in component values, not bytes).
     * Default: 3
     */
    size?: number;
    /**
     * Auto-normalization flag when writing buffer data.
     * Default: false
     */
    normalized?: boolean;
    /**
     * Byte offset of 1st attrib component.
     * Default: 0
     */
    offset?: number;
    /**
     * Attribute stride in bytes.
     * Default: 0 = densely packed
     */
    stride?: number;
    /**
     * Attribute's WebGL data type.
     * Default: gl.FLOAT
     */
    type?: GLenum;
    /**
     * Only used for instanced attributes.
     * See: {@link https://www.khronos.org/registry/OpenGL/extensions/ANGLE/ANGLE_instanced_arrays.txt}
     */
    divisor?: number;
}

export interface InstancingSpec {
    attribs: IObjectOf<ModelAttributeSpec>;
    num: number;
}
