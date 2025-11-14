// SPDX-License-Identifier: Apache-2.0
export const encodeBytes = (
	bytes: Uint8Array,
	value: number,
	offset: number,
	size: number
) => {
	for (; size-- > 0; ) {
		bytes[offset++] = value & 0xff;
		value >>>= 8;
	}
};

export const decodeBytes = (
	bytes: Uint8Array,
	offset: number,
	size: number
) => {
	let value = 0;
	for (; size-- > 0; ) {
		value = (value << 8) | bytes[offset + size];
	}
	return value;
};
