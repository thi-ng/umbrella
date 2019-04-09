import { withoutKeysObj } from "@thi.ng/associative";
import { isArray } from "@thi.ng/checks";
import { ITexture, TextureOpts } from "./api";
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

    constructor(gl: WebGLRenderingContext, opts?: Partial<TextureOpts>) {
        this.gl = gl;
        this.tex = gl.createTexture();
        this.target = opts.target || gl.TEXTURE_2D;
        this.configure(opts);
    }

    configure(opts: Partial<TextureOpts>) {
        const gl = this.gl;
        const target = this.target;
        const imgTarget = opts.target || target;
        const format = opts.format || gl.RGBA;
        const internalFormat = opts.internalFormat || format;
        const type = opts.type || gl.UNSIGNED_BYTE;
        let t1: GLenum, t2: GLenum;

        gl.bindTexture(this.target, this.tex);

        if (opts.filter) {
            const flt = opts.filter;
            if (isArray(flt)) {
                t1 = flt[0];
                t2 = flt[1];
            } else {
                t1 = t2 = flt;
            }
            gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, t1);
            gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, t2);
        }

        if (opts.wrap) {
            const wrap = opts.wrap;
            if (isArray(wrap)) {
                t1 = wrap[0];
                t2 = wrap[1];
            } else {
                t1 = t2 = wrap;
            }
            gl.texParameteri(target, gl.TEXTURE_WRAP_S, t1);
            gl.texParameteri(target, gl.TEXTURE_WRAP_T, t2);
        }

        opts.flip !== undefined &&
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, opts.flip ? 1 : 0);

        opts.premultiply !== undefined &&
            gl.pixelStorei(
                gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,
                opts.premultiply ? 1 : 0
            );

        if (isGL2Context(gl)) {
            if (opts.image && opts.width && opts.height) {
                gl.texImage2D(
                    imgTarget,
                    0,
                    internalFormat,
                    opts.width,
                    opts.height,
                    0,
                    format,
                    type,
                    <any>opts.image,
                    0
                );
            } else if (opts.width && opts.height) {
                gl.texStorage2D(
                    imgTarget,
                    1,
                    internalFormat,
                    opts.width,
                    opts.height
                );
            }
        } else {
            if (opts.image) {
                if (opts.width && opts.height) {
                    gl.texImage2D(
                        imgTarget,
                        0,
                        internalFormat,
                        opts.width,
                        opts.height,
                        0,
                        format,
                        type,
                        <ArrayBufferView>opts.image
                    );
                } else {
                    gl.texImage2D(imgTarget, 0, internalFormat, format, type, <
                        TexImageSource
                    >opts.image);
                }
            }
        }

        opts.mipmap && gl.generateMipmap(target);

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
 * given options are shared by each each side/face of the cube map.
 *
 * @param gl
 * @param faces in order: +x,-x,+y,-y,+z,-z
 * @param opts
 */
export const cubeMap = (
    gl: WebGLRenderingContext,
    faces: (ArrayBufferView | TexImageSource)[],
    opts?: Partial<TextureOpts>
) => {
    const tex = new Texture(gl, { target: gl.TEXTURE_CUBE_MAP });
    const faceOpts = withoutKeysObj(opts, ["target", "image", "mipmap"]);
    for (let i = 0; i < 6; i++) {
        faceOpts.target = gl.TEXTURE_CUBE_MAP_POSITIVE_X + i;
        faceOpts.image = faces[i];
        tex.configure(faceOpts);
    }
    if (opts.mipmap) {
        gl.generateMipmap(tex.target);
    }
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
    data: Float32Array,
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
