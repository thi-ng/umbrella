import type { IObjectOf } from "@thi.ng/api";

export type BgFg = [string, string];
export type BgFgBorder = [string, string, string];

export interface Theme {
    selection: BgFg;
    header: BgFg;
    diff: {
        add: {
            main: BgFg;
            word: BgFg;
            side: BgFgBorder;
        };
        del: {
            main: BgFg;
            word: BgFg;
            side: BgFgBorder;
        };
        nochange: {
            main: BgFg;
            side: BgFgBorder;
        };
        fold: BgFg;
        hover: {
            main: BgFg;
            side: BgFgBorder;
        };
    };
}

export const THEMES: IObjectOf<Theme> = {
    default: {
        selection: ["black", "white"],
        header: ["ghostwhite", "black"],
        diff: {
            add: {
                main: ["#dfe", "#000"],
                side: ["lightgreen", "#393", "#9c9"],
                word: ["lightgreen", "#000"],
            },
            del: {
                main: ["#fde", "#000"],
                side: ["lightcoral", "#933", "#c99"],
                word: ["orangered", "#000"],
            },
            nochange: {
                main: ["#fff", "#000"],
                side: ["#eee", "#999", "#ccc"],
            },
            fold: ["whitesmoke", "#666"],
            hover: {
                main: ["papayawhip", "#000"],
                side: ["papayawhip", "#993", "#cc9"],
            },
        },
    },
};

export const DEFAULT_THEME = THEMES.default;
