import {
    assert,
    SIZEOF,
    Type,
    TypedArray,
    typedArray
} from "@thi.ng/api";
import { align, isPow2, Pow2 } from "@thi.ng/binary";
import { isNumber } from "@thi.ng/checks";
import { illegalArgs } from "@thi.ng/errors";
import { IMemPool, MemPoolOpts, MemPoolStats } from "./api";

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
            this._free = 0;
            this._used = 0;
        }
    }

    stats(): MemPoolStats {
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
            total: this.buf.byteLength
        };
    }

    callocAs<T extends Type>(type: T, num: number) {
        const block = this.mallocAs(type, num);
        block && block.fill(0);
        return block;
    }

    mallocAs<T extends Type>(type: T, num: number) {
        const addr = this.malloc(num * SIZEOF[type]);
        return addr ? typedArray(type, this.buf, addr, num) : undefined;
    }

    calloc(size: number) {
        const addr = this.malloc(size);
        addr && this.u8.fill(0, addr, align(addr + size, this.align));
        return addr;
    }

    malloc(dataSize: number) {
        if (dataSize <= 0) {
            return 0;
        }
        const memorySize = align(dataSize + SIZEOF_MEM_BLOCK, this.align);
        let top = this.top;
        const end = this.end;
        let block = this._free;
        let prev = 0;
        while (block) {
            const isTop = block + this.blockSize(block) >= top;
            if (isTop || this.blockSize(block) >= memorySize) {
                if (isTop && block + memorySize > end) {
                    return 0;
                }
                if (prev) {
                    this.setBlockNext(prev, this.blockNext(block));
                } else {
                    this._free = this.blockNext(block);
                }
                this.setBlockNext(block, this._used);
                this._used = block;
                if (isTop) {
                    this.setBlockSize(block, memorySize);
                    this.top = block + memorySize;
                } else if (this.doSplit) {
                    const excess = this.blockSize(block) - memorySize;
                    if (excess >= this.minSplit) {
                        this.setBlockSize(block, memorySize);
                        const newBlock = block + memorySize;
                        this.setBlockSize(newBlock, excess);
                        this.setBlockNext(newBlock, 0);
                        this.insert(newBlock);
                        this.doCompact && this.compact();
                    }
                }
                return blockDataAddress(block, this.align);
            }
            prev = block;
            block = this.blockNext(block);
        }
        const addr = align(top, this.align);
        top = addr + memorySize;
        if (top <= end) {
            block = addr;
            this.setBlockSize(block, memorySize);
            this.setBlockNext(block, this._used);
            this._used = block;
            this.top = top;
            return blockDataAddress(block, this.align);
        }
        return 0;
    }

    realloc(dataAddr: number, size: number) {
        const memoryAddr = blockSelfAddress(dataAddr, this.align);
        if (size <= 0) {
            return 0;
        }
        size = align(size, this.align);
        let block = this._used;
        let blockEnd = 0;
        let newAddr = 0;
        while (block) {
            if (block === memoryAddr) {
                blockEnd = memoryAddr + this.blockSize(block);
                const isTop = blockEnd >= this.top;
                // shrink & possibly split existing block
                if (size <= this.blockSize(block)) {
                    if (this.doSplit) {
                        const excess = this.blockSize(block) - size;
                        if (excess >= this.minSplit) {
                            this.setBlockSize(block, size);
                            const newBlock = block + size;
                            this.setBlockSize(newBlock, excess);
                            this.setBlockNext(newBlock, 0);
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
                    this.setBlockSize(block, size);
                    this.top = memoryAddr + size;
                    newAddr = memoryAddr;
                    break;
                }
                // fallback to free & malloc
                this.free(memoryAddr);
                newAddr = this.malloc(size);
                break;
            }
            block = this.blockNext(block);
        }
        // copy old block contents to new addr
        if (newAddr && newAddr !== memoryAddr) {
            this.u8.copyWithin(newAddr, memoryAddr, blockEnd);
        }
        return blockDataAddress(newAddr, this.align);
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
            addr = blockSelfAddress(
                ptrDataAddressOrTypedArray.byteOffset,
                this.align
            );
        } else {
            addr = blockSelfAddress(ptrDataAddressOrTypedArray, this.align);
        }
        let block = this._used;
        let prev = 0;
        while (block) {
            if (block === addr) {
                if (prev) {
                    this.setBlockNext(prev, this.blockNext(block));
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
            `illegal min split threshold: ${x}, require at least ${SIZEOF_MEM_BLOCK}`
        );
        this.state[STATE_MIN_SPLIT] = x;
    }

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
                while (tmp && tmp !== this.blockNext(scanPrev)) {
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
                    ? this.setBlockNext(prev, this.blockNext(block))
                    : (this._free = this.blockNext(block));
            }
            prev = block;
            block = this.blockNext(block);
        }
        return res;
    }

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

    protected blockSize(block: number) {
        return this.u32[(block >> 2) + MEM_BLOCK_SIZE];
    }

    protected setBlockSize(block: number, size: number) {
        this.u32[(block >> 2) + MEM_BLOCK_SIZE] = size;
    }

    protected blockNext(block: number) {
        return this.u32[(block >> 2) + MEM_BLOCK_NEXT];
    }

    protected setBlockNext(block: number, next: number) {
        this.u32[(block >> 2) + MEM_BLOCK_NEXT] = next;
    }
}

/**
 * Returns a block's data address, based on given alignment.
 *
 * @param blockAddress
 * @param _align
 */
const blockDataAddress = (blockAddress: number, _align: Pow2) =>
    blockAddress + align(SIZEOF_MEM_BLOCK, _align);

/**
 * Returns block start address for given data address and alignment.
 *
 * @param blockAddress
 * @param _align
 */
const blockSelfAddress = (dataAddress: number, _align: Pow2) =>
    dataAddress - align(SIZEOF_MEM_BLOCK, _align);
