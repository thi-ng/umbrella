import { U8, U32 } from "@thi.ng/strings/radix";

import { Transducer } from "../api";

import { comp } from "../func/comp";
import { juxt } from "../func/juxt";

import { map } from "./map";
import { mapIndexed } from "./map-indexed";
import { padLast } from "./pad-last";
import { partition } from "./partition";

/**
 * Transforms bytes into a sequence of hexdump lines with configurable
 * number of `columns` and `address` offset. Uses `partition()` internally,
 * so new lines are only produced once filled. If the input hasn't an exact
 * multiple of `cols` bytes, the last line will be padded with zeroes.
 *
 * ```
 * src = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 33, 48, 49, 50, 51, 126, 122, 121, 120]
 *
 * [...iterator(hexDump(8, 0x400), src)]
 * // [ '00000400 | 41 42 43 44 45 46 47 48 | ABCDEFGH',
 * //   '00000408 | 49 4a 21 30 31 32 33 7e | IJ!0123~',
 * //   '00000410 | 7a 79 78 00 00 00 00 00 | zyx.....' ]
 * ```
 * @param cols
 * @param addr
 */
export function hexDump(cols = 16, addr = 0): Transducer<number, string> {
    return comp(
        padLast(cols, 0),
        map(juxt(U8, (x) => x > 31 && x < 128 ? String.fromCharCode(x) : ".")),
        partition(cols, true),
        map(
            juxt(
                (x) => x.map(y => y[0]).join(" "),
                (x) => x.map(y => y[1]).join("")
            )
        ),
        mapIndexed((i, [h, a]) => `${U32(addr + i * cols)} | ${h} | ${a}`)
    );
}
