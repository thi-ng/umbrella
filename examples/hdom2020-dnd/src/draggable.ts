import type { Fn } from "@thi.ng/api";
import { div } from "@thi.ng/hiccup-html";
import { Component, ComponentLike, NumOrElement } from "@thi.ng/hdom2020";

interface DraggableOpts {
    scope?: string;
    dropzone: string;
    start: any;
    hover: any;
    end: any;
    onstart?: Fn<DragEvent, void>;
    onend?: Fn<DragEvent, void>;
    ondrop?: Fn<DragEvent, void>;
}

export class Draggable extends Component {
    protected opts: DraggableOpts;
    protected active = false;

    constructor(protected inner: ComponentLike, opts?: Partial<DraggableOpts>) {
        super();
        this.opts = {
            dropzone: "dropzone",
            start: { opacity: 0.5 },
            end: { opacity: null },
            hover: { background: "yellow" },
            ...opts,
        };
    }

    async mount(parent: Element, index: NumOrElement) {
        const opts = this.opts;
        this.el = await this.$tree(
            div(
                {
                    draggable: true,
                    ondragstart: (e) => {
                        e.dataTransfer!.setData("text/plain", "");
                        this.active = true;
                        this.$style(opts.start);
                        opts.onstart && opts.onstart(e);
                    },
                    ondragend: (e) => {
                        this.active = false;
                        this.$style(opts.end);
                        opts.onend && opts.onend(e);
                    },
                },
                this.inner
            ),
            parent,
            index
        );
        const isDropZone = (e: DragEvent) =>
            this.active &&
            (<HTMLElement>e.target).dataset.dropzone === opts.dropzone;
        const undoHover = objWithNull(opts.hover);
        // add event handlers to configured DOM scope
        this.$attribs(
            {
                ondragover: (e: DragEvent) => e.preventDefault(),
                ondragenter: (e: DragEvent) =>
                    isDropZone(e) && this.$style(opts.hover, <Element>e.target),
                ondragleave: (e: DragEvent) =>
                    isDropZone(e) && this.$style(undoHover, <Element>e.target),
                ondrop: (e: DragEvent) => {
                    e.preventDefault();
                    if (isDropZone(e)) {
                        this.$style(opts.end);
                        this.$style(undoHover, <Element>e.target);
                        this.$moveTo(<Element>e.target);
                        opts.ondrop && opts.ondrop(e);
                    }
                    this.active = false;
                    opts.onend && opts.onend(e);
                },
            },
            this.opts.scope
                ? document.getElementById(this.opts.scope)!
                : <any>document
        );
        return this.el!;
    }
}

const objWithNull = (obj: any) =>
    Object.keys(obj).reduce((acc: any, id) => ((acc[id] = null), acc), {});
