import { NumericArray, TypedArray } from "@thi.ng/api";
import { isTypedArray } from "@thi.ng/checks/is-typedarray";
import {
    MemPool,
    MemPoolOpts,
    MemPoolStats,
    Type
} from "@thi.ng/malloc";
import { IVecPool, IVector, Vec } from "./api";
import { NDArray1 } from "./nd";
import { Vec2 } from "./vec2";
import { Vec3 } from "./vec3";
import { Vec4 } from "./vec4";

const F64 = Type.F64;

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

    malloc(size: number, type: Type = F64): TypedArray {
        return this.pool.callocAs(type, size);
    }

    mallocWrapped(size: number, stride = 1, type: Type = F64): Vec {
        const buf = this.pool.callocAs(type, size * stride);
        return wrapped(buf, size, 0, stride);

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
    mallocArray(num: number, size: number, cstride = 1, estride = size, type: Type = F64): Vec[] {
        const buf = this.malloc(Math.max(cstride, estride, size) * num, type);
        if (!buf) return;
        const res: Vec[] = [];
        for (let i = 0; i < num; i += estride) {
            res.push(wrapped(buf, size, i, cstride));
        }
        return res;
    }

    free(vec: IVector<any> | TypedArray) {
        const buf = (<any>vec).buf;
        if (buf) {
            return isTypedArray(buf) ?
                this.pool.free(<any>buf) :
                false;
        }
        return this.pool.free(<any>vec);
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

const wrapped =
    (buf: NumericArray, size: number, idx: number, stride: number) => {
        switch (size) {
            case 2:
                return new Vec2(buf, idx, stride);
            case 3:
                return new Vec3(buf, idx, stride);
            case 4:
                return new Vec4(buf, idx, stride);
            default:
                return new NDArray1(buf, [size], [stride], idx);
        }
    };
