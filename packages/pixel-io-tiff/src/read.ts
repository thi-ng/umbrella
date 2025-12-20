import type { Maybe } from "@thi.ng/api";
import {
	typedArray,
	type NumericArray,
	type UIntArray,
} from "@thi.ng/api/typedarray";
import { DATAVIEW as DV } from "@thi.ng/binary/endianess";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { unsupportedFeature as unsupported } from "@thi.ng/errors/unsupported";
import { ARGB8888 } from "@thi.ng/pixel/format/argb8888";
import { GRAY_ALPHA16 } from "@thi.ng/pixel/format/gray-alpha16";
import { GRAY_ALPHA8 } from "@thi.ng/pixel/format/gray-alpha8";
import { GRAY16 } from "@thi.ng/pixel/format/gray16";
import { GRAY8 } from "@thi.ng/pixel/format/gray8";
import { RGB888 } from "@thi.ng/pixel/format/rgb888";
import { intBuffer } from "@thi.ng/pixel/int";
import {
	Compression,
	Exif,
	PhotoMode,
	Tag,
	type IFD,
	type IFDEntry,
	type IFDOpts,
} from "./api.js";

const DECODER = new TextDecoder();

export const readTIFF = async (buf: Uint8Array, ifd?: IFD) => {
	ifd = ifd || readIFDs(buf, { all: false })[0];
	const compression = <number>ifd[Tag.Compression]?.[0] ?? 1;
	const photoMode = <number>ifd[Tag.PhotometricInterpretation]?.[0] ?? 1;
	const planarConf = <number>ifd[Tag.PlanarConfiguration]?.[0] ?? 1;
	if (photoMode >= 3)
		unsupported(`photometric interpretation mode ${photoMode}`);
	if (planarConf >= 2) unsupported(`planar configuration ${planarConf}`);
	if (![Compression.Uncompressed, Compression.Deflate].includes(compression))
		unsupported(`compression mode ${compression}`);
	const { width, height, spp, bpp } = __imageMeta(ifd);
	const pixels: UIntArray = typedArray(
		bpp === 16 ? "u16" : "u8",
		width * height * spp
	);
	if (ifd[Tag.TileWidth] && ifd[Tag.TileLength]) {
		await __readTiles(pixels, buf, ifd);
	} else {
		await __readStrips(pixels, buf, ifd);
	}
	return { width, height, spp, bpp, pixels, ifd };
};

export const readIFDs = (buf: Uint8Array, opts?: Partial<IFDOpts>) => {
	const isLE = DV.getU16(buf, 0) === 0x4949;
	if (DV.getU16(buf, 2, isLE) !== 42) illegalArgs("wrong magic number");
	const readAll = opts?.all !== false;
	const ifds: IFD[] = [];
	let addr = DV.getU32(buf, 4, isLE);
	do {
		const [ifd, $addr] = __readIFD(buf, addr, isLE, opts);
		ifds.push(ifd);
		const nextIFD = DV.getU32(buf, $addr, isLE);
		if (!nextIFD) break;
		addr = nextIFD;
	} while (readAll);
	return ifds;
};

/**
 * Takes a parsed TIFF image (via {@link readTIFF}) and converts it to an
 * thi.ng/pixel integer pixel buffer. Supports the following formats (chosen
 * automatically):
 *
 * - GRAY8 / GRAY_ALPHA8
 * - GRAY16 / GRAY_ALPHA16
 * - RGB888
 * - ARGB8888
 *
 * @param img
 */
export const intBufferFromTIFF = ({
	width,
	height,
	pixels,
	spp,
	bpp,
}: Awaited<ReturnType<typeof readTIFF>>) => {
	const len = pixels.length;
	switch (spp) {
		case 1:
			return intBuffer(width, height, bpp === 8 ? GRAY8 : GRAY16, pixels);
		case 2:
			return intBuffer(
				width,
				height,
				bpp === 8 ? GRAY_ALPHA8 : GRAY_ALPHA16,
				typedArray(
					bpp === 8 ? "u16" : "u32",
					pixels.buffer,
					pixels.byteOffset,
					width * height
				)
			);
		case 3: {
			const $pixels = new Uint32Array(len / 3);
			if (bpp === 8) {
				for (let i = 0, j = 0; i < len; i += 3, j++)
					$pixels[j] =
						(pixels[i] << 16) |
						(pixels[i + 1] << 8) |
						pixels[i + 2];
			} else {
				for (let i = 0, j = 0; i < len; i += 3, j++)
					$pixels[j] =
						((pixels[i] & 0xff00) << 8) |
						(pixels[i + 1] & 0xff00) |
						(pixels[i + 2] >> 8);
			}
			return intBuffer(width, height, RGB888, $pixels);
		}
		case 4: {
			let $pixels = pixels;
			if (bpp === 16) {
				$pixels = new Uint8Array(len);
				for (let i = 0; i < len; i++) $pixels[i] = pixels[i] >> 8;
			}
			return intBuffer(
				width,
				height,
				ARGB8888,
				new Uint32Array(
					$pixels.buffer,
					$pixels.byteOffset,
					width * height
				)
			);
		}
		default:
			unsupported(`samples per pixel: ${spp}`);
	}
};

/** @internal */
const __imageMeta = (ifd: IFD) => ({
	width: <number>ifd[Tag.ImageWidth][0],
	height: <number>ifd[Tag.ImageLength][0],
	spp: <number>ifd[Tag.SamplesPerPixel][0],
	bpp: <number>ifd[Tag.BitsPerSample][0],
});

/**
 * Reads all entries of a single IFD (or sub-IFD). Returns tuple of: `[entries,
 * end_address]`.
 *
 * @internal
 */
const __readIFD = (
	buf: Uint8Array,
	addr: number,
	isLE: boolean,
	opts?: Partial<IFDOpts>
): [IFD, number] => {
	const num = DV.getU16(buf, addr, isLE);
	const entries: IFD = {};
	const readSubIFDs = opts?.subIFD !== false;
	addr += 2;
	for (let i = 0; i < num; i++) {
		const entry = __readEntry(buf, addr, isLE, opts);
		if (entry) {
			const tag = DV.getU16(buf, addr, isLE);
			if (!readSubIFDs) {
				entries[tag] = entry;
			} else if (tag === Tag.Exif || tag === Tag.GPSInfo) {
				const subIFDs: IFD[] = [];
				for (let i = 0; i < entry.length; i++) {
					subIFDs.push(
						__readIFD(buf, <number>entry[i], isLE, opts)[0]
					);
				}
				entries[tag] = subIFDs;
			} else if (tag === Exif.MakerNote) {
				entries[tag] = [__readIFD(<Uint8Array>entry, 0, isLE, opts)[0]];
			} else {
				entries[tag] = entry;
			}
		}
		addr += 12;
	}
	return [entries, addr];
};

/**
 * Attempts to read a single IFD entry and returns its parsed value (or
 * undefined if the entry uses an unsupported value type).
 *
 * @param buf
 * @param addr
 * @param isLE
 *
 * @internal
 */
const __readEntry = (
	buf: Uint8Array,
	addr: number,
	isLE: boolean,
	opts?: Partial<IFDOpts>
): Maybe<IFDEntry> => {
	// const tag = DV.getU16(buf, addr, isLE);
	const type = DV.getU16(buf, addr + 2, isLE);
	let num = DV.getU32(buf, addr + 4, isLE);
	// console.log(`entry ${tag} (type: ${type}, num: ${num}) @ ${addr}`);
	switch (type) {
		// u8 (1) / i8 (6) / blob (7)
		case 1:
		case 6:
		case 7: {
			const offset = num < 5 ? addr + 8 : DV.getU32(buf, addr + 8, isLE);
			return type !== 6
				? buf.subarray(offset, offset + num)
				: new Int8Array(buf.buffer, buf.byteOffset + offset, num);
		}
		// ascii
		case 2: {
			const offset = DV.getU32(buf, addr + 8, isLE);
			return DECODER.decode(
				num < 5
					? buf.subarray(addr + 8, addr + 8 + num - 1)
					: buf.subarray(offset, offset + num - 1)
			);
		}
		// u16 (3) / i16 (8)
		case 3:
		case 8: {
			const offset = num < 3 ? addr + 8 : DV.getU32(buf, addr + 8, isLE);
			const val: number[] = [];
			const read = type === 3 ? DV.getU16 : DV.getI16;
			for (let i = 0; i < num; i++)
				val.push(read(buf, offset + i * 2, isLE));
			return val;
		}
		// u32 (4) / i32 (9) / f32 (11)
		case 4:
		case 9:
		case 11: {
			const offset = num < 2 ? addr + 8 : DV.getU32(buf, addr + 8, isLE);
			const val: number[] = [];
			const read =
				type === 4 ? DV.getU32 : type === 9 ? DV.getI32 : DV.getF32;
			num *= 4;
			for (let i = 0; i < num; i += 4)
				val.push(read(buf, offset + i, isLE));
			return val;
		}
		// rational
		case 5:
		case 10: {
			const offset = DV.getU32(buf, addr + 8, isLE);
			const val: any[] = [];
			const read = type === 5 ? DV.getU32 : DV.getI32;
			const convert = opts?.float !== false;
			num *= 8;
			for (let i = 0; i < num; i += 8) {
				const a = read(buf, offset + i, isLE);
				const b = read(buf, offset + 4 + i, isLE);
				val.push(convert ? a / b : [a, b]);
			}
			return val;
		}
		// f64
		case 12: {
			const offset = DV.getU32(buf, addr + 8, isLE);
			const val: number[] = [];
			num *= 8;
			for (let i = 0; i < num; i += 8)
				val.push(DV.getF64(buf, offset + i, isLE));
			return val;
		}
		default:
			console.log("ignoring IFD entry w/ type:", type);
	}
};

/**
 * Reads all image tiles into a single u8/u16 pixel buffer.
 *
 * @param pixels
 * @param buf
 * @param ifd
 *
 * @internal
 */
const __readTiles = async (pixels: UIntArray, buf: Uint8Array, ifd: IFD) => {
	const meta = __imageMeta(ifd);
	const compression = <number>ifd[Tag.Compression]?.[0] ?? 1;
	const predictor = <number>ifd[Tag.Predictor]?.[0] ?? 1;
	const photoMode = <number>ifd[Tag.PhotometricInterpretation]?.[0] ?? 1;
	const tileW = <number>ifd[Tag.TileWidth][0];
	const tileH = <number>ifd[Tag.TileLength][0];
	const offsets = <NumericArray>(
		(ifd[Tag.TileOffsets] ?? ifd[Tag.StripOffsets])
	);
	const counts = <NumericArray>(
		(ifd[Tag.TileByteCounts] ?? ifd[Tag.StripByteCounts])
	);
	const mask = (1 << meta.bpp) - 1;
	const cols = Math.ceil(meta.width / tileW);
	const rows = Math.ceil(meta.height / tileH);
	for (let y = 0, i = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++, i++) {
			const offset = <number>offsets[i];
			const count = <number>counts[i];
			const tile = await __readChunk(
				buf.subarray(offset, offset + count),
				meta,
				compression,
				predictor,
				photoMode,
				mask
			);
			__copyTile(pixels, tile, x, y, tileW, tileH, meta);
		}
	}
};

/**
 * Copies a single tile to the given position in the result pixel buffer.
 *
 * @param dest
 * @param src
 * @param tileX
 * @param tileY
 * @param tileW
 * @param tileH
 * @param param6
 *
 * @internal
 */
const __copyTile = (
	dest: UIntArray,
	src: UIntArray,
	tileX: number,
	tileY: number,
	tileW: number,
	tileH: number,
	{ width, height, spp }: ReturnType<typeof __imageMeta>
) => {
	tileX *= tileW;
	tileY *= tileH;
	const imgStride = width * spp;
	const tileStride = tileW * spp;
	const cols = Math.min(tileW, width - tileX) * spp;
	const rows = Math.min(tileH, height - tileY);
	for (let y = 0; y < rows; y++) {
		const srow = y * tileStride;
		const drow = (tileY + y) * imgStride + tileX * spp;
		for (let x = 0; x < cols; x += spp) {
			const si = srow + x;
			const di = drow + x;
			for (let k = 0; k < spp; k++) dest[di + k] = src[si + k];
		}
	}
};

/**
 * Reads all image strips into a single u8/u16 pixel buffer.
 *
 * @param pixels
 * @param buf
 * @param ifd
 *
 * @internal
 */
const __readStrips = async (pixels: UIntArray, buf: Uint8Array, ifd: IFD) => {
	const meta = __imageMeta(ifd);
	const compression = <number>ifd[Tag.Compression]?.[0] ?? 1;
	const predictor = <number>ifd[Tag.Predictor]?.[0] ?? 1;
	const photoMode = <number>ifd[Tag.PhotometricInterpretation]?.[0] ?? 1;
	const offsets = <NumericArray>ifd[Tag.StripOffsets];
	const counts = <NumericArray>ifd[Tag.StripByteCounts];
	const mask = (1 << meta.bpp) - 1;
	let destOffset = 0;
	for (let i = 0; i < offsets.length; i++) {
		const offset = <number>offsets[i];
		const count = <number>counts[i];
		const stripe = await __readChunk(
			buf.subarray(offset, offset + count),
			meta,
			compression,
			predictor,
			photoMode,
			mask
		);
		pixels.set(stripe, destOffset);
		destOffset += stripe.length;
	}
};

/**
 * Reads (and possibly uncompresses and decodes) a single image chunk (strip or
 * tile).
 *
 * @param chunk
 * @param meta
 * @param compression
 * @param predictor
 * @param photoMode
 * @param mask
 *
 * @internal
 */
const __readChunk = async (
	chunk: Uint8Array,
	meta: ReturnType<typeof __imageMeta>,
	compression: number,
	predictor: number,
	photoMode: number,
	mask: number
) => {
	let stripe: UIntArray;
	switch (compression) {
		case Compression.Uncompressed:
			stripe = await __readUncompressed(chunk, meta.bpp);
			break;
		case Compression.Deflate:
			stripe = await __readDeflate(chunk.slice(), meta.bpp);
			break;
		default:
			unsupported(`compression mode ${compression}`);
	}
	if (predictor == 2) {
		__horizontalDifferencing(stripe, meta.width, meta.spp, mask);
	}
	if (photoMode === PhotoMode.WhiteIsZero) {
		for (let i = 0; i < stripe.length; i++) stripe[i] ^= mask;
	}
	return stripe;
};

/** @internal */
const __readUncompressed = async (buf: Uint8Array, bpp: number) =>
	typedArray(
		bpp == 16 ? "u16" : "u8",
		buf.buffer,
		buf.byteOffset,
		buf.byteLength / (bpp >> 3)
	);

/** @internal */
const __readDeflate = async (buf: Uint8Array<ArrayBuffer>, bpp: number) => {
	const ds = new DecompressionStream("deflate");
	const stream = new Blob([buf.buffer]).stream().pipeThrough(ds);
	const decompressed = await new Response(stream).arrayBuffer();
	return typedArray(bpp == 16 ? "u16" : "u8", decompressed);
};

/**
 * Applies predictor=2 differencing to decode given image chunk.
 *
 * @internal
 */
const __horizontalDifferencing = (
	data: UIntArray,
	width: number,
	spp: number,
	mask: number
) => {
	width *= spp;
	for (let i = 0, n = data.length; i < n; i += width) {
		for (let j = spp; j < width; j += spp) {
			const ij = i + j;
			for (let k = 0; k < spp; k++) {
				data[ij + k] = (data[ij + k] + data[ij - (spp - k)]) & mask;
			}
		}
	}
};
