import type { ICopy, IToHiccup, Nullable } from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks/is-number";
import { invert23 } from "@thi.ng/matrices/invert";
import { mulM23 } from "@thi.ng/matrices/mulm";
import { mulV23 } from "@thi.ng/matrices/mulv";
import { transform23 } from "@thi.ng/matrices/transform";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { set2 } from "@thi.ng/vectors/set";
import { ANode } from "./anode";
import type { ISceneNode } from "./api";
import { toHiccup } from "./hiccup";

export class Node2D
    extends ANode<Node2D>
    implements ICopy<Node2D>, ISceneNode<Node2D>, IToHiccup
{
    translate: Vec;
    rotate: number;
    scale: Vec | number;

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

    copy() {
        return new Node2D(
            this.id,
            this.parent,
            set2([], this.translate),
            this.rotate,
            set2([], <Vec>this.scale),
            this.body
        );
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
     * By implementing this method (`IToHiccup` interface), scene graph nodes
     * can be directly used by hdom-canvas, hiccup-canvas, rdom-canvas or
     * hiccup-svg (for the latter one needs to call `convertTree()` first).
     *
     * @param ctx - arbitrary user data
     */
    toHiccup(ctx?: any): any {
        return toHiccup<Node2D>(this, ctx);
    }
}
