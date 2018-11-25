import { MultiVecOpRoVV } from "./api";
import { compile, compileG } from "./codegen";
import { vop } from "./vop";

const tpl = ([a, b]) => `t=${a}-${b};sum+=t*t;`;
const pre = "let t,sum=0;";

const $ = (dim: number) =>
    distSq.add(
        dim,
        compile(dim, tpl, "a,b", undefined, "sum", "", pre)
    );

export const distSq: MultiVecOpRoVV<number> = vop();

distSq.default(compileG(tpl, "a,b", undefined, "sum", pre));

export const distSq2 = $(2);
export const distSq3 = $(3);
export const distSq4 = $(4);
