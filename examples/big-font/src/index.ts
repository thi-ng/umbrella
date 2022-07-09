import { div, inputRange, inputText, label, pre } from "@thi.ng/hiccup-html";
import { $compile, $input, $inputNum } from "@thi.ng/rdom";
import { staticDropdown } from "@thi.ng/rdom-components";
import { reactive, Stream, sync } from "@thi.ng/rstream";
import { repeat } from "@thi.ng/strings";
import { repeatedly } from "@thi.ng/transducers";
import FONT_L from "./font-large.txt?raw";
import FONT_S from "./font-small.txt?raw";

class Font {
    chars: Record<string, [number, number]> = {};
    rows: string[];

    constructor([header, ...rows]: string[]) {
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
        this.rows = rows;
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
        if (char === undefined) {
            return [...repeatedly(() => "", this.rows.length)];
        }
        const minSpace = Math.min(0, spacing);
        const pad = spacing > 0 ? repeat(" ", spacing) : "";
        return this.rows.map(
            (row) => row.substring(char[0], char[1] + minSpace) + pad
        );
    }

    /**
     * Similar to {@link Font.getChar}, but for an arbitrarily long string
     * (single line).
     *
     * @param txt
     * @param spacing
     */
    getText(txt: string, spacing = 0) {
        const res = [...repeatedly(() => "", this.rows.length)];
        for (let c of txt) {
            this.getChar(c, spacing).forEach((row, i) => (res[i] += row));
        }
        return res;
    }
}

type FontID = "l" | "s";

// instantiate fonts (see font-*.txt files)
const FONTS: Record<FontID, Font> = {
    l: new Font(FONT_L.split("\n")),
    s: new Font(FONT_S.split("\n")),
};

// labels for dropdown
const FONT_NAMES: Record<FontID, string> = {
    l: "large",
    s: "small",
};

// reactive state setup
const msg = reactive("hello?!").map((x) => x.toUpperCase());
const spacing = reactive(-1);
const font = reactive<FontID>("l");

const main = sync({
    src: {
        msg,
        spacing,
        // map font ID to actual font instance
        font: font.map((id) => FONTS[<FontID>id]),
    },
});

// compile UI
$compile(
    div(
        {},
        div(
            ".mb3",
            {},
            label(".dib.w4", { for: "body" }, "TEXT"),
            inputText("#body.w5", { oninput: $input(msg), value: msg })
        ),
        div(
            ".mb3",
            {},
            label(".dib.w4", { for: "spacing" }, "SPACING"),
            inputRange("#spacing.w4", {
                oninput: $inputNum(spacing),
                min: -2,
                max: 2,
                step: 1,
                value: spacing,
            })
        ),
        div(
            ".mb3",
            {},
            label(".dib.w4", { for: "font" }, "FONT"),
            staticDropdown<FontID, FontID>(["l", "s"], font, {
                attribs: { id: "font", class: "w4" },
                label: (id) => FONT_NAMES[id],
            })
        ),
        pre(
            {},
            main.map(({ msg, spacing, font }) =>
                font.getText(msg, spacing).join("\n")
            )
        )
    )
).mount(document.getElementById("app")!);
