import type { SystemColors } from "../api";

/**
 * Default CSS system colors used by {@link parseCss}. Use
 * {@link setSystemColors} to provide custom defaults.
 */
export let CSS_SYSTEM_COLORS: SystemColors = {
    canvas: "fff",
    canvastext: "000",
    linktext: "001ee4",
    visitedtext: "4e2386",
    activetext: "eb3323",
    buttonface: "ddd",
    buttontext: "000",
    buttonborder: "000",
    field: "fff",
    fieldtext: "000",
    highlight: "bbd5fb",
    highlighttext: "000",
    mark: "000",
    marktext: "fff",
    graytext: "808080",
};

/**
 * Merges {@link CSS_SYSTEM_COLORS} w/ new values.
 *
 * @param cols
 */
export const setSystemColors = (cols: Partial<SystemColors>) =>
    Object.assign(CSS_SYSTEM_COLORS, cols);
