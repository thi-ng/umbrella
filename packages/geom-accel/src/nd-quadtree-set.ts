import type { ICopy, IEmpty, Pair } from "@thi.ng/api";
import type { IRegionQuery, ISpatialSet } from "@thi.ng/geom-api";
import { EPS } from "@thi.ng/math/api";
import type { DistanceFn, ReadonlyVec } from "@thi.ng/vectors";
import { addmN } from "@thi.ng/vectors/addmn";
import { submN } from "@thi.ng/vectors/submn";
import { NdQuadtreeMap } from "./nd-quadtree-map.js";

export class NdQuadtreeSet<K extends ReadonlyVec>
	implements
		ICopy<NdQuadtreeSet<K>>,
		IEmpty<NdQuadtreeSet<K>>,
		IRegionQuery<K, K, number>,
		ISpatialSet<K>
{
	/**
	 * Returns a new point-based `NdQuadtreeSet` for nD keys in given
	 * region defined by `min` / `max` coordinates. The dimensionality
	 * of the tree is implicitly defined by the provided coordinates.
	 * Only points within that region can be indexed.
	 *
	 * @remarks
	 * Due to exponentially growing lookup tables, currently only
	 * supports up to 16 dimensions.
	 */
	static fromMinMax<K extends ReadonlyVec>(
		min: ReadonlyVec,
		max: ReadonlyVec
	) {
		return new NdQuadtreeSet<K>(
			addmN([], min, max, 0.5),
			submN([], max, min, 0.5)
		);
	}

	protected tree: NdQuadtreeMap<K, K>;
	protected _size: number;

	constructor(
		pos: ReadonlyVec,
		ext: ReadonlyVec,
		keys?: Iterable<K>,
		distanceFn?: DistanceFn
	) {
		this.tree = new NdQuadtreeMap<K, K>(pos, ext, undefined, distanceFn);
		this._size = 0;
		keys && this.into(keys);
	}

	[Symbol.iterator]() {
		return this.tree.keys();
	}

	keys() {
		return this.tree.keys();
	}

	values() {
		return this.tree.values();
	}

	get size() {
		return this._size;
	}

	copy(): NdQuadtreeSet<K> {
		return new NdQuadtreeSet<K>(
			this.tree.root.pos,
			this.tree.root.ext,
			this,
			this.tree.distanceFn
		);
	}

	clear() {
		this.tree.clear();
	}

	empty() {
		return new NdQuadtreeSet<K>(
			this.tree.root.pos,
			this.tree.root.ext,
			undefined,
			this.tree.distanceFn
		);
	}

	add(key: K, eps = EPS) {
		return this.tree.set(key, key, eps);
	}

	into(keys: Iterable<K>, eps = EPS) {
		let ok = true;
		const tree = this.tree;
		for (let k of keys) {
			ok = tree.set(k, k, eps) && ok;
		}
		return ok;
	}

	remove(key: K) {
		return this.tree.remove(key);
	}

	has(key: K, eps = EPS) {
		return this.tree.has(key, eps);
	}

	get(key: K, eps?: number) {
		return this.tree.get(key, eps);
	}

	query(q: K, maxDist: number, limit?: number, acc?: Pair<K, K>[]) {
		return this.tree.query(q, maxDist, limit, acc);
	}

	queryKeys(q: K, maxDist: number, limit: number, acc?: K[]): K[] {
		return this.tree.queryKeys(q, maxDist, limit, acc);
	}

	queryValues(q: K, maxDist: number, limit: number, acc?: K[]): K[] {
		return this.tree.queryKeys(q, maxDist, limit, acc);
	}
}
