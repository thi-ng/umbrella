import { deref, ICopy, IToHiccup, Nullable } from "@thi.ng/api";
import { isFunction, isNumber } from "@thi.ng/checks";
import { invert44, mulM44, mulV344, transform44 } from "@thi.ng/matrices";
import { ReadonlyVec, set3, Vec } from "@thi.ng/vectors";
import { ANode } from "./anode";
import type { ISceneNode } from "./api";

export class Node3D extends ANode<Node3D>
    implements ICopy<Node3D>, ISceneNode<Node3D>, IToHiccup {
    translate: Vec;
    rotate: Vec;
    scale: Vec | number;

    constructor(
        id: string,
        parent?: Nullable<Node3D>,
        translate: Vec = [0, 0, 0],
        rotate: Vec = [0, 0, 0],
        scale: Vec | number = 1,
        body?: any
    ) {
        super(id, parent, body);
        this.translate = translate;
        this.rotate = rotate;
        this.scale = isNumber(scale) ? [scale, scale, scale] : scale;
        this.update();
    }

    copy() {
        return new Node3D(
            this.id,
            this.parent,
            set3([], this.translate),
            set3([], this.rotate),
            set3([], <Vec>this.scale),
            this.body
        );
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
     * Future support planned. No immediate users of this method in a 3D context
     * available thus far.
     *
     * @param ctx - arbitrary user data
     */
    toHiccup(ctx?: any): any {
        const body = isFunction(this.body) ? this.body(ctx) : deref(this.body);
        return this.enabled && this.display
            ? this.children.length
                ? [
                      "g",
                      {},
                      this.body
                          ? ["g", { transform: this.mat }, body]
                          : undefined,
                      ...this.children.map((c) => c.toHiccup(ctx)),
                  ]
                : body
                ? ["g", { transform: this.mat }, body]
                : undefined
            : undefined;
    }
}
