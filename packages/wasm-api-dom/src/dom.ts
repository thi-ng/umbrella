import { adaptDPI } from "@thi.ng/adapt-dpi";
import { assert } from "@thi.ng/errors/assert";
import type { IWasmAPI, WasmBridge, WasmType } from "@thi.ng/wasm-api";
import { ObjectIndex } from "@thi.ng/wasm-api/object-index";
import {
	$CreateCanvasOpts,
	$CreateElementOpts,
	$Event,
	$WindowInfo,
	CreateElementOpts,
	DOMExports,
	DOMImports,
	Event as WasmEvent,
	EventType,
} from "./api.js";

export class WasmDom implements IWasmAPI<DOMExports> {
	parent!: WasmBridge<DOMExports>;
	$Event!: WasmType<WasmEvent>;
	$CreateElementOpts!: WasmType<CreateElementOpts>;

	elements = new ObjectIndex<Element>({ name: "elements" });
	listeners: Record<
		number,
		{ ctx: number; name: string; fn: EventListener }
	> = {};

	async init(parent: WasmBridge<DOMExports>) {
		this.parent = parent;
		this.elements.add(document.body);
		this.$Event = $Event(this.parent);
		this.$CreateElementOpts = $CreateElementOpts(this.parent);
		return true;
	}

	getImports(): DOMImports {
		return {
			getWindowInfo: (ptr: number) => {
				const info = $WindowInfo(this.parent).instance(ptr);
				info.innerWidth = window.innerWidth;
				info.innerHeight = window.innerHeight;
				info.dpr = window.devicePixelRatio || 1;
			},

			createElement: (optsAddr: number) => {
				const opts = this.$CreateElementOpts.instance(optsAddr);
				const tagName = opts.tag.deref();
				const el = document.createElement(tagName);
				this.attachElement(el, opts.parent, opts.index);
				return this.elements.add(el);
			},

			createCanvas: (optsAddr: number) => {
				const opts = $CreateCanvasOpts(this.parent).instance(optsAddr);
				const el = document.createElement("canvas");
				adaptDPI(el, opts.width, opts.height, opts.dpr);
				this.attachElement(el, opts.parent, opts.index);
				return this.elements.add(el);
			},

			setCanvasSize: (
				elementID: number,
				width: number,
				height: number,
				dpr: number
			) =>
				adaptDPI(
					<HTMLCanvasElement>this.elements.get(elementID),
					width,
					height,
					dpr
				),

			_setStringAttrib: (
				elementID: number,
				name: number,
				val: number
			) => {
				this.elements
					.get(elementID)
					.setAttribute(
						this.parent.getString(name),
						this.parent.getString(val)
					);
			},

			_setNumericAttrib: (
				elementID: number,
				name: number,
				val: number
			) => {
				this.elements
					.get(elementID)
					.setAttribute(this.parent.getString(name), String(val));
			},

			_addListener: (ctxID: number, name: number, listenerID: number) => {
				const ctx = ctxID < 0 ? window : this.elements.get(ctxID);
				const eventName = this.parent.getString(name);
				const fn = (e: Event) => {
					const event = this.$Event.instance(
						this.parent.allocate(this.$Event.size, true)
					);
					const target =
						e.target === window
							? -1
							: this.elements.find((x) => x === e.target);
					event.target = target !== undefined ? target : -2;
					if (e instanceof MouseEvent) {
						const bounds = (<Element>(
							e.target
						)).getBoundingClientRect();
						event.type = EventType.MOUSE;
						event.clientX = e.clientX - bounds.left;
						event.clientY = e.clientY - bounds.top;
						event.buttons = e.buttons;
					} else if (e instanceof TouchEvent) {
						const bounds = (<Element>(
							e.target
						)).getBoundingClientRect();
						event.type = EventType.TOUCH;
						event.clientX = e.touches[0].clientX - bounds.left;
						event.clientY = e.touches[0].clientY - bounds.top;
					} else if (e instanceof KeyboardEvent) {
						event.type = EventType.KEY;
						this.parent.setString(
							e.key,
							event.key.byteOffset,
							8,
							true
						);
					}
					if (
						e instanceof MouseEvent ||
						e instanceof TouchEvent ||
						e instanceof KeyboardEvent
					) {
						event.modifiers =
							(e.shiftKey ? 1 : 0) |
							(e.ctrlKey ? 2 : 0) |
							(e.altKey ? 4 : 0) |
							(e.metaKey ? 8 : 0);
					}
					this.parent.exports.dom_callListener(
						listenerID,
						event.__base
					);
					this.parent.free(event.__base, this.$Event.size);
				};
				ctx.addEventListener(eventName, fn);
				this.listeners[listenerID] = {
					ctx: ctxID,
					name: eventName,
					fn,
				};
			},

			_removeListener: (listenerID: number) => {
				const listener = this.listeners[listenerID];
				assert(!!listener, `unknown listener ID: ${listenerID}`);
				const ctx =
					listener.ctx < 0 ? window : this.elements.get(listener.ctx);
				ctx.removeEventListener(listener.name, listener.fn);
				delete this.listeners[listenerID];
			},

			_setInnerHtml: (elementID: number, body: number) => {
				this.elements.get(elementID).innerHTML =
					this.parent.getString(body);
			},

			_setInnerText: (elementID: number, body: number) => {
				(<HTMLElement>this.elements.get(elementID)).innerText =
					this.parent.getString(body);
			},
		};
	}

	protected attachElement(el: Element, parentID: number, index: number) {
		if (parentID >= 0) {
			const parent = this.elements.get(parentID);
			index < 0
				? parent.appendChild(el)
				: parent.insertBefore(el, parent.childNodes[index]);
		}
	}
}
