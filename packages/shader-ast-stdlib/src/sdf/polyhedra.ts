// SPDX-License-Identifier: Apache-2.0
import type {
	FloatTerm,
	TaggedFn2,
	TaggedFn3,
	Vec3Term,
} from "@thi.ng/shader-ast";
import { F, V3 } from "@thi.ng/shader-ast/api/types";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { FLOAT0, PHI, vec3 } from "@thi.ng/shader-ast/ast/lit";
import { add, reciprocal, sub } from "@thi.ng/shader-ast/ast/ops";
import { abs, dot, max, pow } from "@thi.ng/shader-ast/builtin/math";

// could use @thi.ng/vectors, but avoiding dependency
/** @internal */
const __normalize = ([x, y, z]: number[]) => {
	const m = 1 / Math.hypot(x, y, z);
	return [x * m, y * m, z * m];
};

/** @internal */
const phi = PHI.val;

/** @internal */
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
].map((v) => vec3(...(<[]>__normalize(v))));

/**
 * @remarks
 * Based on: "Generalized Distance Functions" (E. Akleman, J. Chen)
 * http://people.tamu.edu/~ergun/research/implicitmodeling/papers/sm99.pdf
 *
 * Also based on: HG_SDF (Mercury Demogroup)
 *
 * @param id -
 * @param vecs -
 *
 * @internal
 */
const __defGDF = (
	id: string,
	vecs: Vec3Term[]
): [
	TaggedFn2<"vec3", "float", "float">,
	TaggedFn3<"vec3", "float", "float", "float">
] => [
	defn(F, id, [V3, F], (p, r) => [
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
	defn(F, id + "Smooth", [V3, F, F], (p, r, e) => [
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

export const [sdfOctahedron, sdfOctahedronSmooth] = __defGDF(
	"sdfOctahedron",
	GDF.slice(3, 7)
);

export const [sdfDodecahedron, sdfDodecahedronSmooth] = __defGDF(
	"sdfDodecahedron",
	GDF.slice(13)
);

export const [sdfIcosahedron, sdfIcosahedronSmooth] = __defGDF(
	"sdfIcosahedron",
	GDF.slice(3, 13)
);

export const [sdfTruncatedOctahedron, sdfTruncatedOctahedronSmooth] = __defGDF(
	"sdfTruncatedOctahedron",
	GDF.slice(0, 7)
);

export const [sdfTruncatedIcosahedron, sdfTruncatedIcosahedronSmooth] =
	__defGDF("sdfTruncatedIcosahedron", GDF.slice(3));
