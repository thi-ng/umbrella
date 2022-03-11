import type {
    FloatTerm,
    TaggedFn2,
    TaggedFn3,
    Vec3Term,
} from "@thi.ng/shader-ast";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { FLOAT0, PHI, vec3 } from "@thi.ng/shader-ast/ast/lit";
import { add, reciprocal, sub } from "@thi.ng/shader-ast/ast/ops";
import { abs, dot, max, pow } from "@thi.ng/shader-ast/builtin/math";

// could use @thi.ng/vectors, but avoiding dependency
const normalize = ([x, y, z]: number[]) => {
    const m = 1 / Math.hypot(x, y, z);
    return [x * m, y * m, z * m];
};

const phi = PHI.val;

const GDF = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 1],
    [-1, 1, 1],
    [1, -1, 1],
    [1, 1, -1],
    [0, 1, phi + 1],
    [0, -1, phi + 1],
    [phi + 1, 0, 1],
    [-phi - 1, 0, 1],
    [1, phi + 1, 0],
    [-1, phi + 1, 0],
    [0, phi, 1],
    [0, -phi, 1],
    [1, 0, phi],
    [-1, 0, phi],
    [phi, 1, 0],
    [-phi, 1, 0],
].map((v) => vec3(...(<[]>normalize(v))));

/**
 * @remarks
 * Based on: "Generalized Distance Functions" (E. Akleman, J. Chen)
 * http://people.tamu.edu/~ergun/research/implicitmodeling/papers/sm99.pdf
 *
 * Also based on: HG_SDF (Mercury Demogroup)
 *
 * @param id - 
 * @param vecs - 
 */
const defGDF = (
    id: string,
    vecs: Vec3Term[]
): [
    TaggedFn2<"vec3", "float", "float">,
    TaggedFn3<"vec3", "float", "float", "float">
] => [
    defn("float", id, ["vec3", "float"], (p, r) => [
        ret(
            sub(
                vecs.reduce(
                    (acc: FloatTerm, v) => max(acc, abs(dot(p, v))),
                    FLOAT0
                ),
                r
            )
        ),
    ]),
    defn("float", id + "Smooth", ["vec3", "float", "float"], (p, r, e) => [
        ret(
            sub(
                pow(
                    vecs.reduce(
                        (acc: FloatTerm, v) => add(acc, pow(abs(dot(p, v)), e)),
                        FLOAT0
                    ),
                    reciprocal(e)
                ),
                r
            )
        ),
    ]),
];

export const [sdfOctahedron, sdfOctahedronSmooth] = defGDF(
    "sdfOctahedron",
    GDF.slice(3, 7)
);

export const [sdfDodecahedron, sdfDodecahedronSmooth] = defGDF(
    "sdfDodecahedron",
    GDF.slice(13)
);

export const [sdfIcosahedron, sdfIcosahedronSmooth] = defGDF(
    "sdfIcosahedron",
    GDF.slice(3, 13)
);

export const [sdfTruncatedOctahedron, sdfTruncatedOctahedronSmooth] = defGDF(
    "sdfTruncatedOctahedron",
    GDF.slice(0, 7)
);

export const [sdfTruncatedIcosahedron, sdfTruncatedIcosahedronSmooth] = defGDF(
    "sdfTruncatedIcosahedron",
    GDF.slice(3)
);
