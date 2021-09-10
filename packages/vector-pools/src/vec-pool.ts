import {
    asNativeType,
    GLType,
    Type,
    TypedArray,
} from "@thi.ng/api/api/typedarray";
import { isTypedArray } from "@thi.ng/checks/is-typedarray";
import type { MemPoolOpts, MemPoolStats } from "@thi.ng/malloc";
import { MemPool } from "@thi.ng/malloc/pool";
import type { StridedVec } from "@thi.ng/vectors";
import type { IVecPool } from "./api";
import { wrap } from "./wrap";

export class VecPool implements IVecPool {
    pool: MemPool;

    constructor(pool?: MemPool);
    constructor(opts?: Partial<MemPoolOpts>);
    constructor(pool: any) {
        this.pool = pool instanceof MemPool ? pool : new MemPool(pool);
    }

    stats(): MemPoolStats {
        return this.pool.stats();
    }

    malloc(size: number, type: GLType | Type = "f32"): TypedArray | undefined {
        return this.pool.callocAs(asNativeType(type), size);
    }

    mallocWrapped(
        size: number,
        stride = 1,
        type: GLType | Type = "f32"
    ): StridedVec | undefined {
        const buf = this.pool.callocAs(asNativeType(type), size * stride);
        return buf ? wrap(buf, size, 0, stride) : undefined;
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
     * @param num -
     * @param size -
     * @param cstride -
     * @param estride -
     * @param type -
     */
    mallocArray(
        num: number,
        size: number,
        cstride = 1,
        estride = size,
        type: GLType | Type = "f32"
    ): StridedVec[] | undefined {
        const buf = this.malloc(
            Math.max(cstride, estride, size) * num,
            asNativeType(type)
        );
        if (!buf) return;
        const res: StridedVec[] = [];
        for (let i = 0; i < num; i += estride) {
            res.push(wrap(buf, size, i, cstride));
        }
        return res;
    }

    free(vec: StridedVec | TypedArray) {
        const buf = (<any>vec).buf;
        return buf
            ? isTypedArray(buf)
                ? this.pool.free(<any>buf)
                : false
            : this.pool.free(<any>vec);
    }

    freeAll() {
        this.pool.freeAll();
    }

    release() {
        const res = this.pool.release();
        res && delete (<any>this).pool;
        return res;
    }
}
