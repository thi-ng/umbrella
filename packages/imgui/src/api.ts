import { Predicate } from "@thi.ng/api";
import { ReadonlyVec } from "@thi.ng/vectors";

export type Color = string | number | number[];

export type Hash = number | string;

export interface GUITheme {
    globalBg?: Color;
    font?: string;
    fontSize: number;
    charWidth: number;
    baseLine: number;
    pad: number;
    focus: Color;
    cursor: Color;
    cursorBlink: number;
    bg: Color;
    bgDisabled: Color;
    bgHover: Color;
    fg: Color;
    fgDisabled: Color;
    fgHover: Color;
    text: Color;
    textDisabled: Color;
    textHover: Color;
    bgTooltip: Color;
    textTooltip: Color;
}

export interface IMGUIOpts {
    theme?: Partial<GUITheme>;
}

export interface LayoutBox {
    /**
     * Top-left corner X
     */
    x: number;
    /**
     * Top-left corner Y
     */
    y: number;
    /**
     * Box width (based on requested col span and inner gutter(s))
     */
    w: number;
    /**
     * Box height (based on requested row span and inner gutter(s))
     */
    h: number;
    /**
     * Single cell column width (always w/o col span), based on
     * layout's available space and configured number of columns.
     */
    cw: number;
    /**
     * Single cell row height (always same as `rowHeight` arg given to
     * layout ctor).
     */
    ch: number;
    /**
     * Gutter size.
     */
    gap: number;
}

export interface ILayout<O, T> {
    next(opts?: O): T;
}

export interface IGridLayout extends ILayout<[number, number], LayoutBox> {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly cols: number;
    readonly cellW: number;
    readonly cellH: number;
    readonly gap: number;

    /**
     * Returns the number of columns for given width.
     *
     * @param w
     */
    colsForWidth(w: number): number;

    /**
     * Returns the number of rows for given height.
     *
     * @param w
     */
    rowsForHeight(h: number): number;

    /**
     * Calculates the required number of columns & rows for the given
     * size.
     *
     * @param size
     */
    spansForSize(size: ReadonlyVec): [number, number];
    spansForSize(w: number, h: number): [number, number];

    /**
     * Returns a squared `LayoutBox` based on this layout's column
     * width. This box will consume `ceil(columnWidth / rowHeight)`
     * rows, but the returned box height might be less to satisfy the
     * square constraint.
     */
    nextSquare(): LayoutBox;

    /**
     * Requests a `spans` sized cell from this layout (via `.next()`)
     * and creates and returns a new child `GridLayout` for the returned
     * box / grid cell. This child layout is configured to use `cols`
     * columns and shares same `gap` as this (parent) layout. The
     * configured row span only acts as initial minimum vertical space
     * reseervation, but is allowed to grow and if needed will propagate
     * the new space requirements to parent layouts.
     *
     * Note: this size child-parent size propagation ONLY works until
     * the next cell is requested from any parent. IOW, child layouts
     * MUST be completed/populated first before continuing with
     * siblings/ancestors of this current layout.
     *
     * ```
     * // single column layout (default config)
     * const outer = gridLayout(null, 0, 0, 200, 1, 16, 4);
     *
     * // add button (full 1st row)
     * button(gui, outer, "foo",...);
     *
     * // 2-column nested layout (2nd row)
     * const inner = outer.nest(2)
     * // these buttons are on same row
     * button(gui, inner, "bar",...);
     * button(gui, inner, "baz",...);
     *
     * // continue with outer, create empty row
     * outer.next();
     *
     * // continue with outer (4th row)
     * button(gui, outer, "bye",...);
     * ```
     *
     * @param cols columns in nested layout
     * @param spans default [1, 1] (i.e. size of single cell)
     */
    nest(cols: number, spans?: [number, number]): IGridLayout;
}

export const enum MouseButton {
    LEFT = 1,
    RIGHT = 2,
    MIDDLE = 4
}

export const enum KeyModifier {
    SHIFT = 1,
    CONTROL = 2,
    META = 4,
    ALT = 8
}

export const enum Key {
    ALT = "Alt",
    BACKSPACE = "Backspace",
    CAPSLOCK = "CapsLock",
    CONTEXT_MENU = "ContextMenu",
    CONTROL = "Control",
    DELETE = "Delete",
    DOWN = "ArrowDown",
    END = "End",
    ENTER = "Enter",
    ESC = "Escape",
    HELP = "Help",
    HOME = "Home",
    LEFT = "ArrowLeft",
    META = "Meta",
    NUM_LOCK = "NumLock",
    PAGE_DOWN = "PageDown",
    PAGE_UP = "PageUp",
    RIGHT = "ArrowRight",
    SHIFT = "Shift",
    SPACE = " ",
    TAB = "Tab",
    UP = "ArrowUp"
}

export const CONTROL_KEYS = new Set<string>([
    Key.ALT,
    Key.BACKSPACE,
    Key.CAPSLOCK,
    Key.CONTEXT_MENU,
    Key.CONTROL,
    Key.DELETE,
    Key.DOWN,
    Key.END,
    Key.ENTER,
    Key.ESC,
    Key.HELP,
    Key.HOME,
    Key.LEFT,
    Key.META,
    Key.NUM_LOCK,
    Key.PAGE_DOWN,
    Key.PAGE_UP,
    Key.RIGHT,
    Key.SHIFT,
    Key.TAB,
    Key.UP
]);

export const NONE = "__NONE__";

export const DEFAULT_THEME: GUITheme = {
    font: "10px Menlo, monospace",
    fontSize: 10,
    charWidth: 6,
    baseLine: 4,
    pad: 8,
    globalBg: "#ccc",
    focus: [0, 1, 0, 1],
    cursor: [0, 0, 0, 1],
    cursorBlink: 2,
    bg: [1, 1, 1, 0.66],
    bgDisabled: [1, 1, 1, 0.33],
    bgHover: [1, 1, 1, 0.9],
    fg: [0.2, 0.8, 1, 1],
    fgDisabled: [0.2, 0.8, 1, 0.5],
    fgHover: [0.3, 0.9, 1, 1],
    text: [0.3, 0.3, 0.3, 1],
    textDisabled: [0.3, 0.3, 0.3, 0.5],
    textHover: [0.2, 0.2, 0.4, 1],
    bgTooltip: [1, 1, 0.8, 0.85],
    textTooltip: [0, 0, 0, 1]
};

export const INPUT_ALPHA: Predicate<string> = (x) => /^\w$/.test(x);

export const INPUT_DIGITS: Predicate<string> = (x) => /^\d$/.test(x);
