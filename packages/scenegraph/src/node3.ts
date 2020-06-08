import { isNumber } from "@thi.ng/checks";
import { invert44, mulM44, mulV344, transform44 } from "@thi.ng/matrices";
import { ANode } from "./anode";
import type { IToHiccup, Nullable } from "@thi.ng/api";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import type { ISceneNode } from "./api";

export class Node3D extends ANode<Node3D>
    implements ISceneNode<Node3D>, IToHiccup {
    translate: Vec;
    rotate: Vec;
    scale: Vec;

    constructor(
        id: string,
        parent?: Nullable<Node3D>,
        translate: Vec = [0, 0, 0],
        rotate = [0, 0, 0],
        scale: Vec | number = 1,
        body?: any
    ) {
        super(id, parent, body);
        this.translate = translate;
        this.rotate = rotate;
        this.scale = isNumber(scale) ? [scale, scale, scale] : scale;
        this.update();
    }

    deleteChild(node: number | Node3D) {
        return this._deleteChild(node, Node3D);
    }

    update() {
        if (this.enabled) {
            this.mat = transform44([], this.translate, this.rotate, this.scale);
            if (this.parent) {
                mulM44(this.mat, this.parent.mat, this.mat);
            }
            invert44(this.invMat, this.mat);
            for (let c of this.children) {
                c.update();
            }
        }
    }

    mapGlobalPoint(p: ReadonlyVec) {
        return mulV344([], this.invMat, p);
    }

    mapLocalPointToNode(dest: Node3D, p: ReadonlyVec) {
        return mulV344(null, dest.invMat, mulV344([], this.mat, p)!);
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
                      ...this.children,
                  ]
                : this.body
                ? ["g", { transform: this.mat }, this.body]
                : undefined
            : undefined;
    }
}
