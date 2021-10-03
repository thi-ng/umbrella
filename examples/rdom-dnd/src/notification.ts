import { CHECKMARK_FILLED } from "@thi.ng/hiccup-carbon-icons/checkmark-filled";
import { INFORMATION_FILLED } from "@thi.ng/hiccup-carbon-icons/information-filled";
import { withSize } from "@thi.ng/hiccup-carbon-icons/with-size";
import { WARNING_ALT_FILLED } from "@thi.ng/hiccup-carbon-icons/warning-alt-filled";
import { div } from "@thi.ng/hiccup-html/blocks";
import { span } from "@thi.ng/hiccup-html/inline";
import type { NumOrElement } from "@thi.ng/rdom";
import { Component } from "@thi.ng/rdom/component";

const PRESETS = {
    info: { class: "bg-lightest-blue blue", icon: INFORMATION_FILLED },
    success: { class: "bg-washed-green dark-green", icon: CHECKMARK_FILLED },
    warn: { class: "bg-washed-red dark-red", icon: WARNING_ALT_FILLED },
};

export interface NotifyOpts {
    type: keyof typeof PRESETS;
    msg: string;
}

export class Notification extends Component<NotifyOpts> {
    timeout!: number;

    async mount(parent: Element, index?: NumOrElement) {
        return (this.el = this.$el(
            "div",
            { hidden: true },
            null,
            parent,
            index
        ));
    }

    update(msg: NotifyOpts) {
        const config = PRESETS[msg.type];
        this.$tree(
            div(
                { class: `w-100 ph3 pv2 mv2 br-pill ${config.class}` },
                span({ class: "icon mr2" }, withSize(config.icon, "16px")),
                msg.msg
            ),
            this.$clear()
        );
        this.$attribs({ hidden: false });
        clearTimeout(this.timeout);
        // @ts-ignore
        this.timeout = setTimeout(() => this.$attribs({ hidden: true }), 2000);
    }

    async unmount() {
        clearTimeout(this.timeout);
        super.unmount();
    }
}
