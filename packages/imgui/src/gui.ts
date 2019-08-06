import { IToHiccup } from "@thi.ng/api";
import { setC2, Vec } from "@thi.ng/vectors";
import {
    DEFAULT_THEME,
    GUITheme,
    IMGUIOpts,
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

    constructor(opts: IMGUIOpts) {
        this.width = opts.width;
        this.height = opts.height;
        this.mouse = [-1e3, -1e3];
        this.buttons = 0;
        this.keys = new Set<string>();
        this.key = "";
        this.modifiers = 0;
        this.hotID = this.activeID = this.focusID = this.lastID = "";
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
        if (this.key === "Tab") {
            this.focusID = "";
        }
        this.key = "";
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
