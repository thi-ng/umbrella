import { juxt } from "@thi.ng/compose/juxt";
import { U32, U8 } from "@thi.ng/hex";
import type { Transducer } from "@thi.ng/transducers";
import { comp } from "@thi.ng/transducers/func/comp";
import { $iter, iterator } from "@thi.ng/transducers/iterator";
import { map } from "@thi.ng/transducers/xform/map";
import { mapIndexed } from "@thi.ng/transducers/xform/map-indexed";
import { padLast } from "@thi.ng/transducers/xform/pad-last";
import { partition } from "@thi.ng/transducers/xform/partition";
import type { HexDumpOpts } from "./api";

/**
 * Transforms bytes into a sequence of hexdump lines with configurable
 * number of `columns` and `address` offset. Uses
 * {@link @thi.ng/transducers#(partition:1)} internally, so new lines
 * are only produced once filled. If the input hasn't an exact multiple
 * of `cols` bytes, the last line will be padded with zeroes.
 *
 * @example
 * ```ts
 * src = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 33, 48, 49, 50, 51, 126, 122, 121, 120]
 *
 * [...hexDump({ cols: 8, address: 0x400 }, src)]
 * // [ '00000400 | 41 42 43 44 45 46 47 48 | ABCDEFGH',
 * //   '00000408 | 49 4a 21 30 31 32 33 7e | IJ!0123~',
 * //   '00000410 | 7a 79 78 00 00 00 00 00 | zyx.....' ]
 * ```
 * @param opts -
 * @param src -
 */
export function hexDump(
    opts?: Partial<HexDumpOpts>
): Transducer<number, string>;
export function hexDump(src: Iterable<number>): IterableIterator<string>;
export function hexDump(
    opts: Partial<HexDumpOpts>,
    src: Iterable<number>
): IterableIterator<string>;
export function hexDump(...args: any[]): any {
    const iter = $iter(hexDump, args, iterator);
    if (iter) {
        return iter;
    }
    const { cols, address } = <HexDumpOpts>{ cols: 16, address: 0, ...args[0] };
    return comp(
        padLast(cols, 0),
        map(
            juxt(U8, (x) => (x > 31 && x < 127 ? String.fromCharCode(x) : "."))
        ),
        partition(cols, true),
        map(
            juxt(
                (x: string[][]) => x.map((y) => y[0]).join(" "),
                (x: string[][]) => x.map((y) => y[1]).join("")
            )
        ),
        mapIndexed((i, [h, a]) => `${U32(address + i * cols)} | ${h} | ${a}`)
    );
}

/**
 * Convenience wrapper for {@link hexDump}, return the hexdump as a
 * single result string.
 *
 * @param opts -
 * @param src -
 */
export const hexDumpString = (
    opts: Partial<HexDumpOpts>,
    src: Iterable<number>
) => [...hexDump(opts, src)].join("\n");
