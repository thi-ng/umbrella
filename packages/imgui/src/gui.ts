import { Fn0, IToHiccup } from "@thi.ng/api";
import { set2, Vec } from "@thi.ng/vectors";
import {
    DEFAULT_THEME,
    GUITheme,
    Hash,
    IMGUIOpts,
    Key,
    KeyModifier,
    MouseButton,
    NONE
} from "./api";

export class IMGUI implements IToHiccup {
    attribs!: any;
    layers: any[];

    mouse: Vec;
    buttons: number;
    key!: string;
    modifiers: number;

    hotID: string;
    activeID: string;
    focusID: string;
    lastID: string;
    cursor!: string;

    t0: number;
    time!: number;

    protected currIDs: Set<string>;
    protected prevIDs: Set<string>;

    protected themes!: GUITheme[];
    protected resources: Map<string, Map<Hash, any>>;
    protected states: Map<string, any>;
    protected sizes: Map<string, any>;

    constructor(opts: IMGUIOpts) {
        this.mouse = [-1e3, -1e3];
        this.buttons = 0;
        this.key = "";
        this.modifiers = 0;
        this.hotID = this.activeID = this.focusID = this.lastID = "";
        this.currIDs = new Set<string>();
        this.prevIDs = new Set<string>();
        this.resources = new Map<string, Map<Hash, any>>();
        this.sizes = new Map<string, Hash>();
        this.states = new Map<string, any>();
        this.layers = [[], []];
        this.attribs = {};
        this.setTheme(opts.theme || {});
        this.t0 = Date.now();
    }

    get theme() {
        const themes = this.themes;
        return themes[themes.length - 1];
    }

    /**
     * Sets mouse position and current mouse button flags (i.e.
     * `MouseEvent.buttons`).
     *
     * @param p
     * @param buttons
     */
    setMouse(p: Vec, buttons: number) {
        set2(this.mouse, p);
        this.buttons = buttons;
        return this;
    }

    /**
     * Sets internal key state from given key event details.
     *
     * @param e
     */
    setKey(e: KeyboardEvent) {
        e.type === "keydown" && (this.key = e.key);
        this.modifiers =
            (~~e.shiftKey * KeyModifier.SHIFT) |
            (~~e.ctrlKey * KeyModifier.CONTROL) |
            (~~e.metaKey * KeyModifier.META) |
            (~~e.altKey * KeyModifier.ALT);
        return this;
    }

    /**
     * Merges given theme settings with DEFAULT_THEME and resets theme
     * stack.
     *
     * @param theme
     */
    setTheme(theme: Partial<GUITheme>) {
        this.themes = [{ ...DEFAULT_THEME, ...theme }];
    }

    /**
     * Merges given theme settings with current theme and pushes it on
     * theme stack.
     *
     * @param theme
     */
    pushTheme(theme: Partial<GUITheme>) {
        const themes = this.themes;
        themes.push({ ...themes[themes.length - 1], ...theme });
    }

    /**
     * Removes current theme from stack (unless only one theme left).
     */
    popTheme() {
        const themes = this.themes;
        themes.length > 1 && themes.pop();
    }

    /**
     * Sets `focusID` to given `id` if the component can receive focus.
     * Returns true if component is focused.
     *
     * @param id
     */
    requestFocus(id: string) {
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

    isMouseDown() {
        return this.buttons & MouseButton.LEFT;
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

    /**
     * Prepares IMGUI for next frame. Resets `hotID`, `cursor`, clears
     * all layers and updates elapsed time.
     */
    begin() {
        this.hotID = "";
        this.layers[0].length = 0;
        this.layers[1].length = 0;
        this.time = (Date.now() - this.t0) * 1e-3;
        this.cursor = "default";
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
        if (this.key === Key.TAB) {
            this.focusID = "";
        }
        this.key = "";
        // garbage collect unused component state / resources
        const prev = this.prevIDs;
        const curr = this.currIDs;
        for (let id of prev) {
            if (!curr.has(id)) {
                this.resources.delete(id);
                this.sizes.delete(id);
                this.states.delete(id);
            }
        }
        this.prevIDs = curr;
        this.currIDs = prev;
        prev.clear();
    }

    bgColor(hover: boolean) {
        return hover ? this.theme.bgHover : this.theme.bg;
    }

    fgColor(hover: boolean) {
        return hover ? this.theme.fgHover : this.theme.fg;
    }

    textColor(hover: boolean) {
        return hover ? this.theme.textHover : this.theme.text;
    }

    focusColor(id: string) {
        return this.focusID === id ? this.theme.focus : undefined;
    }

    /**
     * Returns pixel width of given string based on current theme's font
     * settings.
     *
     * IMPORTANT: Only monospace fonts are currently supported.
     *
     * @param txt
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
     * @param id
     * @param hash
     */
    registerID(id: string, hash: Hash) {
        this.currIDs.add(id);
        if (this.sizes.get(id) !== hash) {
            this.sizes.set(id, hash);
            this.resources.delete(id);
        }
    }

    /**
     * Attempts to retrieve cached resource for given component `id` and
     * resource `hash`. If unsuccessful, calls resource `ctor` function
     * to create it, caches result and returns it.
     *
     * @see IMGUI.registerID()
     *
     * @param id
     * @param hash
     * @param ctor
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
     * @param id
     * @param ctor
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
     * @param id
     * @param state
     */
    setState(id: string, state: any) {
        this.states.set(id, state);
    }

    /**
     * Sets cursor property to given `id`. This setting is cleared at
     * the beginning of each frame (default value: "default").
     *
     * @param id
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
            ...this.layers[1]
        ];
    }
}
