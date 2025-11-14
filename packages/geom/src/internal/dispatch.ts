// SPDX-License-Identifier: Apache-2.0
// thing:export
import type { IShape } from "../api.js";

/** @internal */
export const __dispatch = (x: IShape) => x.type;

/** @internal */
export const __dispatch2 = (a: IShape, b: IShape) => a.type + "-" + b.type;
