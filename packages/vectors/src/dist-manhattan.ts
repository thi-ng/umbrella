import type { MultiVecOpRoVV } from "./api";
import { compile, compileG } from "./internal/codegen";
import { vop } from "./internal/vop";

const $ = (dim: number) =>
    distManhattan.add(
        dim,
        compile(
            dim,
            ([a, b]) => `Math.abs(${a}-${b})`,
            "a,b",
            undefined,
            "",
            "+",
            "return ",
            ";"
        )
    );

/**
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Taxicab_geometry
 */
export const distManhattan: MultiVecOpRoVV<number> = vop();

distManhattan.default(
    compileG(
        ([a, b]) => `sum+=Math.abs(${a}-${b});`,
        "a,b",
        undefined,
        "sum",
        "let sum=0;"
    )
);

export const distManhattan2 = $(2);
export const distManhattan3 = $(3);
export const distManhattan4 = $(4);
