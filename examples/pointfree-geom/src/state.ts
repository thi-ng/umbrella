// SPDX-License-Identifier: Apache-2.0
import { compressBytes, decompressBytes } from "./compress.js";
import { DEMO } from "./demo.js";

export const parseURLState = async () => {
	const hash = location.hash.substring(1);
	if (hash) {
		try {
			return new TextDecoder().decode(
				await decompressBytes(
					Uint8Array.from([...atob(hash)].map((x) => x.charCodeAt(0)))
				)
			);
		} catch (e) {}
	}
	return DEMO;
};

export const updateURLState = async (body: string) => {
	location.hash = btoa(
		String.fromCharCode(
			...(await compressBytes(new TextEncoder().encode(body)))
		)
	);
};
