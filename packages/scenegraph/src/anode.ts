// SPDX-License-Identifier: Apache-2.0
import type { Maybe, Nullable } from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks/is-number";
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
			parent.appendChild(this);
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

	deleteChild(node: number | T) {
		const { children } = this;
		const i = isNumber(node) ? node : children.indexOf(<any>node);
		if (i >= 0 && i < children.length) {
			children.splice(i, 1);
			return true;
		}
		return false;
	}

	draw<T>(ctx: T) {
		if (this.display) {
			for (let c of this.children) {
				c.draw(ctx);
			}
		}
	}

	childForPoint(p: ReadonlyVec): Maybe<NodeInfo<T>> {
		if (this.enabled) {
			const children = this.children;
			for (let i = children.length; i-- > 0; ) {
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

	containsLocalPoint(_: ReadonlyVec) {
		return false;
	}

	abstract update(): void;

	abstract mapGlobalPoint(p: ReadonlyVec): Maybe<Vec>;

	abstract mapLocalPointToGlobal(p: ReadonlyVec): Maybe<Vec>;

	abstract mapLocalPointToNode(dest: T, p: ReadonlyVec): Maybe<Vec>;

	abstract scaleWithReferencePoint(
		ref: ReadonlyVec,
		scale: ReadonlyVec | number
	): this;
}
