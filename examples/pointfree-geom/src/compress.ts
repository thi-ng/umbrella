// SPDX-License-Identifier: MIT
import type { TypedArray } from "@thi.ng/api";

/**
 * Async function. Compresses given typed array using the JS Compression Streams
 * API. Uses `deflate` as default compression format.
 *
 * @remarks
 * Original code from https://thi.ng/genart-api (MIT licensed)
 *
 * @param buf
 * @param fmt
 */
export const compressBytes = (
	buf: TypedArray<ArrayBuffer>,
	fmt: CompressionFormat = "deflate"
) => pipe(buf, new CompressionStream(fmt));

/**
 * Async function. Decompresses given byte array using the JS Compression
 * Streams API. Uses `deflate` as default compression format.
 *
 * @remarks
 * Original code from https://thi.ng/genart-api (MIT licensed)
 *
 * Also see {@link decompressJSON}.
 *
 * @param buf
 * @param fmt
 */
export const decompressBytes = (
	buf: Uint8Array<ArrayBuffer>,
	fmt: CompressionFormat = "deflate"
) => pipe(buf, new DecompressionStream(fmt));

const pipe = async (
	buf: TypedArray<ArrayBuffer>,
	stream: ReadableWritablePair<any, Uint8Array<ArrayBuffer>>
) =>
	new Uint8Array(
		await new Response(
			new Blob([buf]).stream().pipeThrough(stream)
		).arrayBuffer()
	);
