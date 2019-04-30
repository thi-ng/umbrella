import {
    Fn3,
    IEquiv,
    Pair,
    UIntArray
} from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks";
import { illegalArgs } from "@thi.ng/errors";
import { IEquivSet } from "./api";

interface SparseSetProps {
    dense: UIntArray;
    sparse: UIntArray;
    n: number;
}

const __private = new WeakMap<ASparseSet<any>, SparseSetProps>();

const fail = () => illegalArgs(`dense & sparse arrays must be of same size`);

/**
 * After "An Efficient Representation for Sparse Sets"
 * Preston Briggs and Linda Torczon (1993)
 *
 * https://research.swtch.com/sparse
 * https://programmingpraxis.com/2012/03/09/sparse-sets/
 * https://blog.molecular-matters.com/2013/07/24/adventures-in-data-oriented-design-part-3c-external-references/
 */
export abstract class ASparseSet<T extends UIntArray> extends Set<number>
    implements IEquiv {
    protected constructor(dense: T, sparse: T) {
        super();
        __private.set(this, { dense, sparse, n: 0 });
    }

    [Symbol.iterator]() {
        return this.keys();
    }

    get size() {
        return __private.get(this).n;
    }

    get capacity() {
        return __private.get(this).dense.length;
    }

    clear() {
        __private.get(this).n = 0;
    }

    equiv(o: any) {
        if (this === o) {
            return true;
        }
        if (!(o instanceof Set)) {
            return false;
        }
        if (this.size !== o.size) {
            return false;
        }
        const $this = __private.get(this);
        const d = $this.dense;
        for (let i = $this.n; --i >= 0; ) {
            if (!o.has(d[i])) {
                return false;
            }
        }
        return true;
    }

    add(k: number) {
        const $this = __private.get(this);
        const dense = $this.dense;
        const sparse = $this.sparse;
        const max = dense.length;
        const i = sparse[k];
        const n = $this.n;
        if (k < max && n < max && !(i < n && dense[i] === k)) {
            dense[n] = k;
            sparse[k] = n;
            $this.n++;
        }
        return this;
    }

    delete(k: number) {
        const $this = __private.get(this);
        const dense = $this.dense;
        const sparse = $this.sparse;
        const i = sparse[k];
        if (i < $this.n && dense[i] === k) {
            const j = dense[--$this.n];
            dense[i] = j;
            sparse[j] = i;
            return true;
        }
        return false;
    }

    has(k: number) {
        const $this = __private.get(this);
        const i = $this.sparse[k];
        return i < $this.n && $this.dense[i] === k;
    }

    get(k: number, notFound = -1) {
        return this.has(k) ? k : notFound;
    }

    first() {
        const $this = __private.get(this);
        return $this.n ? $this.dense[0] : undefined;
    }

    into(ks: Iterable<number>) {
        for (let k of ks) {
            this.add(k);
        }
        return this;
    }

    disj(ks: Iterable<number>) {
        for (let k of ks) {
            this.delete(k);
        }
        return this;
    }

    forEach(fn: Fn3<number, number, Set<number>, void>, thisArg?: any) {
        const $this = __private.get(this);
        const d = $this.dense;
        const n = $this.n;
        for (let i = 0; i < n; i++) {
            const v = d[i];
            fn.call(thisArg, v, v, this);
        }
    }

    *entries(): IterableIterator<Pair<number, number>> {
        const $this = __private.get(this);
        const d = $this.dense;
        const n = $this.n;
        for (let i = 0; i < n; i++) {
            yield [d[i], d[i]];
        }
    }

    *keys() {
        const $this = __private.get(this);
        const d = $this.dense;
        const n = $this.n;
        for (let i = 0; i < n; i++) {
            yield d[i];
        }
    }

    values() {
        return this.keys();
    }

    protected __copy(c: ASparseSet<T>) {
        const $this = __private.get(this);
        const $c = __private.get(c);
        $c.dense = $this.dense.slice();
        $c.sparse = $this.sparse.slice();
        $c.n = $this.n;
    }
}

export class SparseSet8 extends ASparseSet<Uint8Array>
    implements IEquivSet<number> {
    constructor(dense: Uint8Array, sparse: Uint8Array);
    constructor(n: number);
    constructor(n: number | Uint8Array, sparse?: Uint8Array) {
        isNumber(n)
            ? super(new Uint8Array(n), new Uint8Array(n))
            : n.length === sparse.length
            ? super(n, sparse)
            : fail();
    }

    get [Symbol.species]() {
        return SparseSet8;
    }

    get [Symbol.toStringTag]() {
        return "SparseSet8";
    }

    copy() {
        const c = new SparseSet8(0);
        this.__copy(c);
        return c;
    }

    empty() {
        return new SparseSet8(this.capacity);
    }
}

export class SparseSet16 extends ASparseSet<Uint16Array>
    implements IEquivSet<number> {
    constructor(dense: Uint16Array, sparse: Uint16Array);
    constructor(n: number);
    constructor(n: number | Uint16Array, sparse?: Uint16Array) {
        isNumber(n)
            ? super(new Uint16Array(n), new Uint16Array(n))
            : n.length === sparse.length
            ? super(n, sparse)
            : fail();
    }

    get [Symbol.species]() {
        return SparseSet16;
    }

    get [Symbol.toStringTag]() {
        return "SparseSet16";
    }

    copy() {
        const c = new SparseSet16(0);
        this.__copy(c);
        return c;
    }

    empty() {
        return new SparseSet16(this.capacity);
    }
}

export class SparseSet32 extends ASparseSet<Uint32Array>
    implements IEquivSet<number> {
    constructor(dense: Uint32Array, sparse: Uint32Array);
    constructor(n: number);
    constructor(n: number | Uint32Array, sparse?: Uint32Array) {
        isNumber(n)
            ? super(new Uint32Array(n), new Uint32Array(n))
            : n.length === sparse.length
            ? super(n, sparse)
            : fail();
    }

    get [Symbol.species]() {
        return SparseSet32;
    }

    get [Symbol.toStringTag]() {
        return "SparseSet32";
    }

    copy() {
        const c = new SparseSet8(0);
        this.__copy(c);
        return c;
    }

    empty() {
        return new SparseSet32(this.capacity);
    }
}
