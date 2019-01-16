import { start } from "@thi.ng/hdom";

/**
 * HOF component for rendering HTML strings by setting `innerHTML`. The
 * returned component takes a single HTML string as arg and updates each
 * time the given string has changed.
 */
const innerHtmlWrapper =
    () => ({
        init(el, _, html) {
            this.el = el;
            this.prev = html;
            el.innerHTML = html;
        },
        render(_, body) {
            if (this.el && this.prev != body) {
                this.el.innerHTML = body;
                this.prev = body;
            }
            return ["div"];
        }
    });

/**
 * Root component.
 */
const app = () => {
    // instantiate HTML wrapper
    const wrapper = innerHtmlWrapper();
    return () =>
        [wrapper,
            new Date().getSeconds() & 1 ?
                `<div class="bg-washed-yellow sans-serif pa3">Time now:</div>` :
                `<div class="bg-washed-green sans-serif pa3 b">${new Date().toLocaleTimeString()}</div>`
        ];
};

// kick off
const cancel = start(app());

// HMR handling
if (process.env.NODE_ENV !== "production") {
    const hot = (<any>module).hot;
    hot && hot.dispose(cancel);
}
