import { MultiVecOpRoVV } from "./api";
import { compile, compileG } from "./codegen";
import { vop } from "./vop";

const $ = (dim: number) =>
    dot.add(
        dim,
        compile(
            dim,
            ([a, b]) => `${a}*${b}`,
            "a,b",
            undefined,
            null,
            "+",
            "return ",
            ";"
        )
    );

export const dot: MultiVecOpRoVV<number> = vop();

dot.default(
    compileG(([a, b]) => `sum+=${a}*${b};`, "a,b", undefined, "sum", "let sum=0;")
);

export const dot2 = $(2);
export const dot3 = $(3);
export const dot4 = $(4);
