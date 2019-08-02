import { assert, IToHiccup } from "@thi.ng/api";
import { setC2, Vec } from "@thi.ng/vectors";
import { GUITheme, IMGUIOpts, KeyModifier } from "./api";

export class IMGUI implements IToHiccup {
    width: number;
    height: number;
    theme: GUITheme;
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
        this.theme = opts.theme;
        this.mouse = [-1e3, -1e3];
        this.buttons = 0;
        this.keys = new Set<string>();
        this.key = "";
        this.modifiers = 0;
        this.hotID = this.activeID = this.focusID = this.lastID = "";
        this.layers = [[], []];
        this.attribs = {
            onmousemove: (e: MouseEvent) => {
                const b = (<HTMLCanvasElement>e.target).getBoundingClientRect();
                setC2(this.mouse, e.clientX - b.left, e.clientY - b.top);
            },
            onmousedown: (e: MouseEvent) => {
                this.buttons = e.buttons;
            },
            onmouseup: (e: MouseEvent) => {
                this.buttons = e.buttons;
            }
        };
        this.updateAttribs();
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

    requestFocus(id: string) {
        if (this.focusID === "" || this.activeID === id) {
            this.focusID = id;
        }
    }

    switchFocus() {
        this.focusID = "";
        if (this.modifiers & KeyModifier.SHIFT) {
            this.focusID = this.lastID;
        }
        this.key = "";
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
                this.activeID = "__NONE__";
                this.focusID = this.lastID = "";
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
        return this.focusID === id ? this.theme.focus : "none";
    }

    add(...els: any[]) {
        els.length && this.layers[0].push(...els);
        // TODO remove
        assert(this.layers[0].length < 100, "too many elements");
    }

    addOverlay(...els: any[]) {
        els.length && this.layers[1].push(...els);
        // TODO remove
        assert(this.layers[1].length < 100, "too many elements");
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
