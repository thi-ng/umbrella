import {
	CHECKMARK_FILLED,
	INFORMATION_FILLED,
	WARNING_ALT_FILLED,
} from "@thi.ng/hiccup-carbon-icons";
import { linkCSS, span } from "@thi.ng/hiccup-html";
import { $tree } from "@thi.ng/rdom";
import CSS_URL from "./icon.css?url";

const ICONS = {
	info: INFORMATION_FILLED,
	success: CHECKMARK_FILLED,
	warn: WARNING_ALT_FILLED,
};

// References:
// - https://developer.mozilla.org/en-US/docs/Web/API/Web_components
// - https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements
customElements.define(
	"my-icon",
	class extends HTMLElement {
		shadow: ShadowRoot;

		static observedAttributes = ["type", "size"];

		constructor() {
			super();
			this.shadow = this.attachShadow({ mode: "open" });
		}

		attributeChangedCallback(name: string, _: string, val: string) {
			const el = <HTMLElement>this.shadow.children[0];
			if (!el) return;
			switch (name) {
				case "type":
					if (val in ICONS) {
						$tree(ICONS[<keyof typeof ICONS>val], el, 1);
					}
					break;
				case "size":
					el.style.width = val + "rem";
					break;
			}
		}

		initAttrib(name: string, defaultVal: string) {
			this.attributeChangedCallback(
				name,
				"",
				this.getAttribute(name) || defaultVal
			);
		}

		async connectedCallback() {
			await $tree(span({}, linkCSS(CSS_URL)), this.shadow);
			this.initAttrib("type", "info");
			this.initAttrib("size", "1");
		}
	}
);
