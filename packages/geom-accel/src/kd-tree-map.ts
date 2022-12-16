import type { Fn, ICopy, IEmpty, Pair } from "@thi.ng/api";
import { ensureArray } from "@thi.ng/arrays/ensure-array";
import type { IRegionQuery, ISpatialMap } from "@thi.ng/geom-api";
import { Heap } from "@thi.ng/heaps/heap";
import { EPS } from "@thi.ng/math/api";
import { map } from "@thi.ng/transducers/map";
import type { DistanceFn, ReadonlyVec, Vec } from "@thi.ng/vectors";
import { distSq } from "@thi.ng/vectors/distsq";
import { addResults, CMP, into } from "./utils.js";

type MaybeKdNode<K extends ReadonlyVec, V> = KdNode<K, V> | undefined;

export class KdNode<K extends ReadonlyVec, V> {
	d: number;
	parent?: KdNode<K, V>;
	l?: KdNode<K, V>;
	r?: KdNode<K, V>;
	k: K;
	v: V;

	constructor(parent: MaybeKdNode<K, V>, dim: number, key: K, val: V) {
		this.parent = parent;
		this.d = dim;
		this.k = key;
		this.v = val;
	}

	get height(): number {
		return (
			1 + Math.max(this.l ? this.l.height : 0, this.r ? this.r.height : 0)
		);
	}
}

/**
 * https://en.wikipedia.org/wiki/K-d_tree
 *
 * Partially based on:
 * https://github.com/ubilabs/kd-tree-javascript
 *
 */
export class KdTreeMap<K extends ReadonlyVec, V>
	implements
		ICopy<KdTreeMap<K, V>>,
		IEmpty<KdTreeMap<K, V>>,
		IRegionQuery<K, V, number>,
		ISpatialMap<K, V>
{
	readonly dim: number;

	protected root: MaybeKdNode<K, V>;
	protected _size: number;

	constructor(
		dim: number,
		pairs?: Iterable<Pair<K, V>>,
		public readonly distanceFn: DistanceFn = distSq
	) {
		this.dim = dim;
		this._size = 0;
		this.root = pairs ? this.buildTree(ensureArray(pairs), 0) : undefined;
	}

	*[Symbol.iterator]() {
		let queue: MaybeKdNode<K, V>[] = this.root ? [this.root] : [];
		while (queue.length) {
			const n = queue.pop();
			if (n) {
				yield <Pair<K, V>>[n.k, n.v];
				queue.push(n.r, n.l);
			}
		}
	}

	*keys() {
		let queue: MaybeKdNode<K, V>[] = this.root ? [this.root] : [];
		while (queue.length) {
			const n = queue.pop();
			if (n) {
				yield n.k;
				queue.push(n.r, n.l);
			}
		}
	}

	values() {
		return map((p) => p[1], this);
	}

	get size() {
		return this._size;
	}

	get height() {
		return this.root ? this.root.height : 0;
	}

	get ratio() {
		return this._size ? this.height / Math.log2(this._size) : 0;
	}

	copy() {
		return new KdTreeMap(this.dim, this, this.distanceFn);
	}

	clear() {
		delete this.root;
		this._size = 0;
	}

	empty() {
		return new KdTreeMap<K, V>(this.dim, undefined, this.distanceFn);
	}

	set(key: K, val: V, eps = EPS) {
		eps = Math.max(0, eps);
		eps *= eps;
		const search = (
			node: MaybeKdNode<K, V>,
			parent: MaybeKdNode<K, V>
		): MaybeKdNode<K, V> =>
			node
				? search(key[node.d] < node.k[node.d] ? node.l : node.r, node)
				: parent;
		let parent: MaybeKdNode<K, V>;
		if (this.root) {
			parent = nearest1(
				key,
				[eps, undefined],
				this.dim,
				this.root,
				this.distanceFn
			)[1];
			if (parent) {
				parent.v = val;
				return false;
			}
			parent = search(this.root, undefined)!;
			const dim = parent.d;
			parent[key[dim] < parent.k[dim] ? "l" : "r"] = new KdNode<K, V>(
				parent,
				(dim + 1) % this.dim,
				key,
				val
			);
		} else {
			this.root = new KdNode<K, V>(undefined, 0, key, val);
		}
		this._size++;
		return true;
	}

	into(pairs: Iterable<Pair<K, V>>, eps = EPS) {
		return into(this, pairs, eps);
	}

	remove(key: K) {
		const node = find(key, this.root, 0);
		if (node) {
			remove(node) && (this.root = undefined);
			this._size--;
			return true;
		}
		return false;
	}

	has(key: K, eps = EPS) {
		return (
			!!this.root &&
			!!nearest1(
				key,
				[eps * eps, undefined],
				this.dim,
				this.root,
				this.distanceFn
			)[1]
		);
	}

	get(key: K, eps = EPS) {
		if (this.root) {
			const node = nearest1(
				key,
				[eps * eps, undefined],
				this.dim,
				this.root,
				this.distanceFn
			)[1];
			return node ? node.v : undefined;
		}
	}

	query(
		q: K,
		maxDist: number,
		limit?: number,
		acc?: Pair<K, V>[]
	): Pair<K, V>[] {
		return this.doSelect(q, (x) => [x.k, x.v], maxDist, limit, acc);
	}

	queryKeys(q: K, maxDist: number, limit?: number, acc?: K[]): K[] {
		return this.doSelect(q, (x) => x.k, maxDist, limit, acc);
	}

	queryValues(q: K, maxDist: number, limit?: number, acc?: V[]): V[] {
		return this.doSelect(q, (x) => x.v, maxDist, limit, acc);
	}

	protected doSelect<T>(
		q: K,
		f: Fn<KdNode<K, V>, T>,
		maxDist: number,
		maxNum = 1,
		acc: T[] = []
	): T[] {
		if (!this.root) return [];
		maxDist *= maxDist;
		if (maxNum === 1) {
			const sel = nearest1(
				q,
				[maxDist, undefined],
				this.dim,
				this.root,
				this.distanceFn
			)[1];
			sel && acc.push(f(sel));
		} else {
			const nodes = new Heap<[number, MaybeKdNode<K, V>]>(
				[[maxDist, undefined]],
				{
					compare: CMP,
				}
			);
			nearest(q, nodes, this.dim, maxNum, this.root!, this.distanceFn);
			return addResults(f, nodes.values, acc);
		}
		return acc;
	}

	protected buildTree(
		points: Pair<K, V>[],
		depth: number,
		parent?: KdNode<K, V>
	) {
		const n = points.length;
		if (n === 0) {
			return;
		}
		this._size++;
		let dim = depth % this.dim;
		if (n === 1) {
			return new KdNode<K, V>(parent, dim, ...points[0]);
		}
		points.sort((a, b) => a[0][dim] - b[0][dim]);
		const med = n >>> 1;
		const node = new KdNode<K, V>(parent, dim, ...points[med]);
		node.l = this.buildTree(points.slice(0, med), depth + 1, node);
		node.r = this.buildTree(points.slice(med + 1), depth + 1, node);
		return node;
	}
}

/**
 * Returns node for point or `undefined` if none found.
 *
 * @param p - point
 * @param node - tree node
 * @param epsSq - squared epsilon / tolerance
 */
const find = <K extends ReadonlyVec, V>(
	p: K,
	node: MaybeKdNode<K, V>,
	epsSq: number
): KdNode<K, V> | undefined => {
	if (!node) return;
	return distSq(p, node.k) <= epsSq
		? node
		: find(p, p[node.d] < node.k[node.d] ? node.l : node.r, epsSq);
};

const findMin = <K extends ReadonlyVec, V>(
	node: MaybeKdNode<K, V>,
	dim: number
): MaybeKdNode<K, V> => {
	if (!node) return;
	if (node.d === dim) {
		return node.l ? findMin(node.l, dim) : node;
	}
	const q = node.k[dim];
	const l = findMin(node.l, dim);
	const r = findMin(node.r, dim);
	let min = node;
	if (l && l.k[dim] < q) {
		min = l;
	}
	if (r && r.k[dim] < min.k[dim]) {
		min = r;
	}
	return min;
};

/**
 * Returns true if root is to be deleted.
 *
 * @param node - tree node
 */
const remove = <K extends ReadonlyVec, V>(node: KdNode<K, V>) => {
	if (!node.l && !node.r) {
		if (!node.parent) {
			return true;
		}
		const parent = node.parent;
		const pdim = parent.d;
		parent[node.k[pdim] < parent.k[pdim] ? "l" : "r"] = undefined;
		return;
	}
	let next: MaybeKdNode<K, V>;
	let nextP: K;
	if (node.r) {
		next = findMin(node.r, node.d)!;
		nextP = next.k;
		remove(next);
		node.k = nextP;
	} else {
		next = findMin(node.l, node.d)!;
		nextP = next.k;
		remove(next);
		node.r = node.l;
		node.l = undefined;
		node.k = nextP;
	}
};

const nearest = <K extends ReadonlyVec, V>(
	q: K,
	acc: Heap<[number, MaybeKdNode<K, V>]>,
	dims: number,
	maxNum: number,
	node: KdNode<K, V>,
	distFn: DistanceFn
) => {
	const p = node.k;
	const ndist = distSq(p, q);
	if (!node.l && !node.r) {
		collect(acc, maxNum, node, ndist);
		return;
	}
	const tdist = nodeDist(node, dims, q, p, distFn);
	let best = bestChild(node, q);
	nearest(q, acc, dims, maxNum, best!, distFn);
	collect(acc, maxNum, node, ndist);
	if (tdist < acc.values[0][0]) {
		best = best === node.l ? node.r : node.l;
		best && nearest(q, acc, dims, maxNum, best, distFn);
	}
};

/**
 * Optimized version of {@link nearest} for single closest point search.
 *
 * @param q - search point
 * @param acc - accumulator
 * @param dims - dimensions
 * @param node - tree node
 */
const nearest1 = <K extends ReadonlyVec, V>(
	q: K,
	acc: [number, MaybeKdNode<K, V>],
	dims: number,
	node: KdNode<K, V>,
	distFn: DistanceFn
): [number, MaybeKdNode<K, V>] => {
	const p = node.k;
	const ndist = distFn(p, q);
	if (!node.l && !node.r) {
		collect1(acc, node, ndist);
		return acc;
	}
	const tdist = nodeDist(node, dims, q, p, distFn);
	let best = bestChild(node, q);
	nearest1(q, acc, dims, best!, distFn);
	collect1(acc, node, ndist);
	if (tdist < acc[0]) {
		best = best === node.l ? node.r : node.l;
		best && nearest1(q, acc, dims, best, distFn);
	}
	return acc;
};

const bestChild = <K extends ReadonlyVec, V>(node: KdNode<K, V>, q: K) => {
	const d = node.d;
	return !node.r
		? node.l
		: !node.l
		? node.r
		: q[d] < node.k[d]
		? node.l
		: node.r;
};

const collect = <K extends ReadonlyVec, V>(
	acc: Heap<[number, MaybeKdNode<K, V>]>,
	maxNum: number,
	node: KdNode<K, V>,
	ndist: number
) =>
	(!acc.length || ndist < acc.peek()![0]) &&
	(acc.length >= maxNum
		? acc.pushPop([ndist, node])
		: acc.push([ndist, node]));

const collect1 = <K extends ReadonlyVec, V>(
	acc: [number, MaybeKdNode<K, V>],
	node: KdNode<K, V>,
	ndist: number
) => ndist < acc[0] && ((acc[0] = ndist), (acc[1] = node));

const TMP: Vec = [];

const nodeDist = <K extends ReadonlyVec, V>(
	node: KdNode<K, V>,
	dims: number,
	q: K,
	p: K,
	distFn: DistanceFn
) => {
	for (let i = dims, d = node.d; i-- > 0; ) {
		TMP[i] = i === d ? q[i] : p[i];
	}
	return distFn(TMP, p);
};
