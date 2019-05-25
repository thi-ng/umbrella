import { Fn2, IObjectOf } from "@thi.ng/api";
import { ReadonlyVec } from "@thi.ng/vectors";
import { GLVec4 } from "@thi.ng/webgl";

export interface RawGlyphs {
    pages: string[];
    info: {
        face: string;
        size: number;
    };
    common: {
        scaleW: number;
        scaleH: number;
        lineHeight: number;
        base: number;
    };
    chars: {
        id: number;
        x: number;
        y: number;
        xoffset: number;
        yoffset: number;
        width: number;
        height: number;
        xadvance: number;
    }[];
}

export interface MSDFFont {
    fontFace: string;
    fontSize: number;
    tex: string;
    size: ReadonlyVec;
    lineHeight: number;
    baseLine: number;
    chars: IObjectOf<{
        pos: ReadonlyVec;
        size: ReadonlyVec;
        offset: ReadonlyVec;
        step: number;
    }>;
}

export type TextAlign = Fn2<MSDFFont, string, number>;

export interface TextOpts {
    /**
     * Text alignment function (individual per line).
     * Default: `alignLeft`
     */
    align: TextAlign;
    /**
     * Leading (line height multiplier). Default: 1.0
     */
    leading: number;
    /**
     * If true, `text()` will produce color attributes.
     */
    useColor: boolean;
    /**
     * Default RGBA color, only used if `useColor = true`.
     */
    color: GLVec4;
}

export type ColorString = [GLVec4, string];
