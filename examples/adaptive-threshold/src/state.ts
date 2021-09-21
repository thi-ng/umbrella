import { reactive } from "@thi.ng/rstream/stream";
import type { AppState } from "./api";

/**
 * Stream of app state values.
 */
export const state = reactive<AppState>({
    threshold: { windowSize: 7, offset: 1 },
});
