import { Component, NumOrElement } from "@thi.ng/hdom2020";
import {
    CHECKMARK_SOLID,
    INFO,
    WARNING,
    withSize,
} from "@thi.ng/hiccup-carbon-icons";
import { div, span } from "@thi.ng/hiccup-html";

const PRESETS = {
    info: { class: "bg-lightest-blue blue", icon: INFO },
    success: { class: "bg-washed-green dark-green", icon: CHECKMARK_SOLID },
    warn: { class: "bg-washed-red dark-red", icon: WARNING },
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
