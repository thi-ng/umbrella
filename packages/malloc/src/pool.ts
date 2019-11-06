import {
    assert,
    SIZEOF,
    Type,
    TypedArray
} from "@thi.ng/api";
import { align, isPow2, Pow2 } from "@thi.ng/binary";
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
const STATE_ALIGN = 4;
const STATE_FLAGS = 5;
const STATE_MIN_SPLIT = 6;

const MASK_COMPACT = 1;
const MASK_SPLIT = 2;

const SIZEOF_STATE = 7 * 4;

const MEM_BLOCK_SIZE = 0;
const MEM_BLOCK_NEXT = 1;

const SIZEOF_MEM_BLOCK = 2 * 4;

export class MemPool implements IMemPool {
    buf: ArrayBufferLike;

    protected readonly start: number;
    protected u8: Uint8Array;
    protected u32: Uint32Array;
    protected state: Uint32Array;

    constructor(opts: Partial<MemPoolOpts> = {}) {
        this.buf = opts.buf ? opts.buf : new ArrayBuffer(opts.size || 0x1000);

        const _align = opts.align || 8;
        assert(
            _align >= 8 && isPow2(_align),
            `invalid alignment: ${_align}, must be a pow2 and >= 8`
        );

        this.start = opts.start != null ? align(Math.max(opts.start, 0), 4) : 0;
        this.u8 = new Uint8Array(this.buf);
        this.u32 = new Uint32Array(this.buf);
        this.state = new Uint32Array(this.buf, this.start, SIZEOF_STATE / 4);

        if (!opts.skipInitialization) {
            const top = align(this.start + SIZEOF_STATE, _align);
            const resolvedEnd =
                opts.end != null
                    ? Math.min(opts.end, this.buf.byteLength)
                    : this.buf.byteLength;

            if (top >= resolvedEnd) {
                illegalArgs(
                    `invalid address range (0x${this.start.toString(
                        16
                    )} - 0x${resolvedEnd.toString(16)})`
                );
            }

            this.align = <Pow2>_align;
            this.doCompact = opts.compact !== false;
            this.doSplit = opts.split !== false;
            this.minSplit = opts.minSplit || 16;
            this.end = resolvedEnd;
            this.top = top;
            this._free = null;
            this._used = null;
        }
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
        addr && this.u8.fill(0, addr, align(addr + size, this.align));
        return addr;
    }

    malloc(dataSize: number): number {
        if (dataSize <= 0) {
            return 0;
        }
        const memorySize = align(dataSize + SIZEOF_MEM_BLOCK, this.align);
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
                        const newBlock = new MemBlockWrapper(
                            this.u32,
                            block.addr + memorySize
                        );
                        newBlock.size = excess;
                        newBlock.next = null;
                        this.insert(newBlock);
                        this.doCompact && this.compact();
                    }
                }
                return toDataAddress(block.addr, this.align);
            }
            prev = block;
            block = block.next;
        }
        const addr = align(top, this.align);
        top = addr + memorySize;
        if (top <= end) {
            block = new MemBlockWrapper(this.u32, addr);
            block.size = memorySize;
            block.next = this._used;
            this._used = block;
            this.top = top;
            return toDataAddress(addr, this.align);
        }
        return 0;
    }

    realloc(dataAddr: number, size: number) {
        const memoryAddr = toMemoryAddress(dataAddr, this.align);
        if (size <= 0) {
            return 0;
        }
        size = align(size, this.align);
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
                            const newBlock = new MemBlockWrapper(
                                this.u32,
                                block.addr + size
                            );
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
        return toDataAddress(newAddr, this.align);
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
            addr = toMemoryAddress(
                ptrDataAddressOrTypedArray.byteOffset,
                this.align
            );
        } else {
            addr = toMemoryAddress(ptrDataAddressOrTypedArray, this.align);
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
        this.top = align(this.start + SIZEOF_STATE, this.align);
    }

    release() {
        delete this.u8;
        delete this.u32;
        delete this.state;
        delete this.buf;

        return true;
    }

    protected get align() {
        return <Pow2>this.state[STATE_ALIGN];
    }

    protected set align(x: Pow2) {
        this.state[STATE_ALIGN] = x;
    }

    protected get end() {
        return this.state[STATE_END];
    }

    protected set end(x: number) {
        this.state[STATE_END] = x;
    }

    protected get top() {
        return this.state[STATE_TOP];
    }

    protected set top(x: number) {
        this.state[STATE_TOP] = x;
    }

    protected get _free(): MemBlock | null {
        const freeAddress = this.state[STATE_FREE];
        return freeAddress !== 0
            ? new MemBlockWrapper(this.u32, freeAddress)
            : null;
    }

    protected set _free(block: MemBlock | null) {
        this.state[STATE_FREE] = block ? block.addr : 0;
    }

    protected get _used(): MemBlock | null {
        const usedAddress = this.state[STATE_USED];
        return usedAddress !== 0
            ? new MemBlockWrapper(this.u32, usedAddress)
            : null;
    }

    protected set _used(block: MemBlock | null) {
        this.state[STATE_USED] = block ? block.addr : 0;
    }

    protected get doCompact() {
        return !!(this.state[STATE_FLAGS] & MASK_COMPACT);
    }

    protected set doCompact(flag: boolean) {
        flag
            ? (this.state[STATE_FLAGS] |= 1 << (MASK_COMPACT - 1))
            : (this.state[STATE_FLAGS] &= ~MASK_COMPACT);
    }

    protected get doSplit() {
        return !!(this.state[STATE_FLAGS] & MASK_SPLIT);
    }

    protected set doSplit(flag: boolean) {
        flag
            ? (this.state[STATE_FLAGS] |= 1 << (MASK_SPLIT - 1))
            : (this.state[STATE_FLAGS] &= ~MASK_SPLIT);
    }

    protected get minSplit() {
        return this.state[STATE_MIN_SPLIT];
    }

    protected set minSplit(x: number) {
        assert(
            x > SIZEOF_MEM_BLOCK,
            `illegal min split threshold: ${x}, require at least ${SIZEOF_MEM_BLOCK}`
        );
        this.state[STATE_MIN_SPLIT] = x;
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

/**
 * The class acts as a fat pointer. All addresses saved in `_free` /
 * `_used` lists are those of each memory block, NOT the block's data
 * addresses, which are `align(SIZEOF_MEM_BLOCK, poolAlign)` after.
 * Users will only ever see the data addresses...
 *
 * TODO There's still scope avoiding this class altogether and replace
 * with plain functions and so avoid construction of various temp
 * objects during free/compaction...
 */
class MemBlockWrapper implements MemBlock {
    constructor(
        private u32: Uint32Array,
        /**
         * This is the memory address, not the data address
         */
        public readonly addr: number
    ) {}

    get next(): MemBlock | null {
        return this.nextAddress !== 0
            ? new MemBlockWrapper(this.u32, this.nextAddress)
            : null;
    }

    set next(value: MemBlock | null) {
        this.nextAddress = value ? value.addr : 0;
    }

    get size() {
        return this.u32[(this.addr >> 2) + MEM_BLOCK_SIZE];
    }

    set size(value: number) {
        this.u32[(this.addr >> 2) + MEM_BLOCK_SIZE] = value;
    }

    private get nextAddress() {
        return this.u32[(this.addr >> 2) + MEM_BLOCK_NEXT];
    }

    private set nextAddress(value: number) {
        this.u32[(this.addr >> 2) + MEM_BLOCK_NEXT] = value;
    }
}

/**
 * Returns a block's data address, based on given alignment.
 *
 * @param blockAddress
 * @param _align
 */
const toDataAddress = (blockAddress: number, _align: Pow2) =>
    blockAddress + align(SIZEOF_MEM_BLOCK, _align);

/**
 * Returns block start address for given data address and alignment.
 *
 * @param blockAddress
 * @param _align
 */
const toMemoryAddress = (dataAddress: number, _align: Pow2) =>
    dataAddress - align(SIZEOF_MEM_BLOCK, _align);
