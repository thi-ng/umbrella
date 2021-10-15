import { EV_REDO, EV_UNDO } from "@thi.ng/interceptors";

// best practice tip: define event & effect names as consts or enums
// and avoid hardcoded strings for more safety and easier refactoring
// also see pre-defined event handlers & interceptors:
// https://github.com/thi-ng/umbrella/blob/develop/packages/interceptors/src/api.ts#L31

export const SET_AMP = "set-amp";
export const SET_FREQ = "set-freq";
export const SET_PHASE = "set-phase";
export const SET_HARMONICS = "set-harmonics";
export const SET_HSTEP = "set-hstep";

export const UNDO = EV_UNDO;
export const REDO = EV_REDO;
