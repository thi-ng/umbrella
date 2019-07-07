import { withoutKeysObj } from "@thi.ng/associative";
import { isArray } from "@thi.ng/checks";
import { ITexture, TextureOpts } from "./api";
import { error } from "./error";
import { isGL2Context } from "./utils";

export const bindTextures = (textures: ITexture[]) => {
    if (!textures) return;
    for (let i = textures.length, tex; --i >= 0; ) {
        (tex = textures[i]) && tex.bind(i);
    }
};

export class Texture implements ITexture {
    gl: WebGLRenderingContext;
    tex: WebGLTexture;
    target: GLenum;

    constructor(gl: WebGLRenderingContext, opts: Partial<TextureOpts> = {}) {
        this.gl = gl;
        this.tex = gl.createTexture() || error("error creating WebGL texture");
        this.target = opts!.target || gl.TEXTURE_2D;
        this.configure(opts);
    }

    configure(opts: Partial<TextureOpts> = {}) {
        const gl = this.gl;
        const isGL2 = isGL2Context(gl);
        const target = this.target;
        const imgTarget = opts.target || target;
        const format = opts.format || gl.RGBA;
        const internalFormat = opts.internalFormat || format;
        const type = opts.type || gl.UNSIGNED_BYTE;
        let t1: GLenum, t2: GLenum, t3: GLenum;

        gl.bindTexture(this.target, this.tex);

        opts.flip !== undefined &&
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, opts.flip ? 1 : 0);

        opts.premultiply !== undefined &&
            gl.pixelStorei(
                gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,
                opts.premultiply ? 1 : 0
            );

        if (opts.image !== undefined) {
            const level = opts.level || 0;
            const pos = opts.pos || [0, 0];
            if (opts.width && opts.height) {
                opts.sub
                    ? gl.texSubImage2D(
                          imgTarget,
                          level,
                          pos[0],
                          pos[1],
                          opts.width,
                          opts.height,
                          format,
                          type,
                          <ArrayBufferView>opts.image
                      )
                    : gl.texImage2D(
                          imgTarget,
                          level,
                          internalFormat,
                          opts.width,
                          opts.height,
                          0,
                          format,
                          type,
                          <ArrayBufferView>opts.image
                      );
            } else {
                opts.sub
                    ? gl.texSubImage2D(
                          imgTarget,
                          level,
                          pos[0],
                          pos[1],
                          format,
                          type,
                          <TexImageSource>opts.image
                      )
                    : gl.texImage2D(
                          imgTarget,
                          level,
                          internalFormat,
                          format,
                          type,
                          <TexImageSource>opts.image
                      );
            }
        }

        opts.mipmap && gl.generateMipmap(target);

        if (opts.filter) {
            const flt = opts.filter;
            if (isArray(flt)) {
                t1 = flt[0];
                t2 = flt[1]!;
            } else {
                t1 = t2 = flt;
            }
            t1 && gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, t1);
            t2 && gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, t2);
        }

        if (opts.wrap) {
            const wrap = opts.wrap;
            if (isArray(wrap)) {
                t1 = wrap[0];
                t2 = wrap[1]!;
                t3 = wrap[2]!;
            } else {
                t1 = t2 = t3 = wrap;
            }
            t1 && gl.texParameteri(target, gl.TEXTURE_WRAP_S, t1);
            t2 && gl.texParameteri(target, gl.TEXTURE_WRAP_T, t2);
            t3 &&
                isGL2 &&
                target === (<WebGL2RenderingContext>gl).TEXTURE_3D &&
                gl.texParameteri(
                    target,
                    (<WebGL2RenderingContext>gl).TEXTURE_WRAP_R,
                    t3
                );
        }

        if (opts.lod) {
            const [t1, t2] = opts.lod;
            t1 &&
                gl.texParameteri(
                    target,
                    (<WebGL2RenderingContext>gl).TEXTURE_MIN_LOD,
                    t1
                );
            t2 &&
                gl.texParameteri(
                    target,
                    (<WebGL2RenderingContext>gl).TEXTURE_MAX_LOD,
                    t2
                );
        }

        if (opts.minMaxLevel) {
            const [t1, t2] = opts.minMaxLevel;
            gl.texParameteri(
                target,
                (<WebGL2RenderingContext>gl).TEXTURE_BASE_LEVEL,
                t1
            );
            gl.texParameteri(
                target,
                (<WebGL2RenderingContext>gl).TEXTURE_MAX_LEVEL,
                t2
            );
        }

        return true;
    }

    bind(id = 0) {
        const gl = this.gl;
        gl.activeTexture(gl.TEXTURE0 + id);
        gl.bindTexture(this.target, this.tex);
        return true;
    }

    unbind(id = 0) {
        const gl = this.gl;
        gl.activeTexture(gl.TEXTURE0 + id);
        gl.bindTexture(this.target, null);
        return true;
    }

    release() {
        if (this.tex) {
            this.gl.deleteTexture(this.tex);
            delete this.tex;
            delete this.gl;
            return true;
        }
        return false;
    }
}

export const texture = (
    gl: WebGLRenderingContext,
    opts?: Partial<TextureOpts>
) => new Texture(gl, opts);

/**
 * Creates cube map texture from given 6 `face` texture sources. The
 * given options are shared by each each side/face of the cube map. The
 * following options are applied to the cube map directly:
 *
 * - `filter`
 * - `mipmap`
 *
 * The following options are ignored entirely:
 *
 * - `target`
 * - `image`
 *
 * @param gl
 * @param faces in order: +x,-x,+y,-y,+z,-z
 * @param opts
 */
export const cubeMap = (
    gl: WebGLRenderingContext,
    faces: (ArrayBufferView | TexImageSource)[],
    opts: Partial<TextureOpts> = {}
) => {
    const tex = new Texture(gl, { target: gl.TEXTURE_CUBE_MAP });
    const faceOpts = withoutKeysObj(opts, [
        "target",
        "image",
        "filter",
        "mipmap"
    ]);
    for (let i = 0; i < 6; i++) {
        faceOpts.target = gl.TEXTURE_CUBE_MAP_POSITIVE_X + i;
        faceOpts.image = faces[i];
        tex.configure(faceOpts);
    }
    tex.configure({ filter: opts.filter, mipmap: opts.mipmap });
    return tex;
};

/**
 * Creates & configure a new FLOAT texture.
 *
 * **Important:** Since each texel will hold 4x 32-bit float values, the
 * `data` buffer needs to have a length of at least `4 * width *
 * height`.
 *
 * Under WebGL 1.0, we assume the caller has previously enabled the
 * `OES_texture_float` extension.
 *
 * @param gl GL context
 * @param data texture data
 * @param width width
 * @param height height
 */
export const floatTexture = (
    gl: WebGLRenderingContext,
    data: Float32Array | undefined | null,
    width: number,
    height: number,
    internalFormat?: GLenum,
    format?: GLenum
) =>
    new Texture(gl, {
        filter: gl.NEAREST,
        wrap: gl.CLAMP_TO_EDGE,
        internalFormat:
            internalFormat || (isGL2Context(gl) ? gl.RGBA32F : gl.RGBA),
        format: format || gl.RGBA,
        type: gl.FLOAT,
        image: data,
        width,
        height
    });
