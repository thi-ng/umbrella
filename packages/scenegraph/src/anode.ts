import type { Nullable } from "@thi.ng/api";
import { assert } from "@thi.ng/errors/assert";
import type { Mat } from "@thi.ng/matrices";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import type { ISceneNode, NodeInfo } from "./api.js";

export abstract class ANode<T extends ISceneNode<any>> {
    id: string;
    parent: Nullable<T>;
    children: T[];

    body: any;

    mat!: Mat;
    invMat!: Mat;

    enabled: boolean;
    display: boolean;

    constructor(id: string, parent?: Nullable<T>, body?: any) {
        this.id = id;
        this.parent = parent;
        this.children = [];
        if (parent) {
            parent.children.push(<any>this);
        }
        this.body = body;
        this.mat = [];
        this.invMat = [];
        this.enabled = true;
        this.display = true;
    }

    appendChild(node: T) {
        this.children.push(node);
        return this;
    }

    insertChild(i: number, node: T) {
        const children = this.children;
        i < 0 && (i += children.length);
        assert(i >= 0 && i <= children.length, "index out of bounds");
        children.splice(i, 0, node);
        node.parent = <any>this;
        node.update();
        return this;
    }

    abstract deleteChild(node: number | T): boolean;

    abstract update(): void;

    draw<T>(ctx: T) {
        if (this.display) {
            for (let c of this.children) {
                c.draw(ctx);
            }
        }
    }

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
    childForPoint(p: ReadonlyVec): NodeInfo<T> | undefined {
        if (this.enabled) {
            const children = this.children;
            for (let i = children.length; --i >= 0; ) {
                const n = children[i].childForPoint(p);
                if (n) {
                    return n;
                }
            }
            const q = this.mapGlobalPoint(p);
            if (q && this.containsLocalPoint(q)) {
                return { node: <any>this, p: q };
            }
        }
    }

    /**
     * Returns copy of world space point `p`, transformed into this
     * node's local coordinate system.
     *
     * @param p -
     */
    abstract mapGlobalPoint(p: ReadonlyVec): Vec | undefined;

    /**
     * Returns copy of node local space point `p`, transformed into the
     * coordinate system of `dest` node.
     *
     * @param dest -
     * @param p -
     */
    abstract mapLocalPointToNode(dest: T, p: ReadonlyVec): Vec | undefined;

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
    containsLocalPoint(_: ReadonlyVec) {
        return false;
    }

    protected _deleteChild(node: number | T, clazz: any) {
        const i =
            node instanceof clazz
                ? this.children.indexOf(<any>node)
                : <number>node;
        if (i !== -1) {
            this.children.splice(i, 1);
            return true;
        }
        return false;
    }
}
