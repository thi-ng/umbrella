import { CloseMode } from "../api";

export const closeMode = (close: boolean | CloseMode | undefined) =>
    close === true || close === undefined
        ? CloseMode.LAST
        : close === false
        ? CloseMode.NEVER
        : close;
