import type { Fn, IEmpty, Predicate2 } from "@thi.ng/api";
import type { INeighborhood } from "@thi.ng/distance";
import { assert } from "@thi.ng/errors/assert";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { equals } from "@thi.ng/vectors/equals";
import { hash2, hash3 } from "@thi.ng/vectors/hash";

export interface QueryNeighborhoodOpts {
	/**
	 * Normally the search radius for checking grid cells will be obtained from
	 * the given neighborhood, however this can be overridden via this option.
	 */
	r: number;
}

/**
 * Abstract base class for an spatially unbounded hash grid. Conceptually
 * similar to {@link ASpatialGrid}, but using a more efficient internal data
 * storage and different query API using [neighborhoods]() (also see
 * {@link AHashGrid#queryNeighborhood}). Does not support incremental indexing
 * or removal of individual items.
 *
 * @remarks
 * Grid data structure based on:
 * - https://matthias-research.github.io/pages/tenMinutePhysics/11-hashing.pdf
 */
export abstract class AHashGrid<T> {
	invSize: number;
	tableSize: number;
	keyFn: Fn<T, ReadonlyVec>;
	indices: Uint32Array;
	entries: Uint32Array;
	items!: T[];

	constructor(
		key: Fn<T, ReadonlyVec>,
		cellSize: number,
		capacity: number,
		items?: T[]
	) {
		this.invSize = 1 / cellSize;
		this.tableSize = capacity << 1;
		this.indices = new Uint32Array(this.tableSize + 1);
		this.entries = new Uint32Array(capacity);
		this.keyFn = key;
		items ? this.build(items) : (this.items = []);
	}

	get length() {
		return this.items.length;
	}

	clear() {
		this.items = [];
		this.indices.fill(0);
		this.entries.fill(0);
	}

	/**
	 * Computes number of hash collisions and max cell occupancy.
	 */
	stats() {
		const { indices, items, keyFn } = this;
		const bins = new Uint32Array(indices.length);
		let max = 0;
		let collisions = 0;
		const numP = items.length;
		for (let i = 0; i < numP; i++) {
			const n = ++bins[this.hashPos(keyFn(items[i]))];
			if (n > 1) collisions++;
			max = Math.max(max, n);
		}
		return { collisions, max };
	}

	/**
	 * (Re)builds the hash grid from given items. All previous contents will be
	 * lost! `items` must be less than max. capacity configured via ctor.
	 *
	 * @param items
	 */
	build(items: T[]) {
		const { entries, indices, keyFn, tableSize } = this;
		const num = items.length;
		assert(items.length <= entries.length, `too many items`);
		this.items = items;
		indices.fill(0);
		entries.fill(0);

		for (let i = 0; i < num; i++) {
			indices[this.hashPos(keyFn(items[i]))]++;
		}

		let prefixSum = 0;
		for (let i = 0; i < tableSize; i++) {
			prefixSum += indices[i];
			indices[i] = prefixSum;
		}
		indices[tableSize] = prefixSum;

		for (let i = 0; i < num; i++) {
			entries[--indices[this.hashPos(keyFn(items[i]))]] = i;
		}
	}

	/**
	 * Returns true if an item with given `key` vector has been indexed by the
	 * hash grid. The optional `equiv` predicate can be used to customize the
	 * key equality test (called for all items matching the `keys` hash).
	 *
	 * @remarks
	 * Default predicate is: [thi.ng/vectors
	 * equals()](https://docs.thi.ng/umbrella/vectors/functions/equals.html)
	 *
	 * @param key
	 * @param equiv
	 */
	has(key: ReadonlyVec, equiv: Predicate2<ReadonlyVec> = equals) {
		const { entries, indices, items, keyFn } = this;
		const h = this.hashPos(key);
		for (let i = indices[h], j = indices[h + 1]; i < j; i++) {
			if (equiv(keyFn(items[entries[i]]), key)) return true;
		}
		return false;
	}

	/**
	 * Returns array of all items (if any) which have been indexed using given
	 * lookup `key` AND which are passing the given `equiv` predicate (which can
	 * be used to customize the key equality test).
	 *
	 * @remarks
	 * Default predicate is: [thi.ng/vectors
	 * equals()](https://docs.thi.ng/umbrella/vectors/functions/equals.html)
	 *
	 * @param key
	 * @param equiv
	 */
	get(key: ReadonlyVec, equiv: Predicate2<ReadonlyVec> = equals) {
		const { entries, indices, items, keyFn } = this;
		const h = this.hashPos(key);
		const res: T[] = [];
		for (let i = indices[h], j = indices[h + 1]; i < j; i++) {
			const val = items[entries[i]];
			if (equiv(keyFn(val), key)) res.push(val);
		}
		return res;
	}

	/**
	 * Queries grid using provided
	 * [`INeighborhood`](https://docs.thi.ng/umbrella/distance/interfaces/INeighborhood.html)
	 * implementation. Returns neighborhood.
	 *
	 * @example
	 * ```ts
	 * import { knearest2 } from "@thi.ng/distance";
	 * import { HashGrid2 } from "@thi.ng/geom-accel";
	 * import { repeatedly } from "@thi.ng/transducers";
	 * import { random2, type ReadonlyVec } from "@thi.ng/vectors";
	 *
	 * // generate 1000 random points in [-500..500) interval
	 * const pts = [...repeatedly(() => random2([], -500, 500), 1000)];
	 *
	 * // create hash grid with cell size 16 and index all points
	 * // (since indexed items are just points key function is identity)
	 * const grid = new HashGrid2<ReadonlyVec>((p) => p, 16, pts.length, pts);
	 *
	 * // perform k-nearest neighbor search around origin (k=5, radius=200)
	 * grid.queryNeighborhood(knearest2([0, 0], 5, 200)).values();
	 * // [-12.65, 26.19]
	 * // [1.94, 28.09]
	 * // [-17.49, -8.76]
	 * // [-14.55, 8.17]
	 * // [8.09, 17.47]
	 * ```
	 *
	 * @param neighborhood
	 */
	abstract queryNeighborhood<N extends INeighborhood<ReadonlyVec, T>>(
		neighborhood: N,
		opts?: Partial<QueryNeighborhoodOpts>
	): N;

	/**
	 * Returns true if any of the indexed items are located within the given
	 * `neighborhood`.
	 *
	 * @remarks
	 * This method is much faster than {@link AHashGrid.queryNeighborhood} if
	 * one only wants to check if items are present in given region. The method
	 * returns as soon as a positive result is found.
	 *
	 * @param neighborhood
	 * @param opts
	 */
	abstract hasNeighborhood<N extends INeighborhood<ReadonlyVec, T>>(
		neighborhood: N,
		opts?: Partial<QueryNeighborhoodOpts>
	): boolean;

	abstract hashPos(p: ReadonlyVec): number;
}

/**
 * 2D implementation of {@link AHashGrid}.
 */
export class HashGrid2<T> extends AHashGrid<T> implements IEmpty<HashGrid2<T>> {
	empty() {
		return new HashGrid2<T>(
			this.keyFn,
			1 / this.invSize,
			this.entries.length
		);
	}

	queryNeighborhood<N extends INeighborhood<ReadonlyVec, T>>(
		neighborhood: N,
		opts: Partial<QueryNeighborhoodOpts> = {}
	) {
		const { entries, indices, items, keyFn, tableSize } = this;
		const { xmin, xmax, ymin, ymax } = this.queryBounds(neighborhood, opts);
		for (let x = xmin; x <= xmax; x++) {
			for (let y = ymin; y <= ymax; y++) {
				const h = hash2(x, y) % tableSize;
				for (let i = indices[h], j = indices[h + 1]; i < j; i++) {
					const val = items[entries[i]];
					neighborhood.consider(keyFn(val), val);
				}
			}
		}
		return neighborhood;
	}

	hasNeighborhood<N extends INeighborhood<ReadonlyVec, T>>(
		neighborhood: N,
		opts: Partial<QueryNeighborhoodOpts> = {}
	) {
		const { entries, indices, items, keyFn, tableSize } = this;
		const { xmin, xmax, ymin, ymax } = this.queryBounds(neighborhood, opts);
		for (let x = xmin; x <= xmax; x++) {
			for (let y = ymin; y <= ymax; y++) {
				const h = hash2(x, y) % tableSize;
				for (let i = indices[h], j = indices[h + 1]; i < j; i++) {
					if (neighborhood.includesPosition(keyFn(items[entries[i]])))
						return true;
				}
			}
		}
		return false;
	}

	hashPos(p: ReadonlyVec) {
		const s = this.invSize;
		return hash2(p[0] * s, p[1] * s) % this.tableSize;
	}

	protected queryBounds<N extends INeighborhood<ReadonlyVec, T>>(
		neighborhood: N,
		opts: Partial<QueryNeighborhoodOpts> = {}
	) {
		const { invSize } = this;
		const [qx, qy] = neighborhood.target;
		const r = opts.r ?? neighborhood.radius;
		return {
			xmin: ((qx - r) * invSize) | 0,
			xmax: ((qx + r) * invSize) | 0,
			ymin: ((qy - r) * invSize) | 0,
			ymax: ((qy + r) * invSize) | 0,
		};
	}
}

/**
 * 3D implementation of {@link AHashGrid}.
 */
export class HashGrid3<T> extends AHashGrid<T> implements IEmpty<HashGrid3<T>> {
	empty() {
		return new HashGrid3<T>(
			this.keyFn,
			1 / this.invSize,
			this.entries.length
		);
	}

	queryNeighborhood<N extends INeighborhood<ReadonlyVec, T>>(
		neighborhood: N,
		opts: Partial<QueryNeighborhoodOpts> = {}
	) {
		const { entries, indices, items, keyFn, tableSize } = this;
		const { xmin, xmax, ymin, ymax, zmin, zmax } = this.queryBounds(
			neighborhood,
			opts
		);
		for (let x = xmin; x <= xmax; x++) {
			for (let y = ymin; y <= ymax; y++) {
				for (let z = zmin; z <= zmax; z++) {
					const h = hash3(x, y, z) % tableSize;
					for (let i = indices[h], j = indices[h + 1]; i < j; i++) {
						const val = items[entries[i]];
						neighborhood.consider(keyFn(val), val);
					}
				}
			}
		}
		return neighborhood;
	}

	hasNeighborhood<N extends INeighborhood<ReadonlyVec, T>>(
		neighborhood: N,
		opts: Partial<QueryNeighborhoodOpts> = {}
	) {
		const { entries, indices, items, keyFn, tableSize } = this;
		const { xmin, xmax, ymin, ymax, zmin, zmax } = this.queryBounds(
			neighborhood,
			opts
		);
		for (let x = xmin; x <= xmax; x++) {
			for (let y = ymin; y <= ymax; y++) {
				for (let z = zmin; z <= zmax; z++) {
					const h = hash3(x, y, z) % tableSize;
					for (let i = indices[h], j = indices[h + 1]; i < j; i++) {
						if (
							neighborhood.includesPosition(
								keyFn(items[entries[i]])
							)
						)
							return true;
					}
				}
			}
		}
		return false;
	}

	hashPos(p: ReadonlyVec) {
		const s = this.invSize;
		return hash3(p[0] * s, p[1] * s, p[2] * s) % this.tableSize;
	}

	protected queryBounds<N extends INeighborhood<ReadonlyVec, T>>(
		neighborhood: N,
		opts: Partial<QueryNeighborhoodOpts> = {}
	) {
		const { invSize } = this;
		const [qx, qy, qz] = neighborhood.target;
		const r = opts.r ?? neighborhood.radius;
		return {
			xmin: ((qx - r) * invSize) | 0,
			xmax: ((qx + r) * invSize) | 0,
			ymin: ((qy - r) * invSize) | 0,
			ymax: ((qy + r) * invSize) | 0,
			zmin: ((qz - r) * invSize) | 0,
			zmax: ((qz + r) * invSize) | 0,
		};
	}
}
