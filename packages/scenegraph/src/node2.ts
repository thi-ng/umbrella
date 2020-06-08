import { isNumber } from "@thi.ng/checks";
import { invert23, mulM23, mulV23, transform23 } from "@thi.ng/matrices";
import { ANode } from "./anode";
import type { IToHiccup, Nullable } from "@thi.ng/api";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import type { ISceneNode } from "./api";

export class Node2D extends ANode<Node2D>
    implements ISceneNode<Node2D>, IToHiccup {
    translate: Vec;
    rotate: number;
    scale: Vec;

    constructor(
        id: string,
        parent?: Nullable<Node2D>,
        translate: Vec = [0, 0],
        rotate = 0,
        scale: Vec | number = 1,
        body?: any
    ) {
        super(id, parent, body);
        this.translate = translate;
        this.rotate = rotate;
        this.scale = isNumber(scale) ? [scale, scale] : scale;
        this.update();
    }

    deleteChild(node: number | Node2D) {
        return this._deleteChild(node, Node2D);
    }

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

    mapGlobalPoint(p: ReadonlyVec) {
        return mulV23([], this.invMat, p);
    }

    mapLocalPointToNode(dest: Node2D, p: ReadonlyVec) {
        return mulV23(null, dest.invMat, mulV23([], this.mat, p));
    }

    /**
     * By implementing this method (`IToHiccup` interface), scene graph
     * nodes can be directly used by hdom-canvas and/or hiccup-svg (for
     * the latter one needs to call `convertTree()` first).
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
                      ...this.children,
                  ]
                : this.body
                ? ["g", { transform: this.mat }, this.body]
                : undefined
            : undefined;
    }
}
