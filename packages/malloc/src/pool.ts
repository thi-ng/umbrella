import { SIZEOF, Type, TypedArray } from "@thi.ng/api";
import { align } from "@thi.ng/binary";
import { isNumber } from "@thi.ng/checks";
import { illegalArgs } from "@thi.ng/errors";
import {
    IMemPool,
    MemBlock,
    MemPoolOpts,
    MemPoolStats
} from "./api";
import { wrap } from "./wrap";

const STATE_TOP = 0;
const STATE_END = 1;
const STATE_FREE = 2;
const STATE_USED = 3;

const STATE_NUM_FIELDS = 4;
const SIZEOF_STATE = STATE_NUM_FIELDS * Uint32Array.BYTES_PER_ELEMENT;


export class MemPool implements IMemPool {
    buf: ArrayBuffer;

    /**
     * Start is the anchor index inside the arraybuffer, so we can't save it inside the arraybuffer itself.
     * If you pass the ArrayBuffer to other consumers they must use the same start value
    */
    protected readonly start: number;

    protected doCompact: boolean;
    protected doSplit: boolean;
    protected minSplit: number;
    protected u8: Uint8Array;
    protected u32: Uint32Array;

    constructor(opts: Partial<MemPoolOpts> = {}) {
        this.buf = opts.buf ? opts.buf : new ArrayBuffer(opts.size || 0x1000);
        this.u8 = new Uint8Array(this.buf);
        this.doCompact = opts.compact !== false;
        this.doSplit = opts.split !== false;
        this.minSplit = opts.minSplit || 16;

        this.start = (opts.start != null ? align(Math.max(opts.start, 8), 8) : 8);
        this.u32 = new Uint32Array(this.buf, this.start);

        if (!opts.skipInitialization) {
            const resolvedEnd = opts.end != null
                ? Math.min(opts.end, this.buf.byteLength)
                : this.buf.byteLength;

            if (this.start >= resolvedEnd) {
                illegalArgs(
                    `invalid address range (0x${this.start.toString(
                        16
                    )} - 0x${resolvedEnd.toString(16)})`
                );
            }

            this.end = resolvedEnd;
            this.top = this.start + SIZEOF_STATE;
            this._free = null;
            this._used = null;
        }
    }



    protected get end(): number {
        return this.u32[STATE_END];
    }

    protected set end(value: number) {
        this.u32[STATE_END] = value;
    }

    protected get top(): number {
        return this.u32[STATE_TOP];
    }

    protected set top(value: number) {
        this.u32[STATE_TOP] = value;
    }

    protected get _free(): MemBlock | null {
        const freeAddress = this.u32[STATE_FREE];

        if (freeAddress == 0) {
            return null;
        }

        return new MemBlockWrapper(this.u32, freeAddress);
    }

    protected set _free(block: MemBlock | null) {
        this.u32[STATE_FREE] = block ? block.addr : 0;
    }

    protected get _used(): MemBlock | null {
        const usedAddress = this.u32[STATE_USED];

        if (usedAddress == 0) {
            return null;
        }

        return new MemBlockWrapper(this.u32, usedAddress);
    }

    protected set _used(block: MemBlock | null) {
        this.u32[STATE_USED] = block ? block.addr : 0;
    }


    stats(): MemPoolStats {
        const listStats = (block: MemBlock | null) => {
            let count = 0;
            let size = 0;
            while (block) {
                count++;
                size += block.size;
                block = block.next;
            }
            return { count, size };
        };
        const free = listStats(this._free);
        return {
            free,
            used: listStats(this._used),
            top: this.top,
            available: this.end - this.top + free.size,
            total: this.buf.byteLength
        };
    }

    callocAs(type: Type, num: number): TypedArray | undefined {
        const block = this.mallocAs(type, num);
        block && block.fill(0);
        return block;
    }

    mallocAs(type: Type, num: number): TypedArray | undefined {
        const addr = this.malloc(num * SIZEOF[type]);
        return addr ? wrap(type, this.buf, addr, num) : undefined;
    }

    calloc(size: number): number {
        const addr = this.malloc(size);
        addr && this.u8.fill(0, addr, align(addr + size, 8));
        return addr;
    }

    malloc(dataSize: number): number {
        if (dataSize <= 0) {
            return 0;
        }
        const memorySize = align(dataSize, 8) + MemBlockWrapper.OVERHEAD;
        let top = this.top;
        const end = this.end;
        let block = this._free;
        let prev = null;
        while (block) {
            const isTop = block.addr + block.size >= top;
            if (isTop || block.size >= memorySize) {
                if (isTop && block.addr + memorySize > end) {
                    return 0;
                }
                if (prev) {
                    prev.next = block.next;
                } else {
                    this._free = block.next;
                }
                block.next = this._used;
                this._used = block;
                if (isTop) {
                    block.size = memorySize;
                    this.top = block.addr + memorySize;
                } else if (this.doSplit) {
                    const excess = block.size - memorySize;
                    if (excess >= this.minSplit) {
                        block.size = memorySize;
                        const newBlock = new MemBlockWrapper(this.u32, block.addr + memorySize)
                        newBlock.size = excess;
                        newBlock.next = null;
                        this.insert(newBlock);
                        this.doCompact && this.compact();
                    }
                }
                return MemBlockWrapper.toDataAddress(block.addr);
            }
            prev = block;
            block = block.next;
        }
        const addr = align(top, 8);
        top = addr + memorySize;
        if (top <= end) {
            block = new MemBlockWrapper(this.u32, addr);
            block.size = memorySize;
            block.next = this._used;
            this._used = block;
            this.top = top;
            return MemBlockWrapper.toDataAddress(addr);
        }
        return 0;
    }

    realloc(dataAddr: number, size: number) {
        const memoryAddr = MemBlockWrapper.toMemoryAddress(dataAddr);

        if (size <= 0) {
            return 0;
        }
        size = align(size, 8);
        let block = this._used;
        let blockEnd = 0;
        let newAddr = 0;
        while (block) {
            if (block.addr === memoryAddr) {
                blockEnd = memoryAddr + block.size;
                const isTop = blockEnd >= this.top;
                // shrink & possibly split existing block
                if (size <= block.size) {
                    if (this.doSplit) {
                        const excess = block.size - size;
                        if (excess >= this.minSplit) {
                            block.size = size;
                            const newBlock = new MemBlockWrapper(this.u32, block.addr + size);
                            newBlock.size = excess;
                            newBlock.next = null;

                            this.insert(newBlock);
                            this.doCompact && this.compact();
                        } else if (isTop) {
                            this.top = memoryAddr + size;
                        }
                    } else if (isTop) {
                        this.top = memoryAddr + size;
                    }
                    newAddr = memoryAddr;
                    break;
                }
                // try to enlarge block if current top
                if (isTop && memoryAddr + size < this.end) {
                    block.size = size;
                    this.top = memoryAddr + size;
                    newAddr = memoryAddr;
                    break;
                }
                // fallback to free & malloc
                this.free(memoryAddr);
                newAddr = this.malloc(size);
                break;
            }
            block = block.next;
        }
        // copy old block contents to new addr
        if (newAddr && newAddr !== memoryAddr) {
            this.u8.copyWithin(newAddr, memoryAddr, blockEnd);
        }
        return MemBlockWrapper.toDataAddress(newAddr);
    }

    reallocArray(ptr: TypedArray, num: number): TypedArray | undefined {
        if (ptr.buffer !== this.buf) {
            return;
        }
        const addr = this.realloc(ptr.byteOffset, num * ptr.BYTES_PER_ELEMENT);
        return addr
            ? new (<any>ptr.constructor)(this.buf, addr, num)
            : undefined;
    }

    free(ptrDataAddressOrTypedArray: number | TypedArray) {
        let addr: number;
        if (!isNumber(ptrDataAddressOrTypedArray)) {
            if (ptrDataAddressOrTypedArray.buffer !== this.buf) {
                return false;
            }
            addr = MemBlockWrapper.toMemoryAddress(ptrDataAddressOrTypedArray.byteOffset);
        } else {
            addr = MemBlockWrapper.toMemoryAddress(ptrDataAddressOrTypedArray);
        }
        let block = this._used;
        let prev: MemBlock | null = null;
        while (block) {
            if (block.addr === addr) {
                if (prev) {
                    prev.next = block.next;
                } else {
                    this._used = block.next;
                }
                this.insert(block);
                this.doCompact && this.compact();
                return true;
            }
            prev = block;
            block = block.next;
        }
        return false;
    }

    freeAll() {
        this._free = null;
        this._used = null;
        this.top = this.start + SIZEOF_STATE;
    }

    release() {
        delete this.u8;
        delete this.u32;
        delete this.buf;

        return true;
    }

    protected compact() {
        let block = this._free;
        let prev: MemBlock | null = null;
        let scan: MemBlock | null = null;
        let scanPrev: MemBlock;
        let res = false;
        while (block) {
            scanPrev = block;
            scan = block.next;
            while (scan && scanPrev.addr + scanPrev.size === scan.addr) {
                // console.log("merge:", scan.addr, scan.size);
                scanPrev = scan;
                scan = scan.next;
            }
            if (scanPrev !== block) {
                const newSize = scanPrev.addr - block.addr + scanPrev.size;
                // console.log("merged size:", newSize);
                block.size = newSize;
                const next = scanPrev.next;
                let tmp = block.next;
                while (tmp && tmp !== scanPrev.next) {
                    // console.log("release:", tmp.addr);
                    const tn = tmp.next;
                    tmp.next = null;
                    tmp = tn;
                }
                block.next = next;
                res = true;
            }
            // re-adjust top if poss
            if (block.addr + block.size >= this.top) {
                this.top = block.addr;
                prev ? (prev.next = block.next) : (this._free = block.next);
            }
            prev = block;
            block = block.next;
        }
        return res;
    }

    protected insert(block: MemBlock) {
        let ptr = this._free;
        let prev: MemBlock | null = null;
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


const MEM_BLOCK_SIZE = 0;
const MEM_BLOCK_NEXT = 1;

const SIZEOF_MEM_BLOCK = 2 * Uint32Array.BYTES_PER_ELEMENT;

/**
 * All of the addresses that saved are the memory address, and not the data address.
 * The user see the data address, we need to convert them in and out
 */
class MemBlockWrapper implements MemBlock {
    public static OVERHEAD = SIZEOF_MEM_BLOCK;

    public static toDataAddress(blockAddress: number) {
        return blockAddress + SIZEOF_MEM_BLOCK;
    }

    public static toMemoryAddress(dataAddress: number) {
        return dataAddress - SIZEOF_MEM_BLOCK;
    }

    constructor(
        private u32: Uint32Array, 
        /**
         * This is the memory address, not the data address
         */
        public readonly addr: number) {}

    public get next(): MemBlock | null {
        if (this.nextAddress !== 0) {
            return new MemBlockWrapper(this.u32, this.nextAddress);
        }

        return null;
    }

    public set next(value: MemBlock | null) {
        this.nextAddress = value ? value.addr : 0;
    }

    public get size() {
        return this.u32[((this.addr - this.u32.byteOffset) >> 2) + MEM_BLOCK_SIZE];
    }

    public set size(value: number) {
        this.u32[((this.addr - this.u32.byteOffset) >> 2) + MEM_BLOCK_SIZE] = value;
    }
    
    private get nextAddress() {
        return this.u32[((this.addr - this.u32.byteOffset) >> 2) + MEM_BLOCK_NEXT];
    }

    private set nextAddress(value: number) {
        this.u32[((this.addr - this.u32.byteOffset) >> 2) + MEM_BLOCK_NEXT] = value;
    }
}
