import type { Fn } from "@thi.ng/api";
import { meldDeepObj } from "@thi.ng/associative";
import { Attribs, div, textArea, TextAreaAttribs } from "@thi.ng/hiccup-html";
import { $compile, IComponent } from "@thi.ng/rdom";
import { reactive, Subscription } from "@thi.ng/rstream";
import { computeCursorPos } from "@thi.ng/strings";

export interface EditorOpts {
    /**
     * Attribs for wrapper div.
     */
    wrapper: Partial<Attribs>;
    editor: {
        /**
         * Attribs for textarea element
         */
        attribs: Partial<TextAreaAttribs>;
    };
    cursor: Partial<{
        /**
         * Attribs for cursor position div
         */
        attribs: Partial<Attribs>;
        /**
         * Optional format function for cursor position (receives
         * `[line,col]` tuple). Default: "1:2"
         */
        format: Fn<number[], string>;
    }>;
}

export const editor = (
    src: Subscription<string, string>,
    opts: Partial<EditorOpts> = {}
) => {
    opts = meldDeepObj(
        <EditorOpts>{
            editor: {
                attribs: {
                    spellcheck: false,
                },
            },
            cursor: {
                format: (pos) => pos[0] + ":" + pos[1],
            },
        },
        opts
    );
    let inner: IComponent;
    const fmt = opts.cursor!.format!;
    const cursor = reactive(0).map((pos) =>
        fmt(
            inner
                ? computeCursorPos((<HTMLTextAreaElement>inner.el!).value, pos)
                : [1, 1]
        )
    );
    const setCursor = (e: Event) =>
        cursor.next((<HTMLTextAreaElement>e.target).selectionStart);
    return div(
        opts.wrapper,
        (inner = $compile(
            textArea({
                ...opts.editor!.attribs,
                value: src,
                oninput: (e) => {
                    setCursor(e);
                    src.next((<HTMLTextAreaElement>e.target).value);
                },
                onkeyup: setCursor,
                onmouseup: setCursor,
            })
        )),
        div(opts.cursor!.attribs, cursor)
    );
};
