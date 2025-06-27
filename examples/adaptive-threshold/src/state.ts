// SPDX-License-Identifier: Apache-2.0
import { reactive } from "@thi.ng/rstream";
import type { AppState } from "./api.js";

/**
 * Stream of app state values.
 */
export const state = reactive<AppState>({
	threshold: { windowSize: 7, offset: 1 },
});
