import type {
    Comparator,
    Fn,
    IClear,
    ICopy,
    IEmpty,
    ILength,
    IStack,
    Predicate,
    Predicate2,
} from "@thi.ng/api";
import { compare } from "@thi.ng/compare/compare";
import { equiv } from "@thi.ng/equiv";
import type { HeapOpts } from "./api.js";

interface Node<T> {
    v?: T;
    c: Node<T>[];
    p?: Node<T>;
}

export const defPairingHeap = <T>(
    values?: Iterable<T> | null,
    opts?: Partial<HeapOpts<T>>
) => new PairingHeap(values, opts);

export class PairingHeap<T>
    implements
        Iterable<T>,
        IClear,
        ICopy<PairingHeap<T>>,
        IEmpty<PairingHeap<T>>,
        ILength,
        IStack<T, T, PairingHeap<T>>
{
    protected compare: Comparator<T>;
    protected equiv: Predicate2<T>;
    protected root!: Node<T>;
    protected _size!: number;

    constructor(vals?: Iterable<T> | null, opts?: Partial<HeapOpts<T>>) {
        opts = { compare, equiv, ...opts };
        this.compare = opts.compare!;
        this.equiv = opts.equiv!;
        this.clear();
        vals && this.into(vals);
    }

    get length() {
        return this._size;
    }

    *[Symbol.iterator]() {
        const acc: T[] = [];
        this.visit((x) => (acc.push(x), true));
        yield* acc;
    }

    clear() {
        this.root = { v: undefined, p: undefined, c: [] };
        this._size = 0;
    }

    empty() {
        return new PairingHeap<T>(null, { compare, equiv });
    }

    copy() {
        const heap = this.empty();
        return heap;
    }

    push(v: T) {
        this.root = this.merge(this.root, {
            v,
            p: undefined,
            c: [],
        });
        this._size++;
        return this;
    }

    pop() {
        const res = this.root.v;
        if (res !== undefined) {
            const children = this.root.c;
            if (children.length) {
                this.root = this.mergePairs(children);
            } else {
                this.root.v = undefined;
            }
            this._size--;
        }
        return res;
    }

    pushPop(x: T) {
        if (!this._size || this.compare(x, this.root.v!) < 0) {
            return x;
        }
        const res = this.pop();
        this.push(x);
        return res;
    }

    peek() {
        return this._size ? this.root.v : undefined;
    }

    into(vals: Iterable<T>) {
        for (let i of vals) {
            this.push(i);
        }
        return this;
    }

    find(val: T) {
        let found: T | undefined;
        this.visit((x) => (this.equiv(x, val) ? ((found = x), false) : true));
        return found;
    }

    findWith(fn: Predicate<T>) {
        let found: T | undefined;
        this.visit((x) => (fn(x) ? ((found = x), false) : true));
        return found;
    }

    has(val: T) {
        return this.find(val) !== undefined;
    }

    /**
     * Computes union with given heap and clears `heap`, i.e. this heap
     * will take ownership of `heap`'s items (if any).
     *
     * @param heap
     */
    meld(heap: PairingHeap<T>) {
        if (!heap._size) return this;
        if (!this._size) {
            this.root = heap.root;
            this._size = heap._size;
        } else {
            this._size += heap._size;
            this.root =
                this.compare(this.peek()!, heap.peek()!) <= 0
                    ? this.merge(this.root, heap.root)
                    : this.merge(heap.root, this.root);
        }
        heap.clear();
        return this;
    }

    visit(fn: Fn<T, boolean>) {
        this._size && this.doVisit(fn, this.root);
    }

    protected doVisit(fn: Fn<T, boolean>, root: Node<T>): boolean {
        if (fn(root.v!)) {
            const children = root.c;
            let ok = true;
            for (let i = children.length; ok && i-- > 0; ) {
                ok = this.doVisit(fn, children[i]);
            }
            return ok;
        }
        return false;
    }

    protected merge(a: Node<T>, b: Node<T>) {
        if (a.v === undefined) {
            return b;
        }
        if (this.compare(a.v, b.v!) < 0) {
            a.c.push(b);
            b.p = a;
            return a;
        }
        b.c.push(a);
        a.p = b;
        return b;
    }

    protected mergePairs(heaps: Node<T>[]) {
        const n = heaps.length - 1;
        let root = heaps[n];
        if (n > 0) {
            for (let i = n; i-- > 0; ) {
                root = this.merge(root, heaps[i]);
            }
        }
        root.p = undefined;
        return root;
    }
}
