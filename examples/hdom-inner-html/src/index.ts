import { start } from "@thi.ng/hdom";

/**
 * HOF component for rendering HTML strings by setting `innerHTML`. The
 * returned component takes a single HTML string as arg and updates each
 * time the given string has changed.
 */
const innerHtmlWrapper = () =>
    <any>{
        init(el: any, _: any, html: string) {
            this.el = el;
            this.prev = html;
            el.innerHTML = html;
        },
        render(_: any, html: string) {
            if (this.el && this.prev != html) {
                this.el.innerHTML = html;
                this.prev = html;
            }
            return ["div"];
        },
        release() {
            this.el.innerHTML = "";
            delete this.prev;
            delete this.el;
        },
    };

/**
 * Root component.
 */
const app = () => {
    // instantiate HTML wrapper
    const wrapper = innerHtmlWrapper();
    return () => [
        wrapper,
        new Date().getSeconds() & 1
            ? `<div class="bg-washed-yellow sans-serif pa3">Time now:</div>`
            : `<div class="bg-washed-green sans-serif pa3 b">${new Date().toLocaleTimeString()}</div>`,
    ];
};

// kick off
start(app());
