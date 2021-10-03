import type { ILifecycle } from "@thi.ng/hdom";
import { start } from "@thi.ng/hdom/start";

interface Counter extends ILifecycle {
    id: number;
    enabled: boolean;
    previd: number;
    prevenabled: boolean;
}
/**
 * Button counter HOF component with __skip support
 * Only renders if local state change requires it.
 * If active & clicked, the button will be disabled for
 * 500ms, and only then increments.
 */
const button = () =>
    <Counter>{
        init(_, __, id) {
            this.enabled = true;
            this.id = id;
        },
        render(_, __) {
            const body = [
                "button.dib.w3.pa2.bn",
                {
                    __skip:
                        this.previd === this.id &&
                        this.prevenabled === this.enabled,
                    disabled: this.enabled === false,
                    class: this.enabled
                        ? "bg-black white"
                        : "bg-moon-gray gray",
                    onclick: () => {
                        this.enabled = !this.enabled;
                        setTimeout(() => {
                            this.id++;
                            this.enabled = true;
                        }, 1000);
                    },
                },
                this.id,
            ];
            this.previd = this.id;
            this.prevenabled = this.enabled;
            return body;
        },
    };

/**
 * Button wrapper HOF component (also with __skip support).
 * If `__skip` is active for this component, any updates to the
 * wrapped button component will not be shown until this
 * wrapper's `__skip` attrib is disabled again (However, the
 * counter still remains clickable).
 */
const wrapper = () => {
    let skip = false;
    let nextSkip = false;
    const bt = button();
    return (_: any, id: number) =>
        skip
            ? ["div", { __skip: true }]
            : [
                  `div.pv2.${nextSkip ? "bg-washed-red" : "bg-light-green"}`,
                  [
                      "a.dib.w4.pa2.pointer",
                      {
                          onclick: () => {
                              nextSkip = !nextSkip;
                              requestAnimationFrame(() => (skip = nextSkip));
                          },
                      },
                      nextSkip ? "unskip!" : "skip!",
                  ],
                  [bt, id],
                  nextSkip
                      ? ["div.dib.mh3.f7.red", "(counter updates not shown)"]
                      : null,
              ];
};

const app = () => {
    const bt1 = wrapper();
    const bt2 = wrapper();
    return ["div.sans-serif", [bt1, 0], [bt2, 100]];
};

start(app());
