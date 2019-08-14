import { Fn0, IToHiccup } from "@thi.ng/api";
import { set2, Vec } from "@thi.ng/vectors";
import {
    DEFAULT_THEME,
    GUITheme,
    IMGUIOpts,
    Key,
    KeyModifier,
    MouseButton,
    NONE
} from "./api";

export class IMGUI implements IToHiccup {
    theme!: GUITheme;
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

    t0: number;
    time!: number;

    protected currIDs: Set<string>;
    protected prevIDs: Set<string>;

    protected resources: Map<string, Map<number | string, any>>;
    protected states: Map<string, number | string>;
    protected sizes: Map<string, any>;

    constructor(opts: IMGUIOpts) {
        this.mouse = [-1e3, -1e3];
        this.buttons = 0;
        this.key = "";
        this.modifiers = 0;
        this.hotID = this.activeID = this.focusID = this.lastID = "";
        this.currIDs = new Set<string>();
        this.prevIDs = new Set<string>();
        this.resources = new Map<string, Map<number | string, any>>();
        this.sizes = new Map<string, number | string>();
        this.states = new Map<string, any>();
        this.layers = [[], []];
        this.attribs = {};
        this.setTheme(opts.theme || {});
        this.t0 = Date.now();
    }

    setMouse(p: Vec, buttons: number) {
        set2(this.mouse, p);
        this.buttons = buttons;
        return this;
    }

    setKey(e: KeyboardEvent) {
        e.type === "keydown" && (this.key = e.key);
        this.modifiers =
            (~~e.shiftKey * KeyModifier.SHIFT) |
            (~~e.ctrlKey * KeyModifier.CONTROL) |
            (~~e.metaKey * KeyModifier.META) |
            (~~e.altKey * KeyModifier.ALT);
        return this;
    }

    setTheme(theme: Partial<GUITheme>) {
        this.theme = { ...DEFAULT_THEME, ...theme };
    }

    requestFocus(id: string) {
        if (this.focusID === "" || this.activeID === id) {
            this.focusID = id;
            return true;
        }
        return this.focusID === id;
    }

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

    begin() {
        this.hotID = "";
        this.layers[0].length = 0;
        this.layers[1].length = 0;
        this.time = (Date.now() - this.t0) * 1e-3;
    }

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

    textWidth(txt: string) {
        return this.theme.charWidth * txt.length;
    }

    registerID(id: string, hash: number | string) {
        this.currIDs.add(id);
        if (this.sizes.get(id) !== hash) {
            this.sizes.set(id, hash);
            this.resources.delete(id);
        }
    }

    resource(id: string, hash: number | string, ctor: Fn0<any>) {
        let res: any;
        let c = this.resources.get(id);
        !c && this.resources.set(id, (c = new Map()));
        return c.get(hash) || (c.set(hash, (res = ctor())), res);
    }

    add(...els: any[]) {
        this.layers[0].push(...els);
    }

    addOverlay(...els: any[]) {
        this.layers[1].push(...els);
    }

    toHiccup() {
        return [
            "g",
            { font: this.theme.font },
            ...this.layers[0],
            ...this.layers[1]
        ];
    }

    useDefaultEventHandlers() {
        const pos = (e: MouseEvent | TouchEvent) => {
            const b = (<HTMLCanvasElement>e.target).getBoundingClientRect();
            const t = (<TouchEvent>e).changedTouches
                ? (<TouchEvent>e).changedTouches[0]
                : <MouseEvent>e;
            return [t.clientX - b.left, t.clientY - b.top];
        };
        const touchActive = (e: TouchEvent) => {
            this.setMouse(pos(e), MouseButton.LEFT);
        };
        const touchEnd = (e: TouchEvent) => {
            this.setMouse(pos(e), 0);
        };
        const mouseActive = (e: MouseEvent) => {
            this.setMouse(pos(e), e.buttons);
        };
        Object.assign(this.attribs, {
            onmousemove: mouseActive,
            onmousedown: mouseActive,
            onmouseup: mouseActive,
            ontouchstart: touchActive,
            ontouchmove: touchActive,
            ontouchend: touchEnd,
            ontouchcancel: touchEnd
        });
        window.addEventListener("keydown", (e) => {
            this.setKey(e);
            if (e.key === "Tab") {
                e.preventDefault();
            }
        });
        window.addEventListener("keyup", (e) => {
            this.setKey(e);
        });
    }
}
