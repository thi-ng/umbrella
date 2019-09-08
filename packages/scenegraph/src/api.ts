import { IID, Nullable } from "@thi.ng/api";
import { Mat } from "@thi.ng/matrices";
import { ReadonlyVec, Vec } from "@thi.ng/vectors";

export interface ISceneNode<T extends ISceneNode<T>> extends IID<string> {
    parent: Nullable<T>;
    children: T[];

    mat: Mat;
    invMat: Mat;

    update(): void;

    draw<D>(ctx: D): void;

    mapGlobalPoint(p: ReadonlyVec): Vec;

    mapLocalPointToNode(dest: ISceneNode<T>, p: ReadonlyVec): Vec;

    containsLocalPoint(_: ReadonlyVec): boolean;

    childForPoint(p: ReadonlyVec): NodeInfo<T> | undefined;
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
