import { SIZEOF, typedArray } from "@thi.ng/api";
import { align, Pow2 } from "@thi.ng/binary";
import { SOASpecs } from "./api";
import { SOA } from "./soa";
import { prepareSpec } from "./utils";

/**
 * Constructs SOA instance from given attrib specs and optional
 * ArrayBuffer (w/ optional start address / byte offset, which MUST be
 * properly pre-aligned). The resulting layout will be an interleaved
 * AOS buffer and each attrib's typed array is configured to map the
 * same array buffer from the given `byteOffset` (default: 0). If no
 * arraybuffer is given, a properly sized one will be created.
 *
 * First computes attrib offsets, alignments and the overall struct
 * size, then configures buffer views and strides for each attrib. This
 * is to ensure each attrib is correctly mapped in its buffer view (e.g.
 * float values need to be aligned to 4-byte boundaries). The overall
 * inter-struct packing/stride length is dependent on largest attrib
 * type used. E.g. the following specs will cause a stride length of 20
 * bytes between each resulting SOA element, even though the actual
 * struct size is only 18 bytes:
 *
 * ```
 * aos(
 *   4,
 *   {
 *     age: { type: Type.U16, size: 1 }, // 2 bytes, align 2
 *     pos: { type: Type.F32, size: 2 }, // 8 bytes, align 4
 *     vel: { type: Type.F32, size: 2 }, // 8 bytes, align 4
 *   }
 * );
 * ```
 *
 * @param num
 * @param specs
 * @param buf
 * @param byteOffset
 */
export const aos = <K extends string>(
    num: number,
    specs: SOASpecs<K>,
    buf?: ArrayBuffer,
    byteOffset = 0
) => {
    let total = 0;
    let maxSize = 0;
    const offsets = <Record<K, number>>{};
    const newSpecs = <SOASpecs<K>>{};
    for (let id in specs) {
        const spec = prepareSpec(specs[id]);
        const tsize = SIZEOF[spec.type!];
        maxSize = Math.max(maxSize, tsize);
        // align field to type size
        total = align(total, <Pow2>tsize);
        offsets[id] = total;
        total += tsize * spec.size!;
        newSpecs[id] = spec;
    }
    // align total struct size to largest type
    total = align(total, <Pow2>maxSize);
    buf = buf || new ArrayBuffer(total * num);
    for (let id in newSpecs) {
        const spec = newSpecs[id];
        const tsize = SIZEOF[spec.type!];
        spec.stride = total / tsize;
        spec.buf = typedArray(
            spec.type!,
            buf,
            byteOffset + offsets[id],
            (num * total - offsets[id]) / tsize
        );
    }
    return new SOA<K>(num, newSpecs);
};
