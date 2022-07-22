import type { Keys } from "@thi.ng/api";
import {
    checkbox,
    div,
    inputRange,
    inputText,
    label,
    pre,
} from "@thi.ng/hiccup-html";
import { getIn, setIn } from "@thi.ng/paths";
import { $compile, $input, $inputCheckbox, $inputNum } from "@thi.ng/rdom";
import { staticDropdown } from "@thi.ng/rdom-components";
import { reactive, sync } from "@thi.ng/rstream";
import { repeat } from "@thi.ng/strings";
import { map, repeatedly } from "@thi.ng/transducers";
import FONT_ATARI from "./fonts/atari.txt?raw";
import FONT_GOTHIC from "./fonts/newgothic.txt?raw";
import FONT_SMALL from "./fonts/smallblock.txt?raw";

/**
 * Fonts used by this class are defined in plain text using this format:
 *
 * - Line 1: lineheight (number of lines for all chars)
 * - Line 2: header with character markers
 * - Lines 3-N: Character defs
 * - Lines N+1...: Kerning pairs (one pair per line, e.g. `LY -4`)
 *
 * See example fonts in /src/fonts
 */
class Font {
    chars: Record<string, [number, number]> = {};
    rows: string[];
    kerning: Record<string, Record<string, number>> = {};

    constructor([$height, header, ...rows]: string[]) {
        const height = parseInt($height);
        // parse header line to determine characters
        // and their offsets & widths...
        let prev: string | undefined;
        for (let x = 0; x < header.length; x++) {
            // skipping non-markers
            if (header[x] !== "|") continue;
            const id = header[x + 1];
            this.chars[id] = [x, 0];
            if (prev !== undefined) {
                const char = this.chars[prev];
                char[1] = x;
            }
            prev = id;
            x++;
        }
        if (prev !== undefined) {
            this.chars[prev][1] = header.length;
        }
        // process kern pairs/table
        // build index of character pairs & their kern values
        // e.g. { L: { Y: -2 } } for a Y following an L will be shifted left
        this.rows = rows.slice(0, height);
        for (let pair of rows.slice(height)) {
            if (!pair.length) continue;
            const [[a, b], k] = pair.split(" ");
            this.kerning = setIn(this.kerning, [a, b], parseInt(k));
        }
    }

    /**
     * Returns string array for a single char, optionally with applied letter
     * spacing. If the character is not defined, returns an array of empty
     * strings.
     *
     * @param id
     * @param spacing
     */
    getChar(id: string, spacing = 0) {
        const char = this.chars[id];
        const pad = spacing > 0 ? repeat(" ", spacing) : "";
        return char !== undefined
            ? this.rows.map((row) => row.substring(char[0], char[1]) + pad)
            : [...repeatedly(() => pad, this.rows.length)];
    }

    kernPair(acc: string[], a: string, b: string, spacing = 0, kern = true) {
        const brows = this.getChar(b, spacing);
        const k = kern ? (getIn(this.kerning, [a, b]) || 0) + spacing : spacing;
        const merge = (a: string, b: string) =>
            b.replace(/./g, (x, i) => (x != " " ? x : a[i]));
        if (k < 0) {
            return acc.map((row, i) =>
                [
                    row.substring(0, row.length + k),
                    merge(
                        row.substring(row.length + k),
                        brows[i].substring(0, -k)
                    ),
                    brows[i].substring(-k),
                ].join("")
            );
        } else {
            return acc.map((row, i) => row + brows[i]);
        }
    }

    /**
     * Similar to {@link Font.getChar}, but for an arbitrarily long string
     * (single line) and kerning (by default).
     *
     * @param txt
     * @param spacing
     * @param kern
     */
    getText([first, ...rest]: string, spacing = 0, kern = true) {
        let res = this.getChar(first, spacing);
        let prev = first;
        for (let c of rest) {
            res = this.kernPair(res, prev, c, spacing, kern);
            prev = c;
        }
        return res;
    }
}

// instantiate fonts (see *.txt files in /src/fonts dir)
const FONTS = {
    atari: new Font(FONT_ATARI.split("\n")),
    newgothic: new Font(FONT_GOTHIC.split("\n")),
    small: new Font(FONT_SMALL.split("\n")),
};

type FontID = Keys<typeof FONTS>;

// labels for dropdown
const FONT_NAMES = <FontID[]>Object.keys(FONTS);

// reactive state setup
const msg = reactive("hello?!").map((x) => x.toUpperCase());
const spacing = reactive(0);
const kerning = reactive(true);
const font = reactive<FontID>("atari");

// reactive stream combinator
const main = sync({
    src: {
        msg,
        spacing,
        kerning,
        font,
    },
    // compute ASCII output
    xform: map(({ msg, spacing, kerning, font }) =>
        FONTS[font].getText(msg, spacing, kerning).join("\n")
    ),
});

// helper component to wrap form elements
const formParam = (el: [string, ...any[]]) => {
    const id = el[1].id;
    return div(".mb3", {}, label(".dib.w4.ttu", { for: id }, id), el);
};

// compile UI
$compile(
    div(
        {},
        formParam(
            inputText(".w5", {
                id: "text",
                autofocus: true,
                oninput: $input(msg),
                value: msg,
            })
        ),
        formParam(
            staticDropdown<FontID, FontID>(FONT_NAMES, font, {
                attribs: { id: "font", class: "w5" },
            })
        ),
        formParam(
            inputRange(".w4", {
                id: "spacing",
                oninput: $inputNum(spacing),
                min: 0,
                max: 4,
                step: 1,
                value: spacing,
            })
        ),
        formParam(
            checkbox({
                id: "kerning",
                oninput: $inputCheckbox(kerning),
                checked: kerning,
            })
        ),
        pre({}, main)
    )
).mount(document.getElementById("app")!);
