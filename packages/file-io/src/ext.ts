// SPDX-License-Identifier: Apache-2.0

/**
 * Returns file extension (always lowercase) of given file `path`.
 *
 * @param path
 */
export const fileExt = (path: string) => {
	const match = /\.(\w+)$/.exec(path);
	return match ? match[1].toLowerCase() : "";
};
