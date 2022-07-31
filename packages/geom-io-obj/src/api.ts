import type { Fn } from "@thi.ng/api";
import type { Vec } from "@thi.ng/vectors";

export interface ParseOpts {
	/**
	 * If true, creates declared objects in OBJ source. If false, all
	 * faces/lines will be merged in default object.
	 *
	 * @defaultValue true
	 */
	objects: boolean;
	/**
	 * If true, creates declared (optionally named) groups in OBJ
	 * source. If false, all faces/lines will be merged in default
	 * group of current object.
	 *
	 * @defaultValue true
	 */
	groups: boolean;
	/**
	 * If true, n-gon faces (quads or higher) will be split into
	 * triangles.
	 *
	 * @defaultValue false
	 */
	tessellate: boolean;
	/**
	 * If true, retains all comment lines (e.g. for metadata)
	 *
	 * @defaultValue false
	 */
	comments: boolean;
	/**
	 * If false, skips parsing of normals and ignores their references
	 * in faces.
	 *
	 * @defaultValue true
	 */
	normals: boolean;
	/**
	 * If false, skips parsing of UVs / tex coords and ignores their
	 * references in faces.
	 *
	 * @defaultValue true
	 */
	uvs: boolean;
	/**
	 * Transform function applied to all read vertices and normals.
	 */
	xform?: Fn<Vec, Vec>;
	/**
	 * Transform function applied to all read UVs.
	 */
	xformUV?: Fn<Vec, Vec>;
}

/**
 * Result data structure returned by {@link parseOBJ}.
 */
export interface OBJModel {
	vertices: Vec[];
	normals: Vec[];
	uvs: Vec[];
	objects: OBJObject[];
	mtlLibs: string[];
	comments: string[];
}

export interface OBJObject {
	id: string;
	groups: OBJGroup[];
}

export interface OBJGroup {
	id: string;
	smooth: boolean;
	mtl?: string;
	faces: OBJFace[];
	lines: number[][];
}

export interface OBJFace {
	v: number[];
	n?: number[];
	uv?: number[];
}
