// SPDX-License-Identifier: Apache-2.0
import type { ICopy, IToHiccup } from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks/is-number";
import { invert44 } from "@thi.ng/matrices/invert";
import { mulM44 } from "@thi.ng/matrices/mulm";
import { mulV344 } from "@thi.ng/matrices/mulv";
import { transform44 } from "@thi.ng/matrices/transform";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { madd3 } from "@thi.ng/vectors/madd";
import { set3 } from "@thi.ng/vectors/set";
import { setN3 } from "@thi.ng/vectors/setn";
import { sub3 } from "@thi.ng/vectors/sub";
import { ANode } from "./anode.js";
import type { CommonNodeOpts, ISceneNode } from "./api.js";
import { toHiccup } from "./hiccup.js";

export interface Node3DOpts extends CommonNodeOpts<Node3D> {
	translate?: Vec;
	rotate?: Vec;
	scale?: Vec | number;
}

export class Node3D
	extends ANode<Node3D>
	implements ICopy<Node3D>, ISceneNode<Node3D>, IToHiccup
{
	translate: Vec;
	rotate: Vec;
	scale: Vec | number;

	constructor(opts: Node3DOpts) {
		super(opts);
		this.translate = opts.translate ?? [0, 0, 0];
		this.rotate = opts.rotate ?? [0, 0, 0];
		const scale = opts.scale ?? 1;
		this.scale = isNumber(scale) ? [scale, scale, scale] : scale;
		this.update();
	}

	copy() {
		return new Node3D({
			id: this.id,
			parent: this.parent,
			translate: set3([], this.translate),
			rotate: set3([], this.rotate),
			scale: set3([], <Vec>this.scale),
			body: this.body,
		});
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

	mapLocalPointToGlobal(p: ReadonlyVec) {
		return mulV344([], this.mat, p);
	}

	mapLocalPointToNode(dest: Node3D, p: ReadonlyVec) {
		return mulV344(null, dest.invMat, mulV344([], this.mat, p)!);
	}

	scaleWithReferencePoint(ref: ReadonlyVec, scale: ReadonlyVec | number) {
		if (this.enabled) {
			const currScale = isNumber(this.scale)
				? setN3([], this.scale)
				: this.scale;
			const newScale = isNumber(scale) ? setN3([], scale) : scale;
			const delta = sub3([], currScale, newScale);
			this.scale = newScale;
			this.translate = madd3([], ref, delta, this.translate);
			this.update();
		}
		return this;
	}

	/**
	 * Future support planned. No immediate users of this method in a 3D context
	 * available thus far.
	 *
	 * @param ctx - arbitrary user data
	 */
	toHiccup(ctx?: any): any {
		return toHiccup<Node3D>(this, ctx);
	}
}
