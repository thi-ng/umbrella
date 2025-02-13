// SPDX-License-Identifier: Apache-2.0
import type { FnBody0 } from "@thi.ng/shader-ast";
import { defMain } from "@thi.ng/shader-ast/ast/function";
import { constantFolding } from "./constant-folding.js";

/**
 * Same as
 * [`defMain`](https://docs.thi.ng/umbrella/shader-ast/functions/defMain.html),
 * but applies optimizations (e.g. {@link constantFolding}) to the given
 * function body.
 *
 * @param fn
 */
export const defOptimized = (fn: FnBody0) =>
	<ReturnType<typeof defMain>>constantFolding(defMain(fn));
