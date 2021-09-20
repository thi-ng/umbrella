import type { Fn, IObjectOf } from "@thi.ng/api";
import { assert } from "@thi.ng/api/assert";
import { f32u16, f32u24, f32u32, f32u8 } from "@thi.ng/binary/float";
import type { BinStructItem } from "@thi.ng/transducers-binary";
import {
    asBytes,
    bytes,
    u16,
    u24,
    u32,
    u8,
} from "@thi.ng/transducers-binary/bytes";
import { comp } from "@thi.ng/transducers/comp";
import { concat } from "@thi.ng/transducers/concat";
import { iterator } from "@thi.ng/transducers/iterator";
import { map } from "@thi.ng/transducers/map";
import { reduce } from "@thi.ng/transducers/reduce";
import { take } from "@thi.ng/transducers/take";
import type { WavSpec } from "./api";

const HEADER_SIZE = 44;

const CONVERTERS: IObjectOf<Fn<number, BinStructItem>> = {
    8: (x: number) => u8(f32u8(x)),
    16: (x: number) => u16(f32u16(x), true),
    24: (x: number) => u24(f32u24(x), true),
    32: (x: number) => u32(f32u32(x), true),
};

export const wavHeader = (spec: WavSpec): BinStructItem[] => {
    const bytesPerSample = spec.bits >> 3;
    const blockAlign = spec.channels * bytesPerSample;
    const dataLength = spec.length * blockAlign;
    return [
        u32(0x52494646, false), // 'RIFF'
        u32(dataLength + HEADER_SIZE - 8, true), // riff len
        u32(0x57415645, false), // 'WAVE'
        u32(0x666d7420, false), // 'fmt '
        u32(16, true), // fmt len,
        u16(1, true), // audio format id
        u16(spec.channels, true),
        u32(spec.sampleRate, true),
        u32(spec.sampleRate * blockAlign, true), // byte rate
        u16(blockAlign, true),
        u16(spec.bits, true),
        u32(0x64617461, false), // 'data'
        u32(dataLength, true),
    ];
};

/**
 * Takes a {@link WavSpec} and iterable of normalized float samples,
 * creates WAV format header, converts samples to specified bit depth
 * and returns `Uint8Array` of complete WAV file, ready for export.
 *
 * @remarks
 * If using more than one channel, the source samples need to be already
 * interleaved, i.e. for stereo: left, right, left, right etc.
 *
 * At most, only the number of samples specified in the given header
 * spec are consumed & written. The source iterable does not need to be
 * limited explicitly.
 *
 * @example
 * ```ts
 * import { osc, sin } from "@thi.ng/dsp";
 *
 * const FS = 48000;
 *
 * // write 1 second 24bit mono WAV file, 440Hz sine
 * fs.writeFileSync(
 *   "sine-440.wav",
 *   wavByteArray(
 *     { sampleRate: FS, channels: 1, length: FS, bits: 24 },
 *     osc(sin, 440 / FS)
 *   )
 * )
 * ```
 *
 * @param spec
 * @param src
 */
export const wavByteArray = (spec: WavSpec, src: Iterable<number>) => {
    const convert = CONVERTERS[spec.bits];
    assert(!!convert, `unsupported bits/sample: ${spec.bits}`);
    return reduce(
        bytes(),
        new Uint8Array(
            HEADER_SIZE + spec.length * spec.channels * (spec.bits >> 3)
        ),
        concat(
            wavHeader(spec),
            iterator(comp(take(spec.length * spec.channels), map(convert)), src)
        )
    );
};

/**
 * Similar to {@link wavByteArray}, but yields an iterator of the result
 * bytes, not an actual byte array.
 *
 * @param spec
 * @param src
 */
export const wavBytes = (spec: WavSpec, src: Iterable<number>) => {
    const convert = CONVERTERS[spec.bits];
    assert(!!convert, `unsupported bits/sample: ${spec.bits}`);
    return asBytes(
        concat(
            wavHeader(spec),
            iterator(comp(take(spec.length * spec.channels), map(convert)), src)
        )
    );
};
