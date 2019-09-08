import { assert, IID, IToHiccup } from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks";
import {
    invert23,
    Mat,
    mulM23,
    mulV23,
    transform23
} from "@thi.ng/matrices";
import { ReadonlyVec, Vec } from "@thi.ng/vectors";

export interface ISceneNode<T extends ISceneNode<T>> extends IID<string> {
    parent: T | null;
    children: T[];

    mat: Mat;
    invMat: Mat;

    update(): void;

    draw<D>(ctx: D): void;

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

export class Node2D implements ISceneNode<Node2D>, IToHiccup {
    id: string;
    parent: Node2D | null;
    children: Node2D[];

    translate: Vec;
    rotate: number;
    scale: Vec;

    body: any;

    mat!: Mat;
    invMat!: Mat;

    enabled: boolean;
    display: boolean;

    constructor(
        id: string,
        parent: Node2D | null,
        translate: Vec = [0, 0],
        rotate = 0,
        scale: Vec | number = 1,
        body?: any
    ) {
        this.id = id;
        this.parent = parent;
        this.children = [];
        this.translate = translate;
        this.rotate = rotate;
        this.scale = isNumber(scale) ? [scale, scale] : scale;
        this.body = body;
        if (parent) {
            parent.children.push(this);
        }
        this.mat = [];
        this.invMat = [];
        this.enabled = true;
        this.display = true;
        this.update();
    }

    appendChild(node: Node2D) {
        this.children.push(node);
        return this;
    }

    insertChild(i: number, node: Node2D) {
        const children = this.children;
        i < 0 && (i += children.length);
        assert(i >= 0 && i <= children.length, "index out of bounds");
        children.splice(i, 0, node);
        node.parent = this;
        node.update();
        return this;
    }

    deleteChild(node: number | Node2D) {
        const i =
            node instanceof Node2D
                ? this.children.findIndex((x) => x === node)
                : node;
        if (i !== -1) {
            this.children.splice(i, 1);
            return true;
        }
        return false;
    }

    /**
     * Updates matrices of this node and of all children. If node has a
     * parent, the matrix will be concatenated to the parent's matrix.
     */
    update() {
        if (this.enabled) {
            this.mat = transform23([], this.translate, this.rotate, this.scale);
            if (this.parent) {
                mulM23(this.mat, this.parent.mat, this.mat);
            }
            invert23(this.invMat, this.mat);
            for (let c of this.children) {
                c.update();
            }
        }
    }

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
     * @param p
     */
    childForPoint(p: ReadonlyVec): NodeInfo<Node2D> | undefined {
        if (this.enabled) {
            const children = this.children;
            for (let i = children.length; --i >= 0; ) {
                const n = children[i].childForPoint(p);
                if (n) {
                    return n;
                }
            }
            const q = this.mapGlobalPoint(p);
            if (this.containsLocalPoint(q)) {
                return { node: this, p: q };
            }
        }
    }

    /**
     * Returns copy of world space point `p`, transformed into this
     * node's local coordinate system.
     *
     * @param p
     */
    mapGlobalPoint(p: ReadonlyVec) {
        return mulV23([], this.invMat, p);
    }

    /**
     * Returns copy of node local space point `p`, transformed into the
     * coordinate system of `dest` node.
     *
     * @param dest
     * @param p
     */
    mapLocalPointToNode(dest: Node2D, p: ReadonlyVec) {
        return mulV23(null, dest.invMat, mulV23([], this.mat, p));
    }

    /**
     * Returns true, if given point is contained within the boundary of
     * this node. Since this class is used as generic base
     * implementation for other, more specialized scene graph nodes,
     * this base impl always returns false (meaning these nodes cannot
     * will not be selectable by the user unless a subclass overrides
     * this method).
     *
     * @param p
     */
    containsLocalPoint(_: ReadonlyVec) {
        return false;
    }

    /**
     * By implementing this method (`IToHiccup` interface), scene graph
     * nodes can be directly used by hdom-canvas.
     */
    toHiccup() {
        return this.enabled && this.display
            ? this.children.length
                ? [
                      "g",
                      {},
                      this.body
                          ? ["g", { transform: this.mat }, this.body]
                          : undefined,
                      ...this.children
                  ]
                : this.body
                ? ["g", { transform: this.mat }, this.body]
                : undefined
            : undefined;
    }
}
