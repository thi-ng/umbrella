import {
	CHECKMARK_FILLED,
	INFORMATION_FILLED,
	WARNING_ALT_FILLED,
	withSize,
} from "@thi.ng/hiccup-carbon-icons";
import { div, i } from "@thi.ng/hiccup-html";
import { Component, type NumOrElement } from "@thi.ng/rdom";

const ICONS = {
	info: INFORMATION_FILLED,
	success: CHECKMARK_FILLED,
	warn: WARNING_ALT_FILLED,
};

export interface NotifyOpts {
	type: keyof typeof ICONS;
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
		this.$tree(
			div(
				".notification",
				{ data: { type: msg.type } },
				i(null, withSize(ICONS[msg.type], "1rem")),
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
