import { reactive } from "@thi.ng/rstream";
import { gallery } from "./gallery.js";
import { preload } from "./preload.js";

// reactive app state, used by the main UI component to decide what to display
// (in this app, this value is the only global state...)
export const APP_STATE = reactive<keyof typeof APP_STATES>("preload");

// registry of known app states and their UI component functions
export const APP_STATES = { preload, gallery };
