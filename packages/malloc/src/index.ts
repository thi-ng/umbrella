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
    buf: ArrayBuffer;
    top: number;
    end: number;
    _free: MemBlock;
    _used: MemBlock;

    private u8: Uint8Array;

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
        if (block) {
            block.fill(0);
        }
        return block;
    }

    mallocAs(type: Type, num: number): TypedArray {
        const addr = this.malloc(num * SIZEOF[type]);
        if (addr) {
            return CTORS[type](this.buf, addr, num);
        }
        return null;
    }

    calloc(size: number): number {
        const addr = this.malloc(size);
        if (addr) {
            this.u8.fill(0, addr, align(addr + size, 8));
        }
        return addr;
    }

    malloc(size: number): number {
        size = align(size, 8);
        let block = this.findBlock(size);
        if (!block) {
            const addr = align(this.top, 8);
            if (addr + size <= this.end) {
                block = {
                    addr,
                    size,
                    next: this._used
                };
                this._used = block;
                this.top = addr + size;
            } else {
                return 0;
            }
        }
        if (block) {
            return block.addr;
        }
        return 0;
    }

    free(ptr: number | TypedArray) {
        let addr: number;
        if (!isNumber(ptr)) {
            if (ptr.buffer !== this.buf) {
                return 0;
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
                return 1;
            }
            prev = block;
            block = block.next;
        }
        return 0;
    }

    // compact() {
    //     let ptr = this._free;
    //     let prev: MemBlock;
    //     let scan: MemBlock;
    //     while (ptr) {
    //         prev = ptr;
    //         scan = ptr.next;
    //         while (scan && prev.addr + prev.size === scan.addr) {
    //             console.log("merge:", scan.addr, scan.size);
    //             prev = scan;
    //             scan = scan.next;
    //         }
    //         if (prev !== ptr) {
    //             const newSize = prev.addr - ptr.addr + prev.size;
    //             console.log("new size:", newSize);
    //             ptr.size = newSize;
    //             const next = prev.next;
    //             let tmp = ptr.next;
    //             while (tmp !== prev.next) {
    //                 console.log("release:", tmp.addr);
    //                 const tn = tmp.next;
    //                 tmp.next = null;
    //                 tmp = tn;
    //             }
    //             ptr.next = next;
    //         }
    //         ptr = ptr.next;
    //     }
    // }

    protected findBlock(size: number) {
        let block = this._free;
        let prev: MemBlock = null;
        while (block) {
            if (block.size >= size) {
                if (prev) {
                    prev.next = block.next;
                }
                block.next = this._used;
                this._used = block;
                return block;
            }
            prev = block;
            block = block.next;
        }
        return block;
    }

    protected insertBlock(free: MemBlock) {
        let block = this._free;
        let prev = null;
        while (block) {
            if (block.size >= free.size) {
                free.next = block;
                if (prev) {
                    prev.next = free;
                } else {
                    this._free = free;
                }
                return;
            }
            prev = block;
            block = block.next;
        }
        free.next = null;
        if (prev) {
            prev.next = free;
        } else {
            this._free = free;
        }
    }
}
