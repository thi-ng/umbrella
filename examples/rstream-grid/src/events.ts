import { EV_REDO, EV_UNDO } from "@thi.ng/interceptors";

// best practice tip: define event & effect names as consts or enums
// and avoid hardcoded strings for more safety and easier refactoring
// also see pre-defined event handlers & interceptors in @thi.ng/atom:
// https://github.com/thi-ng/umbrella/blob/develop/packages/interceptors/src/api.ts#L14

export const UNDO = EV_UNDO;
export const REDO = EV_REDO;
export const UPDATE_SVG = "update-svg";
export const SAVE_SVG = "save-svg";
export const SAVE_ANIM = "save-anim";
export const SET_COLS = "set-cols";
export const SET_ROWS = "set-rows";
export const SET_STROKE = "set-stroke";
export const SET_THETA = "set-theta";
