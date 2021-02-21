import { assert, ILength, SIZEOF, TypedArray, typedArray } from "@thi.ng/api";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import type { SOAAttribSpec, SOASpecs, SOATuple } from "./api";
import { prepareSpec } from "./utils";

export class SOA<K extends string> implements ILength {
    length: number;
    buffers: Record<K, TypedArray>;
    specs: SOASpecs<K>;

    constructor(num: number, specs: SOASpecs<K>) {
        this.length = num;
        this.buffers = <Record<K, TypedArray>>{};
        this.specs = <SOASpecs<K>>{};
        this.addSpecs(specs);
    }

    keys() {
        return <K[]>Object.keys(this.specs);
    }

    *values(from = 0, to = this.length): IterableIterator<SOATuple<K, Vec>> {
        this.ensureIndex(from);
        this.ensureIndex(to, from, this.length);
        for (; from < to; from++) {
            yield this.indexUnsafe(from);
        }
    }

    attribValues(id: K, from = 0, to = this.length) {
        this.ensureAttrib(id);
        this.ensureIndex(from);
        this.ensureIndex(to, from, this.length);
        let { size, stride, type } = this.specs[id];
        const buf = this.buffers[id].buffer;
        stride! *= SIZEOF[type!];
        from *= stride!;
        to *= stride!;
        const res: Vec[] = [];
        for (; from < to; from += stride!) {
            res.push(typedArray(type!, buf, from, size!));
        }
        return res;
    }

    attribValue(id: K, i: number): Vec {
        this.ensureAttrib(id);
        this.ensureIndex(i);
        return this.attribValueUnsafe(id, i);
    }

    attribValueUnsafe(id: K, i: number): Vec {
        const spec = this.specs[id];
        i *= spec.stride!;
        return this.buffers[id].subarray(i, i + spec.size!);
    }

    setAttribValue(id: K, i: number, val: ReadonlyVec) {
        this.ensureAttrib(id);
        this.ensureIndex(i);
        const spec = this.specs[id];
        assert(val.length <= spec.size!, `${id} value too large`);
        this.buffers[id].set(val, i * spec.stride!);
    }

    setAttribValueUnsafe(id: K, i: number, val: ReadonlyVec) {
        this.buffers[id].set(val, i * this.specs[id].stride!);
        return this;
    }

    setAttribValues(id: K, vals: Iterable<ReadonlyVec>, from = 0) {
        this.ensureAttrib(id);
        this.ensureIndex(from);
        const buf = this.buffers[id];
        const stride = this.specs[id].stride!;
        const end = this.length * stride;
        let i = from * stride;
        for (let v of vals) {
            buf.set(v, i);
            i += stride;
            if (i >= end) break;
        }
        return this;
    }

    index(i: number): SOATuple<K, Vec>;
    index<ID extends K>(i: number, ids: ID[]): SOATuple<ID, Vec>;
    index(i: number, ids?: K[]): any {
        this.ensureIndex(i);
        return this.indexUnsafe(i, ids!);
    }

    indexUnsafe(i: number): SOATuple<K, Vec>;
    indexUnsafe<ID extends K>(i: number, ids: ID[]): SOATuple<ID, Vec>;
    indexUnsafe(i: number, ids?: K[]): any {
        const res = <SOATuple<K, Vec>>{};
        if (ids) {
            for (let i = ids.length; --i >= 0; ) {
                const id = ids[i];
                res[id] = this.attribValueUnsafe(id, i);
            }
        } else {
            for (let id in this.specs) {
                res[id] = this.attribValueUnsafe(id, i);
            }
        }
        return res;
    }

    setIndex(i: number, vals: Partial<SOATuple<K, ReadonlyVec>>) {
        this.ensureIndex(i);
        for (let id in vals) {
            this.setAttribValue(id, i, <any>vals[id]!);
        }
        return this;
    }

    setIndexUnsafe(i: number, vals: Partial<SOATuple<K, ReadonlyVec>>) {
        for (let id in vals) {
            this.setAttribValueUnsafe(id, i, <any>vals[id]!);
        }
        return this;
    }

    setValues(vals: Partial<SOATuple<K, Iterable<ReadonlyVec>>>, from = 0) {
        for (let id in vals) {
            this.setAttribValues(id, vals[id]!, from);
        }
        return this;
    }

    copyTo(
        dest: SOA<K>,
        ids?: K[],
        destFrom = 0,
        srcFrom = 0,
        srcTo = this.length
    ) {
        this.ensureIndex(srcFrom);
        this.ensureIndex(srcTo, srcFrom, this.length);
        const num = srcTo - srcFrom;
        dest.ensureIndex(destFrom);
        dest.ensureIndex(destFrom + num, destFrom, dest.length);
        ids = ids || <K[]>Object.keys(this.specs);
        for (let k = ids.length; --k >= 0; ) {
            const id = ids[k];
            for (let i = srcFrom, j = destFrom; i < srcTo; i++, j++) {
                dest.setAttribValueUnsafe(id, j, this.attribValueUnsafe(id, i));
            }
        }
        return dest;
    }

    addSpecs(specs: SOASpecs<K>) {
        const num = this.length;
        for (let id in specs) {
            assert(!this.specs[id], `attrib ${id} already exists`);
            const spec = prepareSpec(specs[id]);
            this.validateSpec(id, spec);
            const { stride, default: defVal } = spec;
            const buffer = spec.buf
                ? typedArray(spec.type!, spec.buf, spec.byteOffset || 0)
                : typedArray(spec.type!, num * stride!);
            if (defVal) {
                for (let i = 0; i < num; i++) {
                    buffer.set(defVal, i * stride!);
                }
            }
            this.specs[id] = spec;
            this.buffers[id] = buffer;
        }
    }

    protected validateSpec(id: K, spec: Partial<SOAAttribSpec>) {
        assert(spec.stride! >= spec.size!, `${id} illegal stride`);
        assert(
            !spec.buf ||
                spec.buf.byteLength >=
                    ((this.length - 1) * spec.stride! + spec.size!) *
                        SIZEOF[spec.type!],
            `${id} buffer too small`
        );
        assert(
            spec.default === undefined || spec.default.length === spec.size,
            `illegal default value for ${id}, expected size: ${spec.size}`
        );
    }

    protected ensureAttrib(id: K) {
        assert(!!this.specs[id], `invalid attrib ${id}`);
    }

    protected ensureIndex(i: number, min = 0, max = this.length - 1) {
        assert(i >= min && i <= max, `index out of bounds: ${i}`);
    }
}

export const soa = <K extends string>(num: number, specs: SOASpecs<K>) =>
    new SOA<K>(num, specs);
