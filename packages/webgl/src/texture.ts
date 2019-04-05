import { isArray } from "@thi.ng/checks";
import { ITexture, TextureOpts } from "./api";

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
        const target = (this.target = opts.target || gl.TEXTURE_2D);
        const format = opts.format || gl.RGBA;
        const type = opts.type || gl.UNSIGNED_BYTE;
        let t1: GLenum, t2: GLenum;

        gl.bindTexture(target, this.tex);

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

        if (opts.image) {
            if (opts.width && opts.height) {
                gl.texImage2D(
                    target,
                    0,
                    format,
                    opts.width,
                    opts.height,
                    0,
                    format,
                    type,
                    <ArrayBufferView>opts.image
                );
            } else {
                gl.texImage2D(target, 0, format, format, type, <TexImageSource>(
                    opts.image
                ));
            }
        }

        opts.mipmap !== undefined && gl.generateMipmap(opts.mipmap);

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
