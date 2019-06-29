import { IObjectOf } from "@thi.ng/api";
import {
    add,
    mul,
    Sym,
    Term
} from "@thi.ng/shader-ast";
import { ShaderOpts } from "./api";

export const isGL2Context = (
    gl: WebGLRenderingContext
): gl is WebGL2RenderingContext =>
    typeof WebGL2RenderingContext !== "undefined" &&
    gl instanceof WebGL2RenderingContext;

export const positionAttrib = (
    opts: Partial<ShaderOpts<any>>,
    attribs: IObjectOf<Sym<any>>,
    pos = "position"
) =>
    opts.instancePos
        ? add(attribs[pos], attribs[opts.instancePos])
        : attribs[pos];

export const colorAttrib = (
    opts: Partial<ShaderOpts<any>>,
    attribs: IObjectOf<Sym<any>>,
    fallback: Sym<"vec3">
): Term<"vec3"> =>
    opts.instanceColor
        ? mul(attribs[opts.instanceColor], fallback)
        : opts.color
        ? mul(attribs[opts.color], fallback)
        : fallback;
