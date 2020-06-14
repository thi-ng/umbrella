import { add, mul, Sym, Term } from "@thi.ng/shader-ast";
import type { IObjectOf } from "@thi.ng/api";
import type { ShaderOpts } from "./api/shader";

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
