import { withoutKeysObj } from "@thi.ng/associative/without-keys";
import { isArray } from "@thi.ng/checks/is-array";
import {
    ITexture,
    TextureFilter,
    TextureFormat,
    TextureOpts,
    TextureRepeat,
    TextureTarget,
    TextureType,
    TEX_FORMATS,
} from "./api/texture";
import { isGL2Context } from "./checks";
import { error } from "./error";

const $bind = (op: "bind" | "unbind") => (textures?: ITexture[]) => {
    if (!textures) return;
    for (let i = textures.length, tex; --i >= 0; ) {
        (tex = textures[i]) && tex[op](i);
    }
};

export const bindTextures = $bind("bind");

export const unbindTextures = $bind("unbind");

export class Texture implements ITexture {
    gl: WebGLRenderingContext;
    tex: WebGLTexture;
    target!: TextureTarget;
    format!: TextureFormat;
    filter!: TextureFilter[];
    wrap!: TextureRepeat[];
    type!: TextureType;
    size!: number[];

    constructor(gl: WebGLRenderingContext, opts: Partial<TextureOpts> = {}) {
        this.gl = gl;
        this.tex = gl.createTexture() || error("error creating WebGL texture");
        this.configure({
            filter: TextureFilter.NEAREST,
            wrap: TextureRepeat.CLAMP,
            ...opts,
        });
    }

    configure(opts: Partial<TextureOpts> = {}, unbind = true) {
        const gl = this.gl;
        const target = opts.target || this.target || TextureTarget.TEXTURE_2D;
        const format = opts.format || this.format || TextureFormat.RGBA;
        const decl = TEX_FORMATS[format];
        const type = opts.type || this.type || decl.types[0];

        !this.target && (this.target = target);
        this.format = format;
        this.type = type;

        gl.bindTexture(this.target, this.tex);

        opts.flip !== undefined &&
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, opts.flip ? 1 : 0);

        opts.premultiply !== undefined &&
            gl.pixelStorei(
                gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,
                opts.premultiply ? 1 : 0
            );

        this.configureImage(target, opts);

        opts.mipmap && gl.generateMipmap(target);

        this.configureFilter(target, opts);
        this.configureWrap(target, opts);
        this.configureLOD(target, opts);
        this.configureLevels(target, opts);

        unbind && gl.bindTexture(this.target, null);

        return true;
    }

    protected configureImage(
        target: TextureTarget,
        opts: Partial<TextureOpts>
    ) {
        if (opts.image === undefined) return;
        target === TextureTarget.TEXTURE_3D
            ? this.configureImage3d(target, opts)
            : this.configureImage2d(target, opts);
    }

    protected configureImage2d(
        target: TextureTarget,
        opts: Partial<TextureOpts>
    ) {
        const level = opts.level || 0;
        const pos = opts.pos || [0, 0, 0];
        const { image, width, height } = opts;
        const decl = TEX_FORMATS[this.format];
        const baseFormat = decl.format;
        const { gl, type, format } = this;
        if (width && height) {
            if (opts.sub) {
                gl.texSubImage2D(
                    target,
                    level,
                    pos[0],
                    pos[1],
                    width,
                    height,
                    baseFormat,
                    type,
                    <ArrayBufferView>image
                );
            } else {
                if (level === 0) {
                    this.size = [width, height];
                }
                gl.texImage2D(
                    target,
                    level,
                    format,
                    width,
                    height,
                    0,
                    baseFormat,
                    type,
                    <ArrayBufferView>image
                );
            }
        } else {
            if (opts.sub) {
                gl.texSubImage2D(
                    target,
                    level,
                    pos[0],
                    pos[1],
                    baseFormat,
                    type,
                    <TexImageSource>image
                );
            } else {
                if (image != null && level === 0) {
                    this.size = [(<any>image).width, (<any>image).height];
                }
                gl.texImage2D(
                    target,
                    level,
                    format,
                    baseFormat,
                    type,
                    <TexImageSource>image
                );
            }
        }
    }

    protected configureImage3d(
        target: TextureTarget,
        opts: Partial<TextureOpts>
    ) {
        const { image, width, height, depth } = opts;
        if (!(width && height && depth)) return;
        const level = opts.level || 0;
        const pos = opts.pos || [0, 0, 0];
        const decl = TEX_FORMATS[this.format];
        const baseFormat = decl.format;
        const { gl, type, format } = this;
        if (opts.sub) {
            (<WebGL2RenderingContext>gl).texSubImage3D(
                target,
                level,
                pos[0],
                pos[1],
                pos[2],
                width,
                height,
                depth,
                baseFormat,
                type,
                <any>image
            );
        } else {
            if (level === 0) {
                this.size = [width, height, depth];
            }
            (<WebGL2RenderingContext>gl).texImage3D(
                target,
                level,
                format,
                width,
                height,
                depth,
                0,
                baseFormat,
                type,
                <any>image
            );
        }
    }

    protected configureFilter(
        target: TextureTarget,
        opts: Partial<TextureOpts>
    ) {
        const gl = this.gl;
        const flt = opts.filter || this.filter || TextureFilter.NEAREST;
        let t1: GLenum, t2: GLenum;
        if (isArray(flt)) {
            t1 = flt[0];
            t2 = flt[1] || t1;
            this.filter = [t1, t2];
        } else {
            this.filter = [flt, flt, flt];
            t1 = t2 = flt;
        }
        gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, t1);
        gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, t2);
    }

    protected configureWrap(target: TextureTarget, opts: Partial<TextureOpts>) {
        const gl = this.gl;
        const wrap = opts.wrap || this.wrap || TextureRepeat.CLAMP;
        let t1: GLenum, t2: GLenum, t3: GLenum;
        if (isArray(wrap)) {
            t1 = wrap[0];
            t2 = wrap[1] || t1;
            t3 = wrap[2] || t1;
            this.wrap = [t1, t2, t3];
        } else {
            t1 = t2 = t3 = wrap;
            this.wrap = [wrap, wrap, wrap];
        }
        gl.texParameteri(target, gl.TEXTURE_WRAP_S, t1);
        gl.texParameteri(target, gl.TEXTURE_WRAP_T, t2);
        isGL2Context(gl) &&
            target === (<WebGL2RenderingContext>gl).TEXTURE_3D &&
            gl.texParameteri(
                target,
                (<WebGL2RenderingContext>gl).TEXTURE_WRAP_R,
                t3
            );
    }

    protected configureLOD(target: TextureTarget, opts: Partial<TextureOpts>) {
        const gl = this.gl;
        if (opts.lod) {
            const [t1, t2] = opts.lod;
            t1 &&
                gl.texParameterf(
                    target,
                    (<WebGL2RenderingContext>gl).TEXTURE_MIN_LOD,
                    t1
                );
            t2 &&
                gl.texParameterf(
                    target,
                    (<WebGL2RenderingContext>gl).TEXTURE_MAX_LOD,
                    t2
                );
        }
    }

    protected configureLevels(
        target: TextureTarget,
        opts: Partial<TextureOpts>
    ) {
        const gl = this.gl;
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
            delete (<any>this).tex;
            delete (<any>this).gl;
            return true;
        }
        return false;
    }
}

export const defTexture = (
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
 * @param gl -
 * @param faces - in order: +x,-x,+y,-y,+z,-z
 * @param opts -
 */
export const defTextureCubeMap = (
    gl: WebGLRenderingContext,
    faces: (ArrayBufferView | TexImageSource)[],
    opts: Partial<TextureOpts> = {}
) => {
    const tex = new Texture(gl, { target: gl.TEXTURE_CUBE_MAP });
    const faceOpts = withoutKeysObj(opts, [
        "target",
        "image",
        "filter",
        "mipmap",
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
 * Creates & configure a new float texture.
 *
 * **Important:** Since each texel will hold 4x 32-bit float values, the
 * `data` buffer needs to have a length of at least `4 * width *
 * height`.
 *
 * Under WebGL 1.0, we assume the caller has previously enabled the
 * `OES_texture_float` extension.
 *
 * @param gl - GL context
 * @param data - texture data
 * @param width - width
 * @param height - height
 * @param format -
 * @param type -
 */
export const defTextureFloat = (
    gl: WebGLRenderingContext,
    data: Float32Array | undefined | null,
    width: number,
    height: number,
    format?: TextureFormat,
    type?: TextureType
) =>
    new Texture(gl, {
        filter: gl.NEAREST,
        wrap: gl.CLAMP_TO_EDGE,
        format:
            format ||
            (isGL2Context(gl) ? TextureFormat.RGBA32F : TextureFormat.RGBA),
        type: type || gl.FLOAT,
        image: data,
        width,
        height,
    });
