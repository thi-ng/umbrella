// SPDX-License-Identifier: Apache-2.0
import type { Transducer } from "./api.js";
import { sideEffect } from "./side-effect.js";

export const trace = <T>(prefix = ""): Transducer<T, T> =>
	sideEffect<T>((x) => console.log(prefix, x));
