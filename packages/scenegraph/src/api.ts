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

	update(): void;

	draw<D>(ctx: D): void;

	mapGlobalPoint(p: ReadonlyVec): Maybe<Vec>;

	mapLocalPointToNode(dest: ISceneNode<T>, p: ReadonlyVec): Maybe<Vec>;

	containsLocalPoint(_: ReadonlyVec): boolean;

	childForPoint(p: ReadonlyVec): Maybe<NodeInfo<T>>;
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
