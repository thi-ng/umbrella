import { Fn0, IToHiccup } from "@thi.ng/api";
import { pointInside } from "@thi.ng/geom";
import { IShape } from "@thi.ng/geom-api";
import { setC2, Vec } from "@thi.ng/vectors";
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
    width: number;
    height: number;
    theme!: GUITheme;
    attribs!: any;
    layers: any[];

    mouse: Vec;
    buttons: number;
    keys: Set<string>;
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
        this.width = opts.width;
        this.height = opts.height;
        this.mouse = [-1e3, -1e3];
        this.buttons = 0;
        this.keys = new Set<string>();
        this.key = "";
        this.modifiers = 0;
        this.hotID = this.activeID = this.focusID = this.lastID = "";
        this.currIDs = new Set<string>();
        this.prevIDs = new Set<string>();
        this.resources = new Map<string, Map<number | string, any>>();
        this.sizes = new Map<string, number | string>();
        this.states = new Map<string, any>();
        this.layers = [[], []];
        const touchActive = (e: TouchEvent) => {
            setMouse(e, this.mouse);
            this.buttons |= MouseButton.LEFT;
        };
        const touchEnd = () => {
            this.buttons &= ~MouseButton.LEFT;
        };
        const mouseActive = (e: MouseEvent) => {
            setMouse(e, this.mouse);
            this.buttons = e.buttons;
        };
        this.attribs = {
            onmousemove: (e: MouseEvent) => {
                setMouse(e, this.mouse);
            },
            onmousedown: mouseActive,
            onmouseup: mouseActive,
            ontouchstart: touchActive,
            ontouchmove: touchActive,
            ontouchend: touchEnd,
            ontouchcancel: touchEnd
        };
        this.setTheme(opts.theme || {});
        const setKMods = (e: KeyboardEvent) =>
            (this.modifiers =
                (~~e.shiftKey * KeyModifier.SHIFT) |
                (~~e.ctrlKey * KeyModifier.CONTROL) |
                (~~e.metaKey * KeyModifier.META) |
                (~~e.altKey * KeyModifier.ALT));
        window.addEventListener("keydown", (e) => {
            this.keys.add(e.key);
            this.key = e.key;
            setKMods(e);
            if (e.key === "Tab") {
                e.preventDefault();
            }
        });
        window.addEventListener("keyup", (e) => {
            this.keys.delete(e.key);
            setKMods(e);
        });
        this.t0 = Date.now();
    }

    updateAttribs() {
        Object.assign(this.attribs, {
            width: this.width,
            height: this.height,
            style: {
                background: this.theme.globalBg
            }
        });
    }

    setTheme(theme: Partial<GUITheme>) {
        this.theme = { ...DEFAULT_THEME, ...theme };
        this.updateAttribs();
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

    isHover(id: string, shape: IShape) {
        const aid = this.activeID;
        const hover =
            aid === id || (aid === "" && pointInside(shape, this.mouse));
        hover && (this.hotID = id);
        return hover;
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
}

const setMouse = (e: MouseEvent | TouchEvent, mouse: Vec) => {
    const b = (<HTMLCanvasElement>e.target).getBoundingClientRect();
    const t = (<TouchEvent>e).changedTouches
        ? (<TouchEvent>e).changedTouches[0]
        : <MouseEvent>e;
    setC2(mouse, t.clientX - b.left, t.clientY - b.top);
};
