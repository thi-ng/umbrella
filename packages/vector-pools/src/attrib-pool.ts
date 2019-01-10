import {
    assert,
    IObjectOf,
    IRelease,
    TypedArray
} from "@thi.ng/api";
import { align, Pow2 } from "@thi.ng/binary";
import { MemPool, SIZEOF, wrap } from "@thi.ng/malloc";
import { range } from "@thi.ng/transducers";
import { ReadonlyVec, Vec } from "@thi.ng/vectors3";
import { asNativeType } from "./convert";
import {
    AttribPoolOpts,
    AttribSpec,
} from "./api";

/*
 * WASM mem   : 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ...
 * typedarr   :         0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ... offset = 4  (bytes)
 * pos (f32)  :         X X X X X Y Y Y Y                                 X ... offset = 0  (bytes), size = 2 (f32)
 * uv  (f32)  :                           U U U U V V V V                   ... offset = 8  (bytes), size = 2 (f32)
 * col (u16)  :                                           R R G G B B A A   ... offset = 16 (bytes), size = 4 (u16)
 *
 * global stride: 24
 */
export class AttribPool implements
    IRelease {

    attribs: IObjectOf<TypedArray>;
    order: string[];
    specs: IObjectOf<AttribSpec>;
    opts: AttribPoolOpts;
    pool: MemPool;
    addr: number;
    capacity: number;

    byteStride: number;
    maxAttribSize: number;

    constructor(
        pool: number | ArrayBuffer | MemPool,
        capacity: number,
        specs: IObjectOf<AttribSpec>,
        opts?: AttribPoolOpts
    ) {
        this.opts = <AttribPoolOpts>{
            resizable: true,
            ...opts
        };
        this.pool = !(pool instanceof MemPool) ?
            new MemPool(pool, this.opts.mempool) :
            pool;
        this.opts = opts;
        this.capacity = capacity;
        this.specs = {};
        this.attribs = {};
        this.order = [];
        this.byteStride = 1;
        this.maxAttribSize = 1;
        this.addAttribs(specs, true);
    }

    bytes() {
        return new Uint8Array(this.pool.buf, this.addr, this.capacity * this.byteStride);
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

    addAttribs(specs: IObjectOf<AttribSpec>, alloc = false) {
        const [newStride, maxSize] = this.computeStride(specs);
        this.maxAttribSize = maxSize;
        if (newStride != this.byteStride) {
            this.realign(newStride);
        }
        this.validateSpecs(specs, newStride);
        this.byteStride = newStride;
        if (alloc) {
            const addr = this.pool.malloc(this.capacity * this.byteStride);
            assert(addr > 0, `out of memory`);
            this.addr = addr;
        }
        this.initDefaults(specs);
    }

    attribValue(id: string, i: number): number | Vec {
        const spec = this.specs[id];
        assert(!!spec, `invalid attrib: ${id}`);
        if (i >= this.capacity) return;
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

    setAttribValue(id: string, index: number, v: number | ReadonlyVec) {
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
            buf.set(<ReadonlyVec>v, index);
        } else {
            buf[index] = <number>v;
        }
        return this;
    }

    setAttribValues(id: string, vals: (number | ReadonlyVec)[]) {
        const spec = this.specs[id];
        assert(!!spec, `invalid attrib: ${id}`);
        const n = vals.length;
        const v = vals[0];
        const stride = spec.stride;
        this.ensure(n);
        const buf = this.attribs[id];
        const isNum = typeof v === "number";
        assert(
            () => (!isNum && spec.size > 1) || (isNum && spec.size === 1),
            `incompatible value(s) for attrib: ${id}`
        );
        if (!isNum) {
            assert(
                (<ReadonlyVec>v).length <= spec.size,
                `wrong attrib val size, expected ${spec.size}, got ${(<ReadonlyVec>v).length}`
            );
            for (let i = 0; i < n; i++) {
                buf.set(<ReadonlyVec>vals[i], i * stride);
            }
        } else {
            for (let i = 0; i < n; i++) {
                buf[i * stride] = <number>vals[i];
            }
        }
    }

    removeAttrib(id: string) {
        if (!this.attribs[id]) return false;
        delete this.attribs[id];
        delete this.specs[id];
        this.updateOrder();
        const [stride, size] = this.computeStride(this.specs, false);
        this.maxAttribSize = size;
        this.realign(stride);
    }

    ensure(newCapacity: number, fill = false) {
        if (newCapacity <= this.capacity) return;
        assert(this.opts.resizable, `pool resizing disabled`);
        // TODO add realloc()
        const newAddr = this.pool.malloc(newCapacity * this.byteStride);
        assert(newAddr > 0, `out of memory`);
        for (let id in this.specs) {
            const a = this.specs[id];
            const buf = wrap(
                asNativeType(a.type),
                this.pool.buf,
                newAddr + (a.byteOffset || 0),
                (newCapacity - 1) * a.stride + a.size
            );
            buf.set(this.attribs[id]);
            this.attribs[id] = buf;
        }
        if (fill) {
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
            const size = SIZEOF[asNativeType(a.type)];
            maxSize = Math.max(maxSize, size);
            maxStride = Math.max(maxStride, a.byteOffset + a.size * size);
        }
        return [align(maxStride, <Pow2>maxSize), maxSize];
    }

    protected validateSpecs(specs: IObjectOf<AttribSpec>, stride = this.byteStride) {
        for (let id in specs) {
            assert(!this.attribs[id], `attrib: ${id} already exists`);
            const a = specs[id];
            const size = SIZEOF[asNativeType(a.type)];
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
        this.order = Object.keys(this.specs).sort(
            (a, b) => this.specs[a].byteOffset - this.specs[b].byteOffset
        );
    }

    protected initDefaults(specs: IObjectOf<AttribSpec>, start = 0, end = this.capacity) {
        for (let id in specs) {
            const a = specs[id];
            this.attribs[id] = wrap(
                asNativeType(a.type),
                this.pool.buf,
                this.addr + (a.byteOffset || 0),
                (this.capacity - 1) * a.stride + a.size
            );
        }
        this.setDefaults(specs, start, end);
    }

    protected setDefaults(specs: IObjectOf<AttribSpec>, start = 0, end = this.capacity) {
        for (let id in specs) {
            const a = specs[id];
            if (a.default == null) continue;
            const buf = this.attribs[id];
            const s = a.stride;
            const v = a.default;
            if (typeof v === "number") {
                for (let i = start; i < end; i++) {
                    buf[i * s] = v;
                }
            } else {
                for (let i = start; i < end; i++) {
                    buf.set(<ReadonlyVec>v, i * s);
                }
            }
        }
    }

    protected realign(newByteStride: number) {
        if (this.order.length === 0 || newByteStride === this.byteStride) return;
        console.warn(`realigning ${this.byteStride} -> ${newByteStride}...`);
        const grow = newByteStride > this.byteStride;
        let newAddr = this.addr;
        if (grow) {
            assert(this.opts.resizable, `pool resizing disabled`);
            // TODO realloc
            newAddr = this.pool.malloc(this.capacity * newByteStride);
            assert(newAddr > 0, `out of memory`);
        } else if (!this.opts.resizable) {
            return;
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
            const type = asNativeType(a.type);
            const dStride = newByteStride / SIZEOF[type];
            newAttribs[id] = [
                wrap(
                    type,
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
