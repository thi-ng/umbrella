import { IObjectOf, IRelease, TypedArray } from "@thi.ng/api/api";
import { assert } from "@thi.ng/api/assert";
import { align } from "@thi.ng/binary/align";
import { Pow2 } from "@thi.ng/binary/api";
import { SIZEOF, MemPoolOpts } from "@thi.ng/malloc/api";
import { MemPool } from "@thi.ng/malloc/pool";
import { wrap } from "@thi.ng/malloc/wrap";
import { range } from "@thi.ng/transducers/iter/range";
import { ReadonlyVec, Vec } from "@thi.ng/vectors3/api";
import { AttribSpec } from "./api";

/*
 * WASM mem   : 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ...
 * typedarr   :         0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ... offset = 4  (bytes)
 * pos (f32)  :         X X X X X Y Y Y Y                                 X ... offset = 0  (bytes), size = 2 (f32)
 * uv  (f32)  :                           U U U U V V V V                   ... offset = 8  (bytes), size = 2 (f32)
 * col (u16)  :                                           R R G G B B A A   ... offset = 16 (bytes), size = 4 (u16)
 *
 * global stride: 16
 */
export class AttribPool implements
    IRelease {

    attribs: IObjectOf<TypedArray>;
    order: string[];
    specs: IObjectOf<AttribSpec>;
    pool: MemPool;
    addr: number;
    capacity: number;

    byteStride: number;
    maxAttribSize: number;

    constructor(
        pool: number | ArrayBuffer | MemPool,
        capacity: number,
        specs: IObjectOf<AttribSpec>,
        poolOpts?: MemPoolOpts
    ) {
        this.pool = !(pool instanceof MemPool) ?
            new MemPool(pool, poolOpts) :
            pool;
        this.capacity = capacity;
        this.specs = {};
        this.attribs = {};
        this.order = [];
        this.byteStride = 1;
        this.maxAttribSize = 1;
        this.initAttribs(specs, true);
    }

    release(releasePool = true) {
        if (releasePool && this.pool) {
            this.pool.release();
        }
        delete this.pool;
        delete this.attribs;
        delete this.specs;
        return true;
    }

    initAttribs(specs: IObjectOf<AttribSpec>, alloc = false) {
        const [newStride, maxSize] = this.computeStride(specs);
        this.maxAttribSize = maxSize;
        if (newStride != this.byteStride) {
            this.realignAttribs(newStride);
        }
        this.validateAttribs(specs, newStride);
        this.byteStride = newStride;
        if (alloc) {
            const addr = this.pool.malloc(this.capacity * this.byteStride);
            assert(addr > 0, `out of memory`);
            this.addr = addr;
        }
        this.initDefaults(specs);
    }

    getAttrib(id: string) {
        return this.attribs[id];
    }

    getAttribVal(id: string, i: number): number | Vec {
        if (i >= this.capacity) return;
        const spec = this.specs[id];
        assert(!!spec, `invalid attrib: ${id}`);
        i *= spec.stride;
        return spec.size > 1 ?
            this.attribs[id].subarray(i, i + spec.size) :
            this.attribs[id][i];
    }

    *attribValues(id: string) {
        const buf = this.attribs[id];
        assert(!!buf, `invalid attrib: ${id}`);
        const spec = this.specs[id];
        const stride = spec.stride;
        const size = spec.size;
        if (size > 1) {
            for (let i = 0, j = 0, n = this.capacity; i < n; i++ , j += stride) {
                yield buf.subarray(j, j + size);
            }
        } else {
            for (let i = 0, n = this.capacity; i < n; i++) {
                yield buf[i * stride];
            }
        }
    }

    setAttribVal(id: string, index: number, v: number | ReadonlyVec) {
        const spec = this.specs[id];
        assert(!!spec, `invalid attrib: ${id}`);
        this.ensure(index);
        const buf = this.attribs[id];
        index *= spec.stride;
        const isNum = typeof v === "number";
        assert(
            () => (!isNum && spec.size > 1) || (isNum && spec.size === 1),
            `incompatible value for attrib: ${id}`
        );
        if (!isNum) {
            assert(
                (<Vec>v).length <= spec.size,
                `wrong attrib val size, expected ${spec.size}, got ${(<Vec>v).length}`
            );
            buf.set(<Vec>v, index);
        } else {
            buf[index] = <number>v;
        }
        return this;
    }

    removeAttrib(id: string) {
        if (!this.attribs[id]) return false;
        delete this.attribs[id];
        delete this.specs[id];
        this.updateOrder();
        const [stride, size] = this.computeStride(this.specs, false);
        this.maxAttribSize = size;
        this.realignAttribs(stride);
    }

    ensure(newCapacity: number, fill = false) {
        if (newCapacity < this.capacity) return;
        // TODO add realloc()
        const newAddr = this.pool.malloc(newCapacity * this.byteStride);
        assert(newAddr > 0, `out of memory`);
        for (let id in this.specs) {
            const a = this.specs[id];
            const buf = wrap(
                a.type,
                this.pool.buf,
                newAddr + (a.byteOffset || 0),
                (newCapacity - 1) * a.stride + a.size
            );
            buf.set(this.attribs[id]);
            this.attribs[id] = buf;
        }
        if (fill) {
            // TODO fill remainder with default values?
            this.setDefaults(this.specs, this.capacity, newCapacity);
        }
        this.pool.free(this.addr);
        this.addr = newAddr;
        this.capacity = newCapacity;
    }

    protected computeStride(specs: IObjectOf<AttribSpec>, inclExisting = true) {
        let maxStride = inclExisting ? this.byteStride : 1;
        let maxSize = inclExisting ? this.maxAttribSize : 1;
        for (let id in specs) {
            const a = specs[id];
            const size = SIZEOF[a.type];
            maxSize = Math.max(maxSize, size);
            maxStride = Math.max(maxStride, a.byteOffset + a.size * size);
        }
        return [align(maxStride, <Pow2>maxSize), maxSize];
    }

    protected validateAttribs(specs: IObjectOf<AttribSpec>, stride = this.byteStride) {
        for (let id in specs) {
            assert(!this.attribs[id], `attrib: ${id} already exists`);
            const a = specs[id];
            const size = SIZEOF[a.type];
            const isNum = typeof a.default === "number";
            assert(
                () => (!isNum && a.size === (<Vec>a.default).length) || (isNum && a.size === 1),
                `incompatible default value for attrib: ${id}, expected size ${a.size}`
            );
            assert(
                a.byteOffset % size === 0,
                `invalid offset for attrib: ${id}, expected multiple of ${size}`
            );
            a.stride = stride / size;
            this.specs[id] = <AttribSpec>a;
        }
        this.updateOrder();
    }

    protected updateOrder() {
        this.order = Object.keys(this.specs).sort((a, b) => this.specs[a].byteOffset - this.specs[b].byteOffset);
    }

    protected initDefaults(specs: IObjectOf<AttribSpec>, start = 0, end = this.capacity) {
        for (let id in specs) {
            const a = specs[id];
            this.attribs[id] = wrap(
                a.type,
                this.pool.buf,
                this.addr + (a.byteOffset || 0),
                (this.capacity - 1) * a.stride + a.size
            );
        }
        this.setDefaults(specs, start, end);
    }

    protected setDefaults(specs: IObjectOf<AttribSpec>, start = 0, end = this.capacity) {
        for (let id in specs) {
            const buf = this.attribs[id];
            const a = specs[id];
            const s = a.stride;
            const v = a.default;
            if (typeof v === "number") {
                for (let i = start; i < end; i++) {
                    buf[i * s] = v;
                }
            } else {
                for (let i = start; i < end; i++) {
                    buf.set(<Vec>v, i * s);
                }
            }
        }
    }

    protected realignAttribs(newByteStride: number) {
        if (this.order.length === 0 || newByteStride === this.byteStride) return;
        console.warn(`realigning ${this.byteStride} -> ${newByteStride}...`);
        const grow = newByteStride > this.byteStride;
        let newAddr = this.addr;
        if (grow) {
            // TODO realloc
            newAddr = this.pool.malloc(this.capacity * newByteStride);
            assert(newAddr > 0, `out of memory`);
        }
        const sameBlock = newAddr === this.addr;
        const num = this.capacity - 1;
        const attribs = this.attribs;
        const newAttribs: IObjectOf<[TypedArray, number]> = {};
        const specs = this.specs;
        const order = grow ? [...this.order].reverse() : this.order;
        // create resized attrib views (in old or new address space)
        for (let id in specs) {
            const a = specs[id];
            const dStride = newByteStride / SIZEOF[a.type];
            newAttribs[id] = [
                wrap(
                    a.type,
                    this.pool.buf,
                    newAddr + a.byteOffset,
                    num * dStride + a.size
                ),
                dStride
            ];
        }
        // process in opposite directions based on new stride size
        for (let i of newByteStride < this.byteStride ? range(num + 1) : range(num, -1, -1)) {
            // ...in offset order to avoid successor attrib vals
            for (let id of order) {
                const a = specs[id];
                const sStride = a.stride;
                const src = attribs[id];
                const [dest, dStride] = newAttribs[id];
                if (typeof a.default === "number") {
                    dest[i * dStride] = src[i * sStride];
                } else {
                    const j = i * sStride;
                    sameBlock ?
                        (grow ? dest : src).copyWithin(i * dStride, j, j + a.size) :
                        dest.set(src.subarray(j, j + a.size), i * dStride);
                }
            }
        }
        if (this.addr != newAddr) {
            this.pool.free(this.addr);
            this.addr = newAddr;
        }
        this.byteStride = newByteStride;
        for (let id in newAttribs) {
            const a = newAttribs[id];
            attribs[id] = a[0];
            specs[id].stride = a[1];
        }
    }
}
