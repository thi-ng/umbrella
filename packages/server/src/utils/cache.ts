// SPDX-License-Identifier: Apache-2.0
export const isUnmodified = (etag: string, header?: string) =>
	header
		? header.includes(",")
			? header.split(/,\s+/g).some((x) => x === etag)
			: header === etag
		: false;
