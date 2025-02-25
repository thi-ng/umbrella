// SPDX-License-Identifier: Apache-2.0
import type { IID, Maybe, Nullable } from "@thi.ng/api";
import type { Mat } from "@thi.ng/matrices";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";

export interface ISceneNode<T extends ISceneNode<T>> extends IID<string> {
	parent: Nullable<T>;
	children: T[];

	mat: Mat;
	invMat: Mat;

	appendChild(node: T): this;

	insertChild(i: number, node: T): this;

	deleteChild(node: number | T): boolean;

	/**
	 * Recursively recomputes this node's (and its children's) transformation
	 * matrices (i.e. {@link ANode.mat} and {@link ANode.invMat}).
	 *
	 * @remarks
	 * This function is a no-op if the node is currently disabled (see
	 * {@link ANode.enabled}).
	 */
	update(): void;

	draw<D>(ctx: D): void;

	/**
	 * Returns copy of world space point `p`, transformed into this
	 * node's local coordinate system.
	 *
	 * @param p -
	 */
	mapGlobalPoint(p: ReadonlyVec): Maybe<Vec>;

	/**
	 * Returns copy of node local space point `p`, transformed into the global
	 * worldspace.
	 *
	 * @param p
	 */
	mapLocalPointToGlobal(p: ReadonlyVec): Maybe<Vec>;

	/**
	 * Returns copy of node local space point `p`, transformed into the
	 * coordinate system of `dest` node.
	 *
	 * @param dest -
	 * @param p -
	 */
	mapLocalPointToNode(dest: ISceneNode<T>, p: ReadonlyVec): Maybe<Vec>;

	/**
	 * Returns true, if given point is contained within the boundary of
	 * this node. Since this class is used as generic base
	 * implementation for other, more specialized scene graph nodes,
	 * this base impl always returns false (meaning these nodes cannot
	 * will not be selectable by the user unless a subclass overrides
	 * this method).
	 *
	 * @param p -
	 */
	containsLocalPoint(_: ReadonlyVec): boolean;

	/**
	 * Checks all children in reverse order, then (if no child matched)
	 * node itself for containment of given point (in world/screen
	 * coords). Returns `NodeInfo` object with matched node (if any) or
	 * undefined.
	 *
	 * **Important:** Disabled nodes and their children will be skipped!
	 *
	 * @param p -
	 */
	childForPoint(p: ReadonlyVec): Maybe<NodeInfo<T>>;

	/**
	 * Scales node to new given `scale` factor and translates it such that given
	 * `ref`erence point (given in local space) would stay constant in world
	 * space. Useful for zoomable UIs, e.g. for zooming relative to the mouse
	 * position.
	 *
	 * @remarks
	 * This function is a no-op if the node is currently not enabled.
	 *
	 * @param ref
	 * @param scale
	 */
	scaleWithReferencePoint(
		ref: ReadonlyVec,
		scale: ReadonlyVec | number
	): this;
}

/**
 * Node information for mouse picking.
 */
export interface NodeInfo<T> {
	/**
	 * Selected node
	 */
	node: T;
	/**
	 * Point in node local coordinate space.
	 */
	p?: Vec;
}
