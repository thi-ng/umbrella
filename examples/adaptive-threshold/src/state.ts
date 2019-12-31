import { stream } from "@thi.ng/rstream";
import { AppState } from "./api";

/**
 * Stream of app state values.
 */
export const state = stream<AppState>();

// seed with initial app state
state.next({ threshold: { windowSize: 7, offset: 1 } });
