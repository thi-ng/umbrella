import { stream } from "@thi.ng/rstream";
import type { AppState } from "./api";

/**
 * Stream of app state values.
 */
export const state = stream<AppState>();

// seed with initial app state
state.next({ pageID: 0, nextPageID: 0, isLoading: false });
