import { IObjectOf, TypedArray } from "@thi.ng/api";
import { align } from "@thi.ng/binary/align";
import { isNumber } from "@thi.ng/checks/is-number";

export const enum Type {
    U8,
    I8,
    U16,
    I16,
    U32,
    I32,
    F32,
    F64
};

type BlockCtor = (buf: ArrayBuffer, addr: number, num: number) => TypedArray;

const CTORS: IObjectOf<BlockCtor> = {
    [Type.U8]: (buf, addr, num) => new Uint8Array(buf, addr, num),
    [Type.I8]: (buf, addr, num) => new Int8Array(buf, addr, num),
    [Type.U16]: (buf, addr, num) => new Uint16Array(buf, addr, num),
    [Type.I16]: (buf, addr, num) => new Int16Array(buf, addr, num),
    [Type.U32]: (buf, addr, num) => new Uint32Array(buf, addr, num),
    [Type.I32]: (buf, addr, num) => new Int32Array(buf, addr, num),
    [Type.F32]: (buf, addr, num) => new Float32Array(buf, addr, num),
    [Type.F64]: (buf, addr, num) => new Float64Array(buf, addr, num),
};

const SIZEOF = {
    [Type.U8]: 1,
    [Type.I8]: 1,
    [Type.U16]: 2,
    [Type.I16]: 2,
    [Type.U32]: 4,
    [Type.I32]: 4,
    [Type.F32]: 4,
    [Type.F64]: 8,
};

export interface MemBlock {
    addr: number;
    size: number;
    next: MemBlock;
}

export class MemPool {

    static MIN_SPLIT = 16;

    buf: ArrayBuffer;
    top: number;
    end: number;
    _free: MemBlock;
    _used: MemBlock;

    protected u8: Uint8Array;

    constructor(buf: ArrayBuffer, start = 8, end = buf.byteLength) {
        this.buf = buf;
        this.u8 = new Uint8Array(buf);
        this.top = Math.max(start, 8);
        this.end = end;
        this._free = null;
        this._used = null;
    }

    stats() {
        const listStats = (block: MemBlock) => {
            let count = 0;
            let size = 0;
            while (block) {
                count++;
                size += block.size;
                block = block.next;
            }
            return { count, size };
        };
        return {
            free: listStats(this._free),
            used: listStats(this._used),
            top: this.top,
            available: this.end - this.top,
            total: this.buf.byteLength
        };
    }

    callocAs(type: Type, num: number): TypedArray {
        const block = this.mallocAs(type, num);
        block && block.fill(0);
        return block;
    }

    mallocAs(type: Type, num: number): TypedArray {
        const addr = this.malloc(num * SIZEOF[type]);
        return addr ?
            CTORS[type](this.buf, addr, num) :
            null;
    }

    calloc(size: number): number {
        const addr = this.malloc(size);
        addr && this.u8.fill(0, addr, align(addr + size, 8));
        return addr;
    }

    malloc(size: number): number {
        size = align(size, 8);
        let top = this.top;
        let block = this._free;
        let prev = null;
        while (block) {
            const isTop = block.addr + block.size >= top;
            if (isTop || block.size >= size) {
                if (prev) {
                    prev.next = block.next;
                } else {
                    this._free = block.next;
                }
                block.next = this._used;
                this._used = block;
                if (isTop) {
                    block.size = size;
                    this.top = block.addr + size;
                } else {
                    const excess = block.size - size;
                    if (excess >= MemPool.MIN_SPLIT) {
                        block.size = size;
                        this.insertBlock({
                            addr: block.addr + size,
                            size: excess,
                            next: null
                        });
                        this.compact();
                    }
                }
                return block.addr;
            }
            prev = block;
            block = block.next;
        }
        const addr = align(this.top, 8);
        top = addr + size;
        if (top <= this.end) {
            block = {
                addr,
                size,
                next: this._used
            };
            this._used = block;
            this.top = top;
            return addr;
        }
        return 0;
    }

    free(ptr: number | TypedArray) {
        let addr: number;
        if (!isNumber(ptr)) {
            if (ptr.buffer !== this.buf) {
                return false;
            }
            addr = ptr.byteOffset;
        } else {
            addr = ptr;
        }
        let block = this._used;
        let prev: MemBlock = null;
        while (block) {
            if (block.addr === addr) {
                if (prev) {
                    prev.next = block.next;
                } else {
                    this._used = block.next;
                }
                this.insertBlock(block);
                this.compact();
                return true;
            }
            prev = block;
            block = block.next;
        }
        return false;
    }

    protected compact() {
        let block = this._free;
        let prev: MemBlock;
        let scan: MemBlock;
        let res = false;
        while (block) {
            prev = block;
            scan = block.next;
            while (scan && prev.addr + prev.size === scan.addr) {
                // console.log("merge:", scan.addr, scan.size);
                prev = scan;
                scan = scan.next;
            }
            if (prev !== block) {
                const newSize = prev.addr - block.addr + prev.size;
                // console.log("merged size:", newSize);
                block.size = newSize;
                const next = prev.next;
                let tmp = block.next;
                while (tmp !== prev.next) {
                    // console.log("release:", tmp.addr);
                    const tn = tmp.next;
                    tmp.next = null;
                    tmp = tn;
                }
                block.next = next;
                res = true;
            }
            block = block.next;
        }
        return res;
    }

    protected insertBlock(block: MemBlock) {
        let ptr = this._free;
        let prev: MemBlock = null;
        while (ptr) {
            if (block.addr <= ptr.addr) break;
            prev = ptr;
            ptr = ptr.next;
        }
        if (prev) {
            prev.next = block;
        } else {
            this._free = block;
        }
        block.next = ptr;
    }
}
