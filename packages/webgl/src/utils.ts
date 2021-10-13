import type { IObjectOf } from "@thi.ng/api";
import type { Sym, Term } from "@thi.ng/shader-ast";
import { add, mul } from "@thi.ng/shader-ast/ast/ops";
import type { ShaderPresetOpts } from "./api/shader.js";

export const positionAttrib = (
    opts: Partial<ShaderPresetOpts<any>>,
    attribs: IObjectOf<Sym<any>>,
    pos = "position"
) =>
    opts.instancePos
        ? add(attribs[pos], attribs[opts.instancePos])
        : attribs[pos];

export const colorAttrib = (
    opts: Partial<ShaderPresetOpts<any>>,
    attribs: IObjectOf<Sym<any>>,
    fallback: Sym<"vec3">
): Term<"vec3"> =>
    opts.instanceColor
        ? mul(attribs[opts.instanceColor], fallback)
        : opts.color
        ? mul(attribs[opts.color], fallback)
        : fallback;
