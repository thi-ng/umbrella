import { assert, SIZEOF, Type, TypedArray, typedArray } from "@thi.ng/api";
import { align, Pow2 } from "@thi.ng/binary";
import { isNumber } from "@thi.ng/checks";
import { illegalArgs } from "@thi.ng/errors";
import type { IMemPool, MemPoolOpts, MemPoolStats } from "./api";

const STATE_FREE = 0;
const STATE_USED = 1;
const STATE_TOP = 2;
const STATE_END = 3;
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
        this.start = opts.start != null ? align(Math.max(opts.start, 0), 4) : 0;
        this.u8 = new Uint8Array(this.buf);
        this.u32 = new Uint32Array(this.buf);
        this.state = new Uint32Array(this.buf, this.start, SIZEOF_STATE / 4);

        if (!opts.skipInitialization) {
            const _align = opts.align || 8;
            assert(
                _align >= 8,
                `invalid alignment: ${_align}, must be a pow2 and >= 8`
            );
            const top = this.initialTop(_align);
            const resolvedEnd =
                opts.end != null
                    ? Math.min(opts.end, this.buf.byteLength)
                    : this.buf.byteLength;

            if (top >= resolvedEnd) {
                illegalArgs(
                    `insufficient address range (0x${this.start.toString(
                        16
                    )} - 0x${resolvedEnd.toString(16)})`
                );
            }

            this.align = _align;
            this.doCompact = opts.compact !== false;
            this.doSplit = opts.split !== false;
            this.minSplit = opts.minSplit || 16;
            this.end = resolvedEnd;
            this.top = top;
            this._free = 0;
            this._used = 0;
        }
    }

    stats(): Readonly<MemPoolStats> {
        const listStats = (block: number) => {
            let count = 0;
            let size = 0;
            while (block) {
                count++;
                size += this.blockSize(block);
                block = this.blockNext(block);
            }
            return { count, size };
        };
        const free = listStats(this._free);
        return {
            free,
            used: listStats(this._used),
            top: this.top,
            available: this.end - this.top + free.size,
            total: this.buf.byteLength,
        };
    }

    callocAs<T extends Type>(type: T, num: number, fill = 0) {
        const block = this.mallocAs(type, num);
        block && block.fill(fill);
        return block;
    }

    mallocAs<T extends Type>(type: T, num: number) {
        const addr = this.malloc(num * SIZEOF[type]);
        return addr ? typedArray(type, this.buf, addr, num) : undefined;
    }

    calloc(bytes: number, fill = 0) {
        const addr = this.malloc(bytes);
        addr && this.u8.fill(fill, addr, addr + bytes);
        return addr;
    }

    malloc(bytes: number) {
        if (bytes <= 0) {
            return 0;
        }
        const paddedSize = align(bytes + SIZEOF_MEM_BLOCK, this.align);
        const end = this.end;
        let top = this.top;
        let block = this._free;
        let prev = 0;
        while (block) {
            const blockSize = this.blockSize(block);
            const isTop = block + blockSize >= top;
            if (isTop || blockSize >= paddedSize) {
                if (isTop && block + paddedSize > end) {
                    return 0;
                }
                if (prev) {
                    this.unlinkBlock(prev, block);
                } else {
                    this._free = this.blockNext(block);
                }
                this.setBlockNext(block, this._used);
                this._used = block;
                if (isTop) {
                    this.top = block + this.setBlockSize(block, paddedSize);
                } else if (this.doSplit) {
                    const excess = blockSize - paddedSize;
                    excess >= this.minSplit &&
                        this.splitBlock(block, paddedSize, excess);
                }
                return blockDataAddress(block);
            }
            prev = block;
            block = this.blockNext(block);
        }
        block = top;
        top = block + paddedSize;
        if (top <= end) {
            this.initBlock(block, paddedSize, this._used);
            this._used = block;
            this.top = top;
            return blockDataAddress(block);
        }
        return 0;
    }

    realloc(ptr: number, bytes: number) {
        if (bytes <= 0) {
            return 0;
        }
        const oldAddr = blockSelfAddress(ptr);
        let newAddr = 0;
        let block = this._used;
        let blockEnd = 0;
        while (block) {
            if (block === oldAddr) {
                const blockSize = this.blockSize(block);
                blockEnd = oldAddr + blockSize;
                const isTop = blockEnd >= this.top;
                const paddedSize = align(bytes + SIZEOF_MEM_BLOCK, this.align);
                // shrink & possibly split existing block
                if (paddedSize <= blockSize) {
                    if (this.doSplit) {
                        const excess = blockSize - paddedSize;
                        if (excess >= this.minSplit) {
                            this.splitBlock(block, paddedSize, excess);
                        } else if (isTop) {
                            this.top = oldAddr + paddedSize;
                        }
                    } else if (isTop) {
                        this.top = oldAddr + paddedSize;
                    }
                    newAddr = oldAddr;
                    break;
                }
                // try to enlarge block if current top
                if (isTop && oldAddr + paddedSize < this.end) {
                    this.top = oldAddr + this.setBlockSize(block, paddedSize);
                    newAddr = oldAddr;
                    break;
                }
                // fallback to free & malloc
                this.free(oldAddr);
                newAddr = blockSelfAddress(this.malloc(bytes));
                break;
            }
            block = this.blockNext(block);
        }
        // copy old block contents to new addr
        if (newAddr && newAddr !== oldAddr) {
            this.u8.copyWithin(
                blockDataAddress(newAddr),
                blockDataAddress(oldAddr),
                blockEnd
            );
        }
        return blockDataAddress(newAddr);
    }

    reallocArray<T extends TypedArray>(array: T, num: number): T | undefined {
        if (array.buffer !== this.buf) {
            return;
        }
        const addr = this.realloc(
            array.byteOffset,
            num * array.BYTES_PER_ELEMENT
        );
        return addr
            ? new (<any>array.constructor)(this.buf, addr, num)
            : undefined;
    }

    free(ptrOrArray: number | TypedArray) {
        let addr: number;
        if (!isNumber(ptrOrArray)) {
            if (ptrOrArray.buffer !== this.buf) {
                return false;
            }
            addr = ptrOrArray.byteOffset;
        } else {
            addr = ptrOrArray;
        }
        addr = blockSelfAddress(addr);
        let block = this._used;
        let prev = 0;
        while (block) {
            if (block === addr) {
                if (prev) {
                    this.unlinkBlock(prev, block);
                } else {
                    this._used = this.blockNext(block);
                }
                this.insert(block);
                this.doCompact && this.compact();
                return true;
            }
            prev = block;
            block = this.blockNext(block);
        }
        return false;
    }

    freeAll() {
        this._free = 0;
        this._used = 0;
        this.top = this.initialTop();
    }

    release() {
        delete (<any>this).u8;
        delete (<any>this).u32;
        delete (<any>this).state;
        delete (<any>this).buf;
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

    protected get _free() {
        return this.state[STATE_FREE];
    }

    protected set _free(block: number) {
        this.state[STATE_FREE] = block;
    }

    protected get _used() {
        return this.state[STATE_USED];
    }

    protected set _used(block: number) {
        this.state[STATE_USED] = block;
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
            `illegal min split threshold: ${x}, require at least ${
                SIZEOF_MEM_BLOCK + 1
            }`
        );
        this.state[STATE_MIN_SPLIT] = x;
    }

    protected blockSize(block: number) {
        return this.u32[(block >> 2) + MEM_BLOCK_SIZE];
    }

    /**
     * Sets & returns given block size.
     *
     * @param block -
     * @param size -
     */
    protected setBlockSize(block: number, size: number) {
        this.u32[(block >> 2) + MEM_BLOCK_SIZE] = size;
        return size;
    }

    protected blockNext(block: number) {
        return this.u32[(block >> 2) + MEM_BLOCK_NEXT];
    }

    /**
     * Sets block next pointer to `next`. Use zero to indicate list end.
     *
     * @param block -
     */
    protected setBlockNext(block: number, next: number) {
        this.u32[(block >> 2) + MEM_BLOCK_NEXT] = next;
    }

    /**
     * Initializes block header with given `size` and `next` pointer. Returns `block`.
     *
     * @param block -
     * @param size -
     * @param next -
     */
    protected initBlock(block: number, size: number, next: number) {
        const idx = block >>> 2;
        this.u32[idx + MEM_BLOCK_SIZE] = size;
        this.u32[idx + MEM_BLOCK_NEXT] = next;
        return block;
    }

    protected unlinkBlock(prev: number, block: number) {
        this.setBlockNext(prev, this.blockNext(block));
    }

    protected splitBlock(block: number, blockSize: number, excess: number) {
        this.insert(
            this.initBlock(
                block + this.setBlockSize(block, blockSize),
                excess,
                0
            )
        );
        this.doCompact && this.compact();
    }

    protected initialTop(_align = this.align) {
        return (
            align(this.start + SIZEOF_STATE + SIZEOF_MEM_BLOCK, _align) -
            SIZEOF_MEM_BLOCK
        );
    }

    /**
     * Traverses free list and attempts to recursively merge blocks
     * occupying consecutive memory regions. Returns true if any blocks
     * have been merged. Only called if `compact` option is enabled.
     */
    protected compact() {
        let block = this._free;
        let prev = 0;
        let scan = 0;
        let scanPrev: number;
        let res = false;
        while (block) {
            scanPrev = block;
            scan = this.blockNext(block);
            while (scan && scanPrev + this.blockSize(scanPrev) === scan) {
                // console.log("merge:", scan.addr, scan.size);
                scanPrev = scan;
                scan = this.blockNext(scan);
            }
            if (scanPrev !== block) {
                const newSize = scanPrev - block + this.blockSize(scanPrev);
                // console.log("merged size:", newSize);
                this.setBlockSize(block, newSize);
                const next = this.blockNext(scanPrev);
                let tmp = this.blockNext(block);
                while (tmp && tmp !== next) {
                    // console.log("release:", tmp.addr);
                    const tn = this.blockNext(tmp);
                    this.setBlockNext(tmp, 0);
                    tmp = tn;
                }
                this.setBlockNext(block, next);
                res = true;
            }
            // re-adjust top if poss
            if (block + this.blockSize(block) >= this.top) {
                this.top = block;
                prev
                    ? this.unlinkBlock(prev, block)
                    : (this._free = this.blockNext(block));
            }
            prev = block;
            block = this.blockNext(block);
        }
        return res;
    }

    /**
     * Inserts given block into list of free blocks, sorted by address.
     *
     * @param block -
     */
    protected insert(block: number) {
        let ptr = this._free;
        let prev = 0;
        while (ptr) {
            if (block <= ptr) break;
            prev = ptr;
            ptr = this.blockNext(ptr);
        }
        if (prev) {
            this.setBlockNext(prev, block);
        } else {
            this._free = block;
        }
        this.setBlockNext(block, ptr);
    }
}

/**
 * Returns a block's data address, based on given alignment.
 *
 * @param blockAddress -
 */
const blockDataAddress = (blockAddress: number) =>
    blockAddress + SIZEOF_MEM_BLOCK;

/**
 * Returns block start address for given data address and alignment.
 *
 * @param dataAddress -
 */
const blockSelfAddress = (dataAddress: number) =>
    dataAddress - SIZEOF_MEM_BLOCK;
