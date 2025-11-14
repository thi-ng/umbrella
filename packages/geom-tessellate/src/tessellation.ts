// SPDX-License-Identifier: Apache-2.0
import { KdTreeMap } from "@thi.ng/geom-accel/kd-tree-map";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { distSq2, distSq3 } from "@thi.ng/vectors/distsq";
import type { ITessellation } from "./api.js";

export abstract class ATessellation implements ITessellation {
	constructor(
		public points: ReadonlyVec[] = [],
		public faces: number[][] = []
	) {}

	abstract empty(): ITessellation;

	abstract addPoint(p: ReadonlyVec): number;

	addPoints(points: ReadonlyVec[]) {
		return points.map((p) => this.addPoint(p));
	}

	addFaces(faces: number[][]) {
		this.faces.push(...faces);
		return this;
	}

	pointsForIDs(indices: number[]) {
		return indices.map((i) => this.points[i]);
	}

	pointsForFaces(faces = this.faces) {
		return faces.map((ids) => this.pointsForIDs(ids));
	}
}

export class BasicTessellation extends ATessellation {
	empty() {
		return new BasicTessellation();
	}

	addPoint(p: ReadonlyVec) {
		return this.points.push(p) - 1;
	}
}

export class MeshTessellation extends ATessellation {
	tree: KdTreeMap<ReadonlyVec, number>;

	constructor(
		dim: 2 | 3,
		points: ReadonlyVec[] = [],
		faces: number[][] = [],
		public eps = 1e-6
	) {
		super(points, faces);
		this.tree = new KdTreeMap(
			dim,
			undefined,
			dim === 2 ? distSq2 : distSq3
		);
		this.addPoints(points);
	}

	empty() {
		return new MeshTessellation(<2 | 3>this.tree.dim);
	}

	addPoint(p: ReadonlyVec) {
		const tree = this.tree;
		let id = tree.get(p, this.eps);
		if (id !== undefined) return id;
		id = tree.size;
		tree.set(p, id, this.eps);
		this.points.push(p);
		return id;
	}
}
