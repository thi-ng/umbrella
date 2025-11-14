// SPDX-License-Identifier: Apache-2.0
import { raf } from "./raf.js";
import { sidechain } from "./sidechain.js";

export const syncRAF = <T>(src: AsyncIterable<T>) =>
	sidechain(src, raf({ timestamp: true }));
