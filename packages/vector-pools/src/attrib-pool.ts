import type { IObjectOf, IRelease } from "@thi.ng/api";
import { sizeOf, TypedArray, typedArray } from "@thi.ng/api/typedarray";
import type { Pow2 } from "@thi.ng/binary";
import { align } from "@thi.ng/binary/align";
import { isNumber } from "@thi.ng/checks/is-number";
import { assert } from "@thi.ng/errors/assert";
import { MemPool } from "@thi.ng/malloc/pool";
import { range } from "@thi.ng/transducers/range";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { zeroes } from "@thi.ng/vectors/setn";
import { AttribPoolOpts, AttribSpec, LOGGER } from "./api";

/*
 *              0x00            0x08            0x10            0x18
 *              ^               ^               ^               ^
 * WASM mem   : 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ...
 * typedarr   :         0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ... global offset = 4  (bytes)
 * pos (f32)  :         X X X X Y Y Y Y                                 X ... offset = 0  (bytes), size = 2 (f32)
 * uv  (f32)  :                         U U U U V V V V                   ... offset = 8  (bytes), size = 2 (f32)
 * col (u16)  :                                         R R G G B B A A   ... offset = 16 (bytes), size = 4 (u16)
 *
 * stride     : 24
 */
export class AttribPool implements IRelease {
    attribs: IObjectOf<TypedArray>;
    order: string[];
    specs: IObjectOf<AttribSpec>;
    pool: MemPool;
    addr!: number;
    capacity: number;

    byteStride: number;
    maxAttribSize: number;
    resizable: boolean;

    constructor(opts?: AttribPoolOpts) {
        opts = <AttribPoolOpts>{
            resizable: true,
            ...opts,
        };
        this.pool = !(opts.mem instanceof MemPool)
            ? new MemPool(opts.mem)
            : opts.mem;
        this.capacity = opts.num;
        this.resizable = !!opts.resizable;
        this.specs = {};
        this.attribs = {};
        this.order = [];
        this.byteStride = 1;
        this.maxAttribSize = 1;
        opts.attribs && this.addAttribs(opts.attribs, true);
    }

    bytes() {
        return new Uint8Array(
            this.pool.buf,
            this.addr,
            this.capacity * this.byteStride
        );
    }

    release(releasePool = true) {
        if (releasePool && this.pool) {
            this.pool.release();
        }
        delete (<any>this).pool;
        delete (<any>this).attribs;
        delete (<any>this).specs;
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
        this.setAttribs(specs);
    }

    attribValue(id: string, i: number): number | Vec | undefined {
        const spec = this.specs[id];
        ensureSpec(spec, id);
        if (i >= this.capacity) return;
        i *= spec.stride!;
        return spec.size > 1
            ? this.attribs[id].subarray(i, i + spec.size)
            : this.attribs[id][i];
    }

    *attribValues(id: string) {
        const spec = this.specs[id];
        ensureSpec(spec, id);
        const buf = this.attribs[id];
        const stride = spec.stride!;
        const size = spec.size;
        if (size > 1) {
            for (let i = 0, j = 0, n = this.capacity; i < n; i++, j += stride) {
                yield buf.subarray(j, j + size);
            }
        } else {
            for (let i = 0, n = this.capacity; i < n; i++) {
                yield buf[i * stride];
            }
        }
    }

    attribArray(id: string) {
        const spec = this.specs[id];
        ensureSpec(spec, id);
        const n = this.capacity;
        const size = spec.size;
        const stride = spec.stride!;
        const src = this.attribs[id];
        const dest = typedArray(spec.type, n * size);
        if (size > 1) {
            for (let i = 0, j = 0; i < n; i++, j += stride) {
                dest.set(src.subarray(j, j + size), i * size);
            }
        } else {
            for (let i = 0; i < n; i++) {
                dest[i] = src[i * stride];
            }
        }
        return dest;
    }

    setAttribValue(id: string, index: number, v: number | ReadonlyVec) {
        const spec = this.specs[id];
        this.ensure(index + 1);
        const isNum = isNumber(v);
        ensureAttrib(spec, id, isNum);
        const buf = this.attribs[id];
        index *= spec.stride!;
        if (!isNum) {
            ensureValueSize(<ReadonlyVec>v, spec.size);
            buf.set(<ReadonlyVec>v, index);
        } else {
            buf[index] = <number>v;
        }
        return this;
    }

    setAttribValues(id: string, vals: ReadonlyVec | ReadonlyVec[], index = 0) {
        const v = vals[0];
        const spec = this.specs[id];
        const isNum = isNumber(v);
        ensureAttrib(spec, id, isNum);
        const n = vals.length;
        this.ensure(index + n);
        const stride = spec.stride!;
        const buf = this.attribs[id];
        if (!isNum) {
            ensureValueSize(<ReadonlyVec>v, spec.size);
            for (let i = 0, j = index * stride; i < n; i++, j += stride) {
                buf.set(<ReadonlyVec>vals[i], j);
            }
        } else {
            for (let i = 0, j = index * stride; i < n; i++, j += stride) {
                buf[j] = <number>vals[i];
            }
        }
    }

    setAttribs(
        specs: IObjectOf<
            Partial<{ data: ReadonlyVec | ReadonlyVec[]; index: number }>
        >
    ) {
        for (let id in specs) {
            const spec = specs[id];
            spec.data && this.setAttribValues(id, spec.data, spec.index || 0);
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
        assert(this.resizable, `pool resizing disabled`);
        const newAddr = this.pool.realloc(
            this.addr,
            newCapacity * this.byteStride
        );
        assert(newAddr > 0, `out of memory`);
        for (let id in this.specs) {
            const a = this.specs[id];
            const buf = typedArray(
                a.type,
                this.pool.buf,
                newAddr + (a.byteOffset || 0),
                (newCapacity - 1) * a.stride! + a.size
            );
            buf.set(this.attribs[id]);
            this.attribs[id] = buf;
        }
        if (fill) {
            this.setDefaults(this.specs, this.capacity, newCapacity);
        }
        this.addr = newAddr;
        this.capacity = newCapacity;
    }

    protected computeStride(specs: IObjectOf<AttribSpec>, inclExisting = true) {
        let maxStride = inclExisting ? this.byteStride : 1;
        let maxSize = inclExisting ? this.maxAttribSize : 1;
        for (let id in specs) {
            const a = specs[id];
            const size = sizeOf(a.type);
            maxSize = Math.max(maxSize, size);
            maxStride = Math.max(maxStride, a.byteOffset + a.size * size);
        }
        return [align(maxStride, <Pow2>maxSize), maxSize];
    }

    protected validateSpecs(
        specs: IObjectOf<AttribSpec>,
        stride = this.byteStride
    ) {
        for (let id in specs) {
            assert(!this.attribs[id], `attrib: ${id} already exists`);
            const a = specs[id];
            assert(a.size > 0, `attrib ${id}: illegal or missing size`);
            const size = sizeOf(a.type);
            a.default == null && (a.default = a.size > 1 ? zeroes(a.size) : 0);
            const isNum = isNumber(a.default);
            assert(
                () =>
                    (!isNum && a.size === (<Vec>a.default).length) ||
                    (isNum && a.size === 1),
                `attrib ${id}: incompatible default value, expected size ${a.size}`
            );
            assert(
                a.byteOffset % size === 0,
                `attrib ${id}: invalid offset, expected multiple of ${size}`
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

    protected initDefaults(
        specs: IObjectOf<AttribSpec>,
        start = 0,
        end = this.capacity
    ) {
        for (let id in specs) {
            const a = specs[id];
            this.attribs[id] = typedArray(
                a.type,
                this.pool.buf,
                this.addr + (a.byteOffset || 0),
                (this.capacity - 1) * a.stride! + a.size
            );
        }
        this.setDefaults(specs, start, end);
    }

    protected setDefaults(
        specs: IObjectOf<AttribSpec>,
        start = 0,
        end = this.capacity
    ) {
        for (let id in specs) {
            const a = specs[id];
            if (a.default == null) continue;
            const buf = this.attribs[id];
            const s = a.stride!;
            const v = a.default;
            if (a.size === 1) {
                for (let i = start; i < end; i++) {
                    buf[i * s] = <number>v;
                }
            } else {
                for (let i = start; i < end; i++) {
                    buf.set(<ReadonlyVec>v, i * s);
                }
            }
        }
    }

    protected realign(newByteStride: number) {
        if (this.order.length === 0 || newByteStride === this.byteStride)
            return;
        LOGGER.info(`realigning ${this.byteStride} -> ${newByteStride}...`);
        const grow = newByteStride > this.byteStride;
        let newAddr = this.addr;
        if (grow) {
            assert(this.resizable, `pool growth disabled`);
            newAddr = this.pool.realloc(
                this.addr,
                this.capacity * newByteStride
            );
            assert(newAddr > 0, `out of memory`);
        } else if (!this.resizable) {
            return;
        }
        const sameBlock = newAddr === this.addr;
        const num = this.capacity - 1;
        const { attribs, specs } = this;
        const order = grow ? [...this.order].reverse() : this.order;
        // create resized attrib views (in old or new address space)
        const newAttribs = resizeAttribs(
            specs,
            this.pool.buf,
            newAddr,
            newByteStride,
            num
        );
        // process in opposite directions based on new stride size and
        // in offset order to avoid successor attrib vals getting
        // overwritten...
        for (let i of newByteStride < this.byteStride
            ? range(num + 1)
            : range(num, -1, -1)) {
            moveAttribs(order, specs, attribs, newAttribs, i, sameBlock, grow);
        }
        this.addr = newAddr;
        this.byteStride = newByteStride;
        for (let id in newAttribs) {
            const a = newAttribs[id];
            attribs[id] = a[0];
            specs[id].stride = a[1];
        }
    }
}

const resizeAttribs = (
    specs: IObjectOf<AttribSpec>,
    buf: ArrayBuffer,
    dest: number,
    stride: number,
    num: number
) => {
    const newAttribs: IObjectOf<[TypedArray, number]> = {};
    for (let id in specs) {
        const a = specs[id];
        const dStride = stride / sizeOf(a.type);
        newAttribs[id] = [
            typedArray(
                a.type,
                buf,
                dest + a.byteOffset,
                num * dStride + a.size
            ),
            dStride,
        ];
    }
    return newAttribs;
};

const moveAttribs = (
    order: string[],
    specs: IObjectOf<AttribSpec>,
    attribs: IObjectOf<TypedArray>,
    newAttribs: IObjectOf<[TypedArray, number]>,
    i: number,
    sameBlock: boolean,
    grow: boolean
) => {
    for (let id of order) {
        const a = specs[id];
        const sStride = a.stride!;
        const src = attribs[id];
        const [dest, dStride] = newAttribs[id];
        if (a.size === 1) {
            dest[i * dStride] = src[i * sStride];
        } else {
            const saddr = i * sStride;
            const daddr = i * dStride;
            sameBlock
                ? (grow ? dest : src).copyWithin(daddr, saddr, saddr + a.size)
                : dest.set(src.subarray(saddr, saddr + a.size), daddr);
        }
    }
};

const ensureSpec = (spec: AttribSpec, id: string) =>
    assert(!!spec, `invalid attrib: ${id}`);

const ensureAttrib = (spec: AttribSpec, id: string, isNum: boolean) => {
    ensureSpec(spec, id);
    assert(
        () => (!isNum && spec.size > 1) || (isNum && spec.size === 1),
        `incompatible value for attrib: ${id}`
    );
};

const ensureValueSize = (v: ReadonlyVec, size: number) =>
    assert(
        v.length <= size,
        `wrong attrib val size, expected ${size}, got ${v.length}`
    );
