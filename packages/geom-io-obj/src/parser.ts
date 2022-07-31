import { assert } from "@thi.ng/errors/assert";
import type { Vec } from "@thi.ng/vectors";
import type { OBJFace, OBJGroup, OBJModel, ParseOpts } from "./api.js";

export const parseOBJ = (src: string, opts?: Partial<ParseOpts>) => {
	opts = {
		normals: true,
		uvs: true,
		objects: true,
		groups: true,
		comments: false,
		tessellate: false,
		...opts,
	};

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

	const newGroup = (id: string, force = false) => {
		id = id || `group-${nextID++}`;
		(force || opts!.groups) &&
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
		(force || opts!.objects) &&
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
					addID(face.v, line[i], nv);
				}
				break;
			case 2:
				opts!.uvs && (face.uv = []);
				for (let i = 1; i < n; i++) {
					const f = line[i].split("/");
					addID(face.v, f[0], nv);
					face.uv && addID(face.uv!, f[1], nuv);
				}
				break;
			case 3:
				opts!.uvs && items[1].length && (face.uv = []);
				opts!.normals && items[2].length && (face.n = []);
				for (let i = 1; i < n; i++) {
					const f = line[i].split("/");
					addID(face.v, f[0], nv);
					face.uv && addID(face.uv!, f[1], nuv);
					face.n && addID(face.n!, f[2], nn);
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
			addID(verts, items[i], nv);
		}
		return verts;
	};

	newObject("default", true);

	const { xform, xformUV, tessellate, comments } = opts;
	const lines = src.split(/[\n\r]+/g);

	for (let i = 0, n = lines.length; i < n; i++) {
		const l = lines[i];
		if (!l.length) continue;
		if (l[0] === "#") {
			comments && result.comments.push(l.substring(1).trim());
			continue;
		}
		const items = l.trim().split(/\s+/g);
		const len = items.length;
		switch (items[0]) {
			case "v": {
				assert(len > 3, `invalid vertex @ line ${i}`);
				const v = readVec3(items);
				vertices.push(xform ? xform(v) : v);
				break;
			}
			case "vn": {
				assert(len > 3, `invalid normal @ line ${i}`);
				const v = readVec3(items);
				normals.push(xform ? xform(v) : v);
				break;
			}
			case "vt": {
				assert(len > 2, `invalid uv @ line ${i}`);
				const v = readVec2(items);
				uvs.push(xformUV ? xformUV(v) : v);
				break;
			}
			case "f": {
				assert(len > 3, `invalid face @ line ${i}`);
				const f = readFace(items);
				tessellate && f.v.length > 3
					? faces!.push(...tessellateFace(f))
					: faces!.push(f);
				break;
			}
			case "l":
				assert(len > 2, `invalid polyline @ line ${i}`);
				currGroup.lines.push(readPolyLine(items));
				break;
			case "o":
				opts.objects && newObject(items[1]);
				break;
			case "g":
				opts.groups && newGroup(items[1]);
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
				console.log(`ignoring token: ${items[0]} @ line ${i}`);
		}
	}
	return result;
};

const addID = (acc: number[], x: string, num: number) => {
	const v = parseInt(x);
	acc.push(v < 0 ? v + num : v - 1);
};

const readVec2 = (items: string[]) => [
	parseFloat(items[1]),
	parseFloat(items[2]),
];

const readVec3 = (items: string[]) => [
	parseFloat(items[1]),
	parseFloat(items[2]),
	parseFloat(items[3]),
];

const tessellateFace = (face: OBJFace) => {
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
