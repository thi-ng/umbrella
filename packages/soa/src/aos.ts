import { SIZEOF } from "@thi.ng/api/typedarray";
import type { Pow2 } from "@thi.ng/binary";
import { align } from "@thi.ng/binary/align";
import type { AOSSpecs, SOASpecs } from "./api";
import { SOA } from "./soa";
import { prepareSpec } from "./utils";

/**
 * Constructs SOA instance from given attrib specs and optional
 * ArrayBuffer (w/ optional start address / byte offset, which MUST be
 * properly pre-aligned). The resulting layout will be an underlying
 * interleaved AOS buffer with each attrib configured to map that same
 * array buffer relative to the given `byteOffset` (default: 0). If no
 * array buffer is given, a properly sized one will be created.
 *
 * First computes attrib offsets, alignments and the overall struct
 * size, then configures buffer views and strides for each attrib. This
 * is to ensure each attrib is correctly mapped in its buffer view (e.g.
 * float values need to be aligned to 4-byte boundaries). The overall
 * inter-struct packing/stride length is dependent on the largest attrib
 * type used. E.g. the following specs will cause a stride length of 16
 * bytes between each resulting SOA element, even though the actual
 * struct size is only 13 bytes:
 *
 * @example
 * ```ts
 * aos(
 *   1024,
 *   {
 *     a: { type: "u16", size: 1 }, // 2 bytes, align 2, offset 0
 *     b: { type: "f32", size: 2 }, // 8 bytes, align 4, offset 4
 *     c: { type: "u8", size: 1 },  // 1 byte,  align 1, offset 12
 *   }
 * );
 * ```
 *
 * @param num -
 * @param specs -
 * @param buf -
 * @param byteOffset -
 */
export const aos = <K extends string>(
    num: number,
    specs: AOSSpecs<K>,
    buf?: ArrayBuffer,
    byteOffset = 0
) => {
    let total = 0;
    let maxSize = 0;
    const offsets = <Record<K, number>>{};
    const soaSpecs = <SOASpecs<K>>{};
    for (let id in specs) {
        const spec = prepareSpec(specs[id]);
        const tsize = SIZEOF[spec.type!];
        maxSize = Math.max(maxSize, tsize);
        // align field to type size
        total = align(total, <Pow2>tsize);
        offsets[id] = total;
        total += tsize * spec.size!;
        soaSpecs[id] = spec;
    }
    // align total struct size to largest type
    total = align(total, <Pow2>maxSize);
    buf = buf || new ArrayBuffer(total * num + byteOffset);
    for (let id in soaSpecs) {
        const spec = soaSpecs[id];
        const tsize = SIZEOF[spec.type!];
        spec.stride = total / tsize;
        spec.buf = buf;
        spec.byteOffset = byteOffset + offsets[id];
    }
    return new SOA<K>(num, soaSpecs);
};
