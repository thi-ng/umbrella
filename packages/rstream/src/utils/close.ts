import { CloseMode } from "../api";

export const closeMode = (close: boolean | CloseMode) =>
    close === true || close === undefined
        ? CloseMode.LAST
        : close === false
        ? CloseMode.NEVER
        : close;
