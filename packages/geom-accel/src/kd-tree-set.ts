import type { ICopy, IEmpty, Pair } from "@thi.ng/api";
import type { IRegionQuery, ISpatialSet } from "@thi.ng/geom-api";
import type { DistanceFn, ReadonlyVec } from "@thi.ng/vectors";
import { KdTreeMap } from "./kd-tree-map.js";

export class KdTreeSet<K extends ReadonlyVec>
	implements
		ICopy<KdTreeSet<K>>,
		IEmpty<KdTreeSet<K>>,
		IRegionQuery<K, K, number>,
		ISpatialSet<K>
{
	protected tree: KdTreeMap<K, K>;

	constructor(dim: number, keys?: Iterable<K>, distanceFn?: DistanceFn) {
		this.tree = new KdTreeMap(dim, undefined, distanceFn);
		keys && this.into(keys);
	}

	[Symbol.iterator]() {
		return this.tree.keys();
	}

	keys() {
		return this.tree.keys();
	}

	values() {
		return this.tree.keys();
	}

	get size() {
		return this.tree.size;
	}

	get height() {
		return this.tree.height;
	}

	get ratio() {
		return this.tree.ratio;
	}

	copy() {
		return new KdTreeSet<K>(this.tree.dim, this, this.tree.distanceFn);
	}

	clear() {
		this.tree.clear();
	}

	empty() {
		return new KdTreeSet<K>(this.tree.dim, undefined, this.tree.distanceFn);
	}

	add(key: K, eps?: number) {
		return this.tree.set(key, key, eps);
	}

	into(ks: Iterable<K>, eps?: number) {
		let ok = true;
		for (let k of ks) {
			ok = this.tree.set(k, k, eps) && ok;
		}
		return ok;
	}

	remove(key: K) {
		return this.tree.remove(key);
	}

	has(key: K, eps?: number) {
		return this.tree.has(key, eps);
	}

	get(key: K, eps?: number) {
		return this.tree.get(key, eps);
	}

	query(q: K, maxDist: number, limit?: number, acc?: Pair<K, K>[]) {
		return this.tree.query(q, maxDist, limit, acc);
	}

	queryKeys(q: K, maxDist: number, limit?: number, acc?: K[]) {
		return this.tree.queryKeys(q, maxDist, limit, acc);
	}

	queryValues(q: K, maxDist: number, limit?: number, acc?: K[]) {
		return this.tree.queryKeys(q, maxDist, limit, acc);
	}
}
