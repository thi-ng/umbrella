// SPDX-License-Identifier: Apache-2.0
import { assert } from "@thi.ng/errors/assert";
import type { Vec } from "@thi.ng/vectors";
import type { OBJFace, OBJGroup, OBJModel, ParseOpts } from "./api.js";

const DEFAULT_OPTS: ParseOpts = {
	normals: true,
	uvs: true,
	objects: true,
	groups: true,
	comments: false,
	tessellate: false,
};

/**
 * Parses OBJ from given `src` binary stream (e.g. a `fetch()` response).
 * Returns promise of parsed result. This is the recommended method for parsing
 * large OBJ files.
 *
 * @remarks
 * Also see {@link parseOBJFromIterable}, {@link parseOBJFromString}.
 *
 * @example
 * ```ts
 * import { parseOBJFromStream } from "@thi.ng/geom-io-obj";
 *
 * const response = await fetch("bunny.obj");
 * const model = await parseOBJFromStream(response.body!);
 * ```
 *
 * @param src
 * @param opts
 */
export const parseOBJFromStream = (
	src: ReadableStream<Uint8Array<ArrayBuffer>>,
	opts?: Partial<ParseOpts>
) => parseOBJFromIterable(src.pipeThrough(new TextDecoderStream()), opts);

/**
 * Parses OBJ from given `src` string and returns promise of parsed result.
 *
 * @remarks
 * Also see {@link parseOBJFromIterable}, {@link parseOBJFromStream}.
 *
 * @param src
 * @param opts
 */
export const parseOBJFromString = (src: string, opts?: Partial<ParseOpts>) =>
	parseOBJFromIterable([src], opts);

/**
 * Parses OBJ from given iterable (async or sync) of strings for chunk-based
 * stream parsing. Returns promise of parsed result.
 *
 * @remarks
 * Also see {@link parseOBJFromStream}, {@link parseOBJFromString}.
 *
 * @param src
 * @param opts
 */
export const parseOBJFromIterable = async (
	chunks: Iterable<string> | AsyncIterable<string>,
	opts?: Partial<ParseOpts>
) => {
	const { result, parseLine } = __parser(opts);
	let buffer = "";
	for await (const chunk of chunks) {
		const lines = (buffer.length ? buffer + chunk : chunk).split(
			/[\n\r]+/g
		);
		const n = lines.length - 1;
		for (let j = 0; j < n; j++) {
			parseLine(lines[j]);
		}
		buffer = lines[n];
	}
	parseLine(buffer);
	return result;
};

/**
 * Main parser as higher order function for better re-use. Returns object of
 * initial `result` and a `parseLine` function which should be called repeatedly
 * to proceed with parsing and will update result object.
 *
 * @param opts
 */
const __parser = (opts?: Partial<ParseOpts>) => {
	opts = { ...DEFAULT_OPTS, ...opts };

	const {
		xform,
		xformUV,
		tessellate,
		comments,
		groups: hasGroups,
		objects: hasObj,
		normals: hasNormals,
		uvs: hasUV,
	} = opts;
	const vertices: Vec[] = [];
	const normals: Vec[] = [];
	const uvs: Vec[] = [];
	const result = <OBJModel>{
		vertices,
		normals,
		uvs,
		objects: [],
		mtlLibs: [],
		comments: [],
	};
	let faces: OBJFace[];
	let currGroup!: OBJGroup;
	let nextID = 0;
	let lineNum = 0;

	const newGroup = (id: string, force = false) => {
		id = id || `group-${nextID++}`;
		(force || hasGroups) &&
			result.objects[result.objects.length - 1].groups.push(
				(currGroup = {
					id,
					smooth: false,
					faces: (faces = []),
					lines: [],
					mtl: currGroup ? currGroup.mtl : undefined,
				})
			);
	};

	const newObject = (id: string, force = false) => {
		(force || hasObj) &&
			result.objects.push({ id: id || `object-${nextID++}`, groups: [] });
		newGroup("default", force);
	};

	const readFace = (line: string[]) => {
		const face = <OBJFace>{ v: [] };
		const n = line.length;
		const nv = vertices.length;
		const nuv = uvs.length;
		const nn = normals.length;
		const items = line[1].split("/");
		switch (items.length) {
			case 1:
				for (let i = 1; i < n; i++) {
					__addID(face.v, line[i], nv);
				}
				break;
			case 2:
				hasUV && (face.uv = []);
				for (let i = 1; i < n; i++) {
					const f = line[i].split("/");
					__addID(face.v, f[0], nv);
					face.uv && __addID(face.uv!, f[1], nuv);
				}
				break;
			case 3:
				hasUV && items[1].length && (face.uv = []);
				hasNormals && items[2].length && (face.n = []);
				for (let i = 1; i < n; i++) {
					const f = line[i].split("/");
					__addID(face.v, f[0], nv);
					face.uv && __addID(face.uv!, f[1], nuv);
					face.n && __addID(face.n!, f[2], nn);
				}
				break;
			default:
		}
		return face;
	};

	const readPolyLine = (items: string[]) => {
		const nv = vertices.length;
		const verts: number[] = [];
		for (let i = 1, n = items.length; i < n; i++) {
			__addID(verts, items[i], nv);
		}
		return verts;
	};

	const parseLine = (line: string) => {
		lineNum++;
		if (!line.length) return;
		if (line[0] === "#") {
			comments && result.comments.push(line.substring(1).trim());
			return;
		}
		const items = line.trim().split(/\s+/g);
		const len = items.length;
		switch (items[0]) {
			case "v": {
				assert(len > 3, `invalid vertex @ line ${lineNum}`);
				const v = __readVec3(items);
				vertices.push(xform ? xform(v) : v);
				break;
			}
			case "vn": {
				assert(len > 3, `invalid normal @ line ${lineNum}`);
				const v = __readVec3(items);
				normals.push(xform ? xform(v) : v);
				break;
			}
			case "vt": {
				assert(len > 2, `invalid uv @ line ${lineNum}`);
				const v = __readVec2(items);
				uvs.push(xformUV ? xformUV(v) : v);
				break;
			}
			case "f": {
				assert(len > 3, `invalid face @ line ${lineNum}`);
				const f = readFace(items);
				tessellate && f.v.length > 3
					? faces!.push(...__tessellateFace(f))
					: faces!.push(f);
				break;
			}
			case "l":
				assert(len > 2, `invalid polyline @ line ${lineNum}`);
				currGroup.lines.push(readPolyLine(items));
				break;
			case "o":
				hasObj && newObject(items[1]);
				break;
			case "g":
				hasGroups && newGroup(items[1]);
				break;
			case "s":
				currGroup.smooth = items[1] !== "0" && items[1] !== "off";
				break;
			case "mtllib":
				result.mtlLibs.push(items[1]);
				break;
			case "usemtl":
				currGroup.mtl = items[1];
				break;
			default:
				console.log(`ignoring token: ${items[0]} @ line ${lineNum}`);
		}
	};

	newObject("default", true);

	return { result, parseLine };
};

/** @internal */
const __addID = (acc: number[], x: string, num: number) => {
	const v = parseInt(x);
	acc.push(v < 0 ? v + num : v - 1);
};

/** @internal */
const __readVec2 = (items: string[]) => [
	parseFloat(items[1]),
	parseFloat(items[2]),
];

/** @internal */
const __readVec3 = (items: string[]) => [
	parseFloat(items[1]),
	parseFloat(items[2]),
	parseFloat(items[3]),
];

/** @internal */
const __tessellateFace = (face: OBJFace) => {
	const { v, uv, n } = face;
	const v0 = v[0];
	const uv0 = uv && uv[0];
	const n0 = n && n[0];
	const acc: OBJFace[] = [];
	for (let i = 1, num = v.length - 1; i < num; i++) {
		const tri: OBJFace = { v: [v0, v[i], v[i + 1]] };
		uv && (tri.uv = [uv0!, uv[i], uv[i + 1]]);
		n && (tri.n = [n0!, n[i], n[i + 1]]);
		acc.push(tri);
	}
	return acc;
};
