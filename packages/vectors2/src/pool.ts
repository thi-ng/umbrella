import { TypedArray } from "@thi.ng/api";
import { isTypedArray } from "@thi.ng/checks/is-typedarray";
import { MemPool, Type, MemPoolOpts } from "@thi.ng/malloc";
import { Vec2 } from "./vec2";
import { Vec3 } from "./vec3";
import { IVector } from "./api";

export { Type }

const F64 = Type.F64;

export class VecPool {

    pool: MemPool;

    constructor(pool: MemPool);
    constructor(buf: number | ArrayBuffer, opts?: Partial<MemPoolOpts>);
    constructor(pool: any, opts?: Partial<MemPoolOpts>) {
        this.pool = !(pool instanceof MemPool) ?
            new MemPool(pool, opts) :
            pool;
    }

    malloc(size: number, type: Type = F64) {
        return this.pool.callocAs(type, size);
    }

    mallocWrapped(size: number, stride = 1, type: Type = F64) {
        const buf = this.pool.callocAs(type, size * stride);
        if (!buf) return;
        switch (size) {
            case 2:
                return new Vec2(buf, 0, stride);
            case 3:
                return new Vec3(buf, 0, stride);
            case 4:
            default:
            // TODO add Vec4 & GVec
        }
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
}
