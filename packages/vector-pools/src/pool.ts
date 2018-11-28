import { TypedArray } from "@thi.ng/api";
import { isTypedArray } from "@thi.ng/checks/is-typedarray";
import {
    MemPool,
    MemPoolOpts,
    MemPoolStats,
    Type
} from "@thi.ng/malloc";
import { IVector } from "@thi.ng/vectors3/api";
import { IVecPool } from "./api";
import { wrap } from "./wrap";

export class VecPool implements
    IVecPool {

    pool: MemPool;

    constructor(pool: MemPool);
    constructor(buf: number | ArrayBuffer, opts?: Partial<MemPoolOpts>);
    constructor(pool: any, opts?: Partial<MemPoolOpts>) {
        this.pool = !(pool instanceof MemPool) ?
            new MemPool(pool, opts) :
            pool;
    }

    stats(): MemPoolStats {
        return this.pool.stats();
    }

    malloc(size: number, type: Type = Type.F32): TypedArray {
        return this.pool.callocAs(type, size);
    }

    mallocWrapped(size: number, stride = 1, type: Type = Type.F32): IVector<any> {
        const buf = this.pool.callocAs(type, size * stride);
        return wrap(buf, size, 0, stride);

    }

    /**
     * Intended to provide individual vector views of a larger
     * underlying buffer. Attempts to allocate a single block of
     * sufficient memory to hold `num` vectors of `size` elements and if
     * successful returns array of vectors mapping the buffer with given
     * stride lengths (both component and element strides can be
     * provided).
     *
     * *Note:* Since all result vectors share the same continuous memory
     * block, freeing any of them from the pool will invalidate all of
     * them.
     *
     * Also see:
     * - `Vec2.mapBuffer()`
     * - `Vec3.mapBuffer()`
     * - `Vec4.mapBuffer()`
     * - `NDArray1.mapBuffer()`
     *
     * @param num
     * @param size
     * @param cstride
     * @param estride
     * @param type
     */
    mallocArray(num: number, size: number, cstride = 1, estride = size, type: Type = Type.F32): IVector<any>[] {
        const buf = this.malloc(Math.max(cstride, estride, size) * num, type);
        if (!buf) return;
        const res: IVector<any>[] = [];
        for (let i = 0; i < num; i += estride) {
            res.push(wrap(buf, size, i, cstride));
        }
        return res;
    }

    free(vec: IVector<any> | TypedArray) {
        const buf = (<any>vec).buf;
        return buf ?
            isTypedArray(buf) ?
                this.pool.free(<any>buf) :
                false :
            this.pool.free(<any>vec);
    }

    freeAll() {
        this.pool.freeAll();
    }

    release() {
        const res = this.pool.release();
        res && delete this.pool;
        return res;
    }
}
