import type { IEmpty } from "@thi.ng/api";
import type { ReadonlyVec } from "@thi.ng/vectors";

/**
 * Tessellation algorithm implementation. Takes a {@link ITessellation}, an
 * array of `faces` and an array of point/vertex IDs of the face/polygon to
 * tessellate. Any new points created by the impl are to be added to the `tess`
 * via {@link ITessellation.addPoint}. Any generated faces are to be appended to
 * the given `faces` array (which also must be returned).
 *
 * @param tess
 * @param faces
 * @param face
 */
export type Tessellator = (
	tess: ITessellation,
	faces: number[][],
	face: number[]
) => number[][];

export interface ITessellation extends IEmpty<ITessellation> {
	/**
	 * Points referenced by {@link ITessellation.faces}.
	 *
	 * @remarks
	 * If a {@link Tessellator} is creating new points as part of its
	 * processing, these are appended to this array (but **not directly!**).
	 * Tessellators MUST use {@link ITessellation.addPoint} or
	 * {@link ITessellation.addPoints}).
	 */
	points: ReadonlyVec[];
	/**
	 * Array of tessellated faces, each itself an array point IDs/indices,
	 * referencing {@link ITessellation.points}.
	 */
	faces: number[][];

	/**
	 * Adds given point to tessellation and returns its ID/index.
	 *
	 * @remarks
	 * It's implementation specific if the point will actually be added or if a
	 * matching pre-existing point ID will be reused (e.g. see
	 * {@link MeshTessellation}).
	 *
	 * @param point
	 */
	addPoint(point: ReadonlyVec): number;
	/**
	 * Batch version of {@link ITessellation.addPoint}, returning an array of
	 * point IDs.
	 *
	 * @param points
	 */
	addPoints(points: ReadonlyVec[]): number[];
	/**
	 * Add given faces to {@link ITessellation.faces}.
	 *
	 * @remarks
	 * Note: Because {@link Tessellator}s might be applied recursively, they
	 * **do not** directly add faces to a given {@link ITessellation}, but onl
	 * return generated faces as separate array. Currently, this function is
	 * only called by {@link tessellateFaces} (and implicitly by
	 * {@link tessellate}, {@link tessellateWith}).
	 *
	 * @param faces
	 */
	addFaces(faces: number[][]): this;
	/**
	 * Takes an array of point IDs and returns their actual points.
	 *
	 * @remarks
	 * No bounds checking performed. IDs are assumed to be valid.
	 *
	 * @param indices
	 */
	pointsForIDs(indices: number[]): ReadonlyVec[];
	/**
	 * Similar to {@link ITessellation.pointsForIDs}, but takes an array of
	 * faces (by default all current faces in the tessellation) and returns an
	 * array of faces where wach face is an array of points (rather than point
	 * IDs).
	 *
	 * @param faces
	 */
	pointsForFaces(faces?: number[][]): ReadonlyVec[][];
}
