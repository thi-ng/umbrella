import { reactive } from "@thi.ng/rstream/stream";
import type { AppState } from "./api";

/**
 * Stream of app state values.
 */
export const state = reactive<AppState>({
	pageID: 0,
	nextPageID: 0,
	isLoading: false,
});
