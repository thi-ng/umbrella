import { article, linkCSS, section, slot } from "@thi.ng/hiccup-html";
import { $tree } from "@thi.ng/rdom";
import CSS_URL from "./component.css?url";

// References:
// - https://developer.mozilla.org/en-US/docs/Web/API/Web_components
// - https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements
customElements.define(
	"my-component",
	class extends HTMLElement {
		shadow: ShadowRoot;

		static observedAttributes = ["color", "highlight"];

		constructor() {
			super();
			this.shadow = this.attachShadow({ mode: "open" });
			this.shadow.adoptedStyleSheets = [new CSSStyleSheet()];
		}

		attributeChangedCallback() {
			const color = this.getAttribute("color") || "#666";
			let highlight = this.getAttribute("highlight") || "transparent";
			highlight = highlight === "highlight" ? "#ffc" : highlight;
			this.shadow.adoptedStyleSheets[0].replaceSync(
				`:host{--color1:${color};--color2:${highlight}}`
			);
		}

		connectedCallback() {
			$tree(
				article(
					{},
					linkCSS(CSS_URL),
					section({}, slot({ name: "pre" })),
					section({}, slot({}, "Hello web components!")),
					section({}, slot({ name: "post" }))
				),
				this.shadow
			);
			this.attributeChangedCallback();
		}
	}
);
