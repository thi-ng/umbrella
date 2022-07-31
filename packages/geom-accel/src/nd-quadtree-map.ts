import type { Fn, ICopy, IEmpty, Pair } from "@thi.ng/api";
import { equivArrayLike } from "@thi.ng/equiv";
import { assert } from "@thi.ng/errors/assert";
import type { IRegionQuery, ISpatialMap } from "@thi.ng/geom-api";
import { pointInCenteredBox } from "@thi.ng/geom-isec/point";
import { testCenteredBoxSphere } from "@thi.ng/geom-isec/rect-circle";
import { Heap } from "@thi.ng/heaps/heap";
import { EPS } from "@thi.ng/math/api";
import { iterate } from "@thi.ng/transducers/iterate";
import { map } from "@thi.ng/transducers/map";
import { permutations } from "@thi.ng/transducers/permutations";
import { repeat } from "@thi.ng/transducers/repeat";
import { take } from "@thi.ng/transducers/take";
import type { DistanceFn, MultiVecOpRoVV, ReadonlyVec } from "@thi.ng/vectors";
import { addmN } from "@thi.ng/vectors/addmn";
import { distSq } from "@thi.ng/vectors/distsq";
import { madd } from "@thi.ng/vectors/madd";
import { mulN } from "@thi.ng/vectors/muln";
import { submN } from "@thi.ng/vectors/submn";
import { vop } from "@thi.ng/vectors/vop";
import { addResults, CMP, into } from "./utils.js";

export class NdQtNode<K extends ReadonlyVec, V> {
	pos: ReadonlyVec;
	ext: ReadonlyVec;
	parent?: NdQtNode<K, V>;
	children?: NdQtNode<K, V>[];
	numC: number;
	k?: K;
	v?: V;

	constructor(
		parent: NdQtNode<K, V> | undefined,
		pos: ReadonlyVec,
		ext: ReadonlyVec
	) {
		this.parent = parent;
		this.pos = pos;
		this.ext = ext;
		this.numC = 0;
	}

	clear() {
		delete this.children;
		delete this.k;
		delete this.v;
		this.numC = 0;
	}

	set(p: K, val: V, eps: number, distFn: DistanceFn): boolean {
		return (
			(eps <= 0 || !this.queryKeys(p, eps, 1, [], distFn).length) &&
			this.containsPoint(p) &&
			this.setUnsafe(p, val)
		);
	}

	setUnsafe(p: K, val: V): boolean {
		if (this.k) {
			if (equivArrayLike(this.k, p)) {
				this.v = val;
				return false;
			}
			this.ensureChild(childID(this.k, this.pos)).setUnsafe(
				this.k,
				this.v!
			);
			delete this.k;
			delete this.v;
		}
		if (this.children) {
			return this.ensureChild(childID(p, this.pos)).setUnsafe(p, val);
		} else {
			this.k = p;
			this.v = val;
		}
		return true;
	}

	query<T>(
		fn: Fn<NdQtNode<K, V>, T>,
		p: K,
		r: number,
		max: number,
		acc: T[],
		distFn: DistanceFn
	) {
		return addResults(
			fn,
			this.doQuery(
				p,
				r,
				max,
				new Heap<[number, NdQtNode<K, V>?]>([[r * r]], {
					compare: CMP,
				}),
				distFn
			).values,
			acc
		);
	}

	queryKeys(p: K, r: number, max: number, acc: K[], distFn: DistanceFn): K[] {
		return this.query((n) => <K>n.k, p, r, max, acc, distFn);
	}

	queryValues(
		p: K,
		r: number,
		max: number,
		acc: V[],
		distFn: DistanceFn
	): V[] {
		return this.query((n) => <V>n.v, p, r, max, acc, distFn);
	}

	containsPoint(p: K) {
		return pointInCenteredBox(p, this.pos, this.ext);
	}

	nodeForPoint(p: K): NdQtNode<K, V> | undefined {
		if (this.k && equivArrayLike(this.k, p)) {
			return this;
		}
		if (this.children) {
			const child = this.children[childID(p, this.pos)];
			return child ? child.nodeForPoint(p) : undefined;
		}
	}

	protected doQuery(
		p: K,
		r: number,
		max: number,
		acc: Heap<[number, NdQtNode<K, V>?]>,
		distFn: DistanceFn
	): Heap<[number, NdQtNode<K, V>?]> {
		if (testCenteredBoxSphere(this.pos, this.ext, p, r)) {
			if (this.k) {
				const d = distFn(this.k, p);
				if (d <= acc.values[0][0]) {
					acc.length >= max
						? acc.pushPop([d, this])
						: acc.push([d, this]);
				}
			} else if (this.children) {
				for (
					let i = MAX_CHILDREN[this.pos.length], j = this.numC;
					i-- > 0 && j > 0;

				) {
					if (this.children[i]) {
						this.children[i].doQuery(p, r, max, acc, distFn);
						j--;
					}
				}
			}
		}
		return acc;
	}

	protected ensureChild(id: number) {
		!this.children && (this.children = []);
		let c = this.children[id];
		if (!c) {
			const csize = mulN([], this.ext, 0.5);
			this.children[id] = c = new NdQtNode(
				this,
				madd([], csize, CHILD_OFFSETS[csize.length][id], this.pos),
				csize
			);
			this.numC++;
		}
		return c;
	}
}

/**
 * Point-based quadtree for nD keys and optional value association.
 * Supports radial range queries and key removal with tree pruning. See
 * {@link ndQuadtreeFromMinMax}.
 *
 * @remarks
 * Partially ported from Clojure version of {@link http://thi.ng/geom}.
 */
export class NdQuadtreeMap<K extends ReadonlyVec, V>
	implements
		ICopy<NdQuadtreeMap<K, V>>,
		IEmpty<NdQuadtreeMap<K, V>>,
		IRegionQuery<K, V, number>,
		ISpatialMap<K, V>
{
	static readonly MAX_DIM = 16;

	/**
	 * Returns a new point-based `NdQuadtreeMap` for nD keys in given
	 * region defined by `min` / `max` coordinates. The dimensionality
	 * of the tree is implicitly defined by the provided coordinates.
	 * Only points within that region can be indexed.
	 *
	 * @remarks
	 * Due to exponentially growing lookup tables, currently only
	 * supports up to 16 dimensions.
	 */
	static fromMinMax<K extends ReadonlyVec, V>(
		min: ReadonlyVec,
		max: ReadonlyVec
	) {
		return new NdQuadtreeMap<K, V>(
			addmN([], min, max, 0.5),
			submN([], max, min, 0.5)
		);
	}

	root: NdQtNode<K, V>;
	protected _size: number;

	constructor(
		pos: ReadonlyVec,
		ext: ReadonlyVec,
		pairs?: Iterable<Pair<K, V>>,
		public readonly distanceFn: DistanceFn = distSq
	) {
		const dim = pos.length;
		assert(
			dim > 0 && dim <= NdQuadtreeMap.MAX_DIM,
			`illegal dimension: ${dim}`
		);
		assert(ext.length === dim, `pos/ext dimensions must be equal`);
		initChildOffsets(dim);
		this.root = new NdQtNode(undefined, pos, ext);
		this._size = 0;
		pairs && this.into(pairs, -1);
	}

	get size() {
		return this._size;
	}

	[Symbol.iterator](): IterableIterator<Pair<K, V>> {
		return map((n) => [n.k!, n.v!], this.nodes());
	}

	keys() {
		return map((n) => <K>n.k, this.nodes());
	}

	values() {
		return map((n) => <V>n.v, this.nodes());
	}

	*nodes(all = false) {
		let queue: NdQtNode<K, V>[] = [this.root];
		while (queue.length) {
			const n = queue.pop();
			if (n) {
				if (all || n.k) yield n;
				if (n.children) queue = queue.concat(n.children);
			}
		}
	}

	copy(): NdQuadtreeMap<K, V> {
		const tree = new NdQuadtreeMap<K, V>(
			this.root.pos,
			this.root.ext,
			this,
			this.distanceFn
		);
		return tree;
	}

	clear() {
		this.root.clear();
		this._size = 0;
	}

	empty() {
		return new NdQuadtreeMap<K, V>(
			this.root.pos,
			this.root.ext,
			undefined,
			this.distanceFn
		);
	}

	set(key: K, val: V, eps = EPS) {
		if (this.root.set(key, val, eps, this.distanceFn)) {
			this._size++;
			return true;
		}
		return false;
	}

	into(pairs: Iterable<Pair<K, V>>, eps = EPS) {
		return into(this, pairs, eps);
	}

	remove(p: K) {
		let node = this.root.nodeForPoint(p);
		if (!node) return false;
		this._size--;
		delete node.k;
		delete node.v;
		let doPrune = true;
		while (node.parent) {
			node = node!.parent;
			delete node.children![childID(p, node.pos)];
			doPrune = --node.numC === 0;
			if (doPrune) delete node.children;
			else break;
		}
		return true;
	}

	has(p: K, eps = EPS) {
		return !!(eps <= 0
			? this.root.nodeForPoint(p)
			: this.root.queryKeys(p, eps, 1, [], this.distanceFn).length);
	}

	get(p: K, eps = EPS) {
		if (eps <= 0) {
			const node = this.root.nodeForPoint(p);
			return node ? node.v : undefined;
		}
		return this.root.queryValues(p, eps, 1, [], this.distanceFn)[0];
	}

	query(p: K, r: number, max = 1, acc: Pair<K, V>[] = []) {
		return this.root.query(
			(n) => <Pair<K, V>>[n.k, n.v],
			p,
			r,
			max,
			acc,
			this.distanceFn
		);
	}

	queryKeys(p: K, r: number, max = 1, acc: K[] = []) {
		return this.root.queryKeys(p, r, max, acc, this.distanceFn);
	}

	queryValues(p: K, r: number, max = 1, acc: V[] = []) {
		return this.root.queryValues(p, r, max, acc, this.distanceFn);
	}

	containsPoint(p: K) {
		return this.root.containsPoint(p);
	}

	nodeForPoint(p: K): NdQtNode<K, V> | undefined {
		return this.root.nodeForPoint(p);
	}
}

const MAX_CHILDREN = [
	...take(
		NdQuadtreeMap.MAX_DIM + 1,
		iterate((x) => x * 2, 1)
	),
];

const CHILD_OFFSETS: ReadonlyVec[][] = [];

const initChildOffsets = (dim: number) =>
	CHILD_OFFSETS[dim] ||
	(CHILD_OFFSETS[dim] = [...permutations(...repeat([-1, 1], dim))]);

const childID: MultiVecOpRoVV<number> = vop(0);
childID.add(1, (p, q) => (p[0] >= q[0] ? 1 : 0));
childID.add(2, (p, q) => (p[0] >= q[0] ? 2 : 0) | (p[1] >= q[1] ? 1 : 0));
childID.add(
	3,
	(p, q) =>
		(p[0] >= q[0] ? 4 : 0) | (p[1] >= q[1] ? 2 : 0) | (p[2] >= q[2] ? 1 : 0)
);
childID.add(
	4,
	(p, q) =>
		(p[0] >= q[0] ? 8 : 0) |
		(p[1] >= q[1] ? 4 : 0) |
		(p[2] >= q[2] ? 2 : 0) |
		(p[3] >= q[3] ? 1 : 0)
);
childID.default((p, q) => {
	let id = 0;
	for (let i = 0, n = p.length - 1, bit = 1 << n; i <= n; i++, bit >>>= 1) {
		p[i] >= q[i] && (id += bit);
	}
	return id;
});
