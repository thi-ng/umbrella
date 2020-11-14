import type { Fn0, IClear, IToHiccup } from "@thi.ng/api";
import { set2, Vec } from "@thi.ng/vectors";
import {
    DEFAULT_THEME,
    GUITheme,
    Hash,
    IMGUIOpts,
    Key,
    KeyModifier,
    MouseButton,
    NONE,
} from "./api";

export class IMGUI implements IClear, IToHiccup {
    attribs!: any;
    layers: any[];

    mouse: Vec;
    buttons: number;
    key!: string;
    modifiers: number;
    prevMouse: Vec;
    prevButtons: number;
    prevKey!: string;
    prevModifiers: number;

    hotID: string;
    activeID: string;
    focusID: string;
    lastID: string;
    cursor!: string;

    t0: number;
    time!: number;

    draw: boolean;

    protected currIDs: Set<string>;
    protected prevIDs: Set<string>;

    protected themeStack!: GUITheme[];
    protected disabledStack!: boolean[];
    protected resources: Map<string, Map<Hash, any>>;
    protected states: Map<string, any>;
    protected sizes: Map<string, any>;

    constructor(opts: IMGUIOpts) {
        this.mouse = [-1e3, -1e3];
        this.prevMouse = [-1e3, -1e3];
        this.key = this.prevKey = "";
        this.buttons = this.prevButtons = this.modifiers = this.prevModifiers = 0;
        this.hotID = this.activeID = this.focusID = this.lastID = "";
        this.currIDs = new Set<string>();
        this.prevIDs = new Set<string>();
        this.resources = new Map<string, Map<Hash, any>>();
        this.sizes = new Map<string, Hash>();
        this.states = new Map<string, any>();
        this.layers = [[], []];
        this.attribs = {};
        this.disabledStack = [false];
        this.setTheme(opts.theme || {});
        this.draw = true;
        this.t0 = Date.now();
    }

    get theme() {
        const stack = this.themeStack;
        return stack[stack.length - 1];
    }

    get disabled() {
        const stack = this.disabledStack;
        return stack[stack.length - 1];
    }

    /**
     * Clears all shape layers and resets theme / disabled stacks.
     */
    clear() {
        this.layers[0].length = 0;
        this.layers[1].length = 0;
        this.themeStack.length = 1;
        this.disabledStack.length = 1;
    }

    /**
     * Sets mouse position and current mouse button flags (i.e.
     * `MouseEvent.buttons`).
     *
     * @param p -
     * @param buttons -
     */
    setMouse(p: Vec, buttons: number) {
        set2(this.prevMouse, this.mouse);
        set2(this.mouse, p);
        this.prevButtons = this.buttons;
        this.buttons = buttons;
        return this;
    }

    /**
     * Sets internal key state from given key event details.
     *
     * @param e -
     */
    setKey(e: KeyboardEvent) {
        if (e.type === "keydown") {
            this.prevKey = this.key;
            this.key = e.key;
        }
        this.prevModifiers = this.modifiers;
        this.modifiers =
            (~~e.shiftKey * KeyModifier.SHIFT) |
            (~~e.ctrlKey * KeyModifier.CONTROL) |
            (~~e.metaKey * KeyModifier.META) |
            (~~e.altKey * KeyModifier.ALT);
        return this;
    }

    /**
     * Merges given theme settings with {@link DEFAULT_THEME} and resets theme
     * stack.
     *
     * @param theme -
     */
    setTheme(theme: Partial<GUITheme>) {
        this.themeStack = [{ ...DEFAULT_THEME, ...theme }];
    }

    /**
     * Merges given theme settings with current theme and pushes result
     * on theme stack.
     *
     * IMPORTANT: Currently IMGUI only supports one font and ignores any
     * font changes pushed on the theme stack.
     *
     * @param theme -
     */
    beginTheme(theme: Partial<GUITheme>) {
        const stack = this.themeStack;
        stack.push({ ...stack[stack.length - 1], ...theme });
    }

    /**
     * Removes current theme from stack (unless only one theme left).
     */
    endTheme() {
        popIfNotLast(this.themeStack);
    }

    /**
     * Applies component function with given theme, then restores
     * previous theme and returns component result.
     *
     * @param theme -
     * @param comp -
     */
    withTheme<T>(theme: Partial<GUITheme>, comp: Fn0<T>) {
        this.beginTheme(theme);
        const res = comp();
        this.themeStack.pop();
        return res;
    }

    /**
     * Pushes given disabled component state flag on stack (default:
     * true, i.e. disabled). Pass `false` to temporarily enable
     * components.
     *
     * @param disabled -
     */
    beginDisabled(disabled = true) {
        this.disabledStack.push(disabled);
    }

    /**
     * Removes current disabled flag from stack (unless only one theme left).
     */
    endDisabled() {
        popIfNotLast(this.disabledStack);
    }

    /**
     * Applies component function with given disabled flag, then
     * restores previous disabled state and returns component result.
     *
     * @param disabled -
     * @param comp -
     */
    withDisabled<T>(disabled: boolean, comp: Fn0<T>) {
        this.disabledStack.push(disabled);
        const res = comp();
        this.disabledStack.pop();
        return res;
    }

    /**
     * Sets `focusID` to given `id` if the component can receive focus.
     * Returns true if component is focused.
     *
     * @param id -
     */
    requestFocus(id: string) {
        if (this.disabled) return false;
        if (this.focusID === "" || this.activeID === id) {
            this.focusID = id;
            return true;
        }
        return this.focusID === id;
    }

    /**
     * Attempts to switch focus to next, or if Shift is pressed, to
     * previous component. This is meant be called ONLY from component
     * key handlers.
     */
    switchFocus() {
        this.focusID = this.isShiftDown() ? this.lastID : "";
        this.key = "";
    }

    /**
     * Returns true if left mouse button is pressed.
     */
    isMouseDown() {
        return (this.buttons & MouseButton.LEFT) > 0;
    }

    isShiftDown() {
        return (this.modifiers & KeyModifier.SHIFT) > 0;
    }

    isControlDown() {
        return (this.modifiers & KeyModifier.CONTROL) > 0;
    }

    isMetaDown() {
        return (this.modifiers & KeyModifier.META) > 0;
    }

    isAltDown() {
        return (this.modifiers & KeyModifier.ALT) > 0;
    }

    isPrevMouseDown() {
        return (this.prevButtons & MouseButton.LEFT) > 0;
    }

    isPrevShiftDown() {
        return (this.prevModifiers & KeyModifier.SHIFT) > 0;
    }

    isPrevControlDown() {
        return (this.prevModifiers & KeyModifier.CONTROL) > 0;
    }

    isPrevMetaDown() {
        return (this.prevModifiers & KeyModifier.META) > 0;
    }

    isPrevAltDown() {
        return (this.prevModifiers & KeyModifier.ALT) > 0;
    }

    /**
     * Prepares IMGUI for next frame:
     *
     * - Resets `hotID`, `cursor`
     * - Resets theme & disabled stacks
     * - Clears all draw layers
     * - Updates elapsed time.
     *
     * By default all components will emit draw shapes, however this can
     * be disabled by passing `false` as argument. This is useful for
     * use cases where the GUI is not updated at high frame rates and so
     * would require two invocations per update cycle for immediate
     * visual feedback:
     *
     * ```
     * gui.begin(false); // update state only, no draw
     * updateMyGUI();
     * gui.end();
     * gui.begin(true); // run once more, with draw enabled (default)
     * updateMyGUI();
     * gui.end();
     * ```
     *
     * @param draw -
     */
    begin(draw = true) {
        this.hotID = "";
        this.cursor = "default";
        this.draw = draw;
        this.clear();
        this.time = (Date.now() - this.t0) * 1e-3;
    }

    /**
     * Performs end-of-frame handling & component cache cleanup. Also
     * removes cached state and resources of all unused components.
     */
    end() {
        if (!this.buttons) {
            this.activeID = "";
        } else {
            if (this.activeID === "") {
                this.activeID = NONE;
                this.focusID = NONE;
                this.lastID = "";
            }
        }
        this.key === Key.TAB && (this.focusID = "");
        this.key = "";
        this.gc();
    }

    /**
     * Garbage collect unused component state / resources.
     */
    gc() {
        const { currIDs, prevIDs } = this;
        for (let id of prevIDs) {
            if (!currIDs.has(id)) {
                this.resources.delete(id);
                this.sizes.delete(id);
                this.states.delete(id);
            }
        }
        this.prevIDs = currIDs;
        this.currIDs = prevIDs;
        prevIDs.clear();
    }

    bgColor(hover: boolean) {
        return this.disabled
            ? this.theme.bgDisabled
            : hover
            ? this.theme.bgHover
            : this.theme.bg;
    }

    fgColor(hover: boolean) {
        return this.disabled
            ? this.theme.fgDisabled
            : hover
            ? this.theme.fgHover
            : this.theme.fg;
    }

    textColor(hover: boolean) {
        return this.disabled
            ? this.theme.textDisabled
            : hover
            ? this.theme.textHover
            : this.theme.text;
    }

    focusColor(id: string) {
        return this.focusID === id ? this.theme.focus : undefined;
    }

    /**
     * Returns pixel width of given string based on current theme's font
     * settings.
     *
     * IMPORTANT: Currently only monospace fonts are supported.
     *
     * @param txt -
     */
    textWidth(txt: string) {
        return this.theme.charWidth * txt.length;
    }

    /**
     * Marks given component ID as used and checks `hash` to determine
     * if the component's resource cache should be cleared. This hash
     * value should be based on any values (e.g. layout info) which
     * might invalidate cached resources.
     *
     * @param id -
     * @param hash -
     */
    registerID(id: string, hash: Hash) {
        this.currIDs.add(id);
        if (this.sizes.get(id) !== hash) {
            // console.warn("cache miss:", id, hash);
            this.sizes.set(id, hash);
            this.resources.delete(id);
        }
    }

    /**
     * Attempts to retrieve cached resource for given component `id` and
     * resource `hash`. If unsuccessful, calls resource `ctor` function
     * to create it, caches result and returns it.
     *
     * {@link IMGUI.registerID}
     *
     * @param id -
     * @param hash -
     * @param ctor -
     */
    resource<T>(id: string, hash: Hash, ctor: Fn0<T>) {
        let res: any;
        let c = this.resources.get(id);
        !c && this.resources.set(id, (c = new Map()));
        return c.get(hash) || (c.set(hash, (res = ctor())), res);
    }

    /**
     * Attempts to retrieve cached component state for given `id`. If
     * unsuccessful, calls state `ctor` function, caches result and
     * returns it.
     *
     * @param id -
     * @param ctor -
     */
    state<T>(id: string, ctor: Fn0<T>): T {
        let res: any = this.states.get(id);
        return res !== undefined
            ? res
            : (this.states.set(id, (res = ctor())), res);
    }

    /**
     * Stores / overrides given local state value for component `id` in
     * cache.
     *
     * @param id -
     * @param state -
     */
    setState(id: string, state: any) {
        this.states.set(id, state);
    }

    /**
     * Sets cursor property to given `id`. This setting is cleared at
     * the beginning of each frame (default value: "default").
     *
     * @param id -
     */
    setCursor(id: string) {
        this.cursor = id;
    }

    add(...els: any[]) {
        this.layers[0].push(...els);
    }

    addOverlay(...els: any[]) {
        this.layers[1].push(...els);
    }

    /**
     * Returns hiccup representation of all shapes/text primitives
     * created by components in the current frame.
     */
    toHiccup() {
        return [
            "g",
            { font: this.theme.font },
            ...this.layers[0],
            ...this.layers[1],
        ];
    }
}

const popIfNotLast = (stack: any[]) => stack.length > 1 && stack.pop();
