import { adaptDPI } from "@thi.ng/adapt-dpi";
import { assert } from "@thi.ng/errors/assert";
import type {
	IWasmAPI,
	ReadonlyWasmString,
	WasmBridge,
	WasmType,
} from "@thi.ng/wasm-api";
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

interface WasmListener {
	ctx: number;
	name: string;
	event: WasmEvent;
	fn: EventListener;
}

export class WasmDom implements IWasmAPI<DOMExports> {
	parent!: WasmBridge<DOMExports>;
	$Event!: WasmType<WasmEvent>;
	$CreateElementOpts!: WasmType<CreateElementOpts>;

	elements = new ObjectIndex<Element>({ name: "elements" });
	listeners: Record<number, WasmListener> = {};

	protected currEvent: Event | null = null;

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
				this.initElement(el, opts);
				return this.elements.add(el);
			},

			removeElement: (elementID: number) => {
				const el = this.elements.get(elementID, false);
				if (!el) return;
				const remove = (el: Element) => {
					const id = this.elements.find((x) => x === el, false);
					if (id !== undefined) this.elements.delete(id, false);
					el.parentNode?.removeChild(el);
					for (let child of el.children) remove(child);
				};
				remove(el);
			},

			createCanvas: (optsAddr: number) => {
				const opts = $CreateCanvasOpts(this.parent).instance(optsAddr);
				const el = document.createElement("canvas");
				adaptDPI(el, opts.width, opts.height, opts.dpr);
				this.initElement(el, <any>opts);
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

			_setStringAttrib: (elementID: number, name: number, val: number) =>
				this.elements
					.get(elementID)
					.setAttribute(
						this.parent.getString(name),
						this.parent.getString(val)
					),

			_setNumericAttrib: (elementID: number, name: number, val: number) =>
				this.elements
					.get(elementID)
					.setAttribute(this.parent.getString(name), String(val)),

			_getStringAttrib: (
				elementID: number,
				name: number,
				valAddr: number,
				maxBytes: number
			) =>
				this.parent.setString(
					String(
						this.elements
							.get(elementID)
							.getAttribute(this.parent.getString(name)) || ""
					),
					valAddr,
					maxBytes,
					true
				),

			_getNumericAttrib: (elementID: number, name: number) =>
				Number(
					this.elements
						.get(elementID)
						.getAttribute(this.parent.getString(name))
				),

			_addListener: (ctxID: number, name: number, listenerID: number) => {
				const ctx = ctxID < 0 ? window : this.elements.get(ctxID);
				const eventName = this.parent.getString(name);
				const event = this.$Event.instance(
					this.parent.allocate(this.$Event.size)
				);
				const fn = (e: Event) => {
					this.currEvent = e;
					this.parent.ensureMemory();
					event.__bytes.fill(0);
					const target =
						e.target === window
							? -1
							: this.elements.find((x) => x === e.target, false);
					event.target = target !== undefined ? target : -2;
					let valueAddr = -1;
					let valueLen: number;
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
							16,
							true
						);
					} else if (e.type === "change" || e.type === "input") {
						event.type = EventType.INPUT;
						const el = <HTMLInputElement>e.target;
						const value =
							el.type === "checkbox"
								? el.checked
									? "on"
									: "off"
								: el.value;
						const valueBytes =
							this.parent.utf8Encoder.encode(value);
						valueLen = valueBytes.length;
						valueAddr = this.parent.allocate(valueLen + 1);
						this.parent.u8.set(valueBytes, valueAddr);
						this.parent.u8[valueAddr + valueLen] = 0;
						event.value.setSlice(valueAddr, valueLen);
					} else {
						event.type = EventType.UNKOWN;
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
					if (valueAddr >= 0) {
						this.parent.free(valueAddr, valueLen! + 1);
						valueAddr = -1;
					}
					this.currEvent = null;
				};
				this.parent.logger.debug(
					`ctx ${ctxID} - adding ${eventName} listener #${listenerID}`
				);
				ctx.addEventListener(eventName, fn);
				this.listeners[listenerID] = {
					ctx: ctxID,
					name: eventName,
					event,
					fn,
				};
			},

			preventDefault: () => {
				this.currEvent && this.currEvent.preventDefault();
			},

			stopImmediatePropagation: () => {
				this.currEvent && this.currEvent.stopImmediatePropagation();
			},

			_removeListener: (listenerID: number) => {
				const listener = this.listeners[listenerID];
				assert(!!listener, `unknown listener ID: ${listenerID}`);
				const ctx =
					listener.ctx < 0 ? window : this.elements.get(listener.ctx);
				ctx.removeEventListener(listener.name, listener.fn);
				this.parent.logger.debug(
					`removing event listener #${listenerID}`
				);
				this.parent.free(listener.event.__base, this.$Event.size);
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

			_requestAnimationFrame: (rafID: number) => {
				this.parent.logger.fine(`requestAnimationFrame #${rafID}`);
				requestAnimationFrame((t) =>
					this.parent.exports.dom_callRAF(rafID, t)
				);
			},
		};
	}

	protected initElement(
		el: Element,
		opts: Pick<
			Readonly<CreateElementOpts>,
			"class" | "id" | "index" | "parent"
		> &
			Partial<{ html: ReadonlyWasmString; text: ReadonlyWasmString }>
	) {
		const { id, class: $class, parent, index } = opts;
		if (id.length) el.setAttribute("id", id.deref());
		if ($class.length) el.setAttribute("class", $class.deref());
		if (opts.html?.length) {
			el.innerHTML = opts.html.deref();
		} else if (opts.text?.length) {
			(<HTMLElement>el).innerText = opts.text.deref();
		}
		if (parent >= 0) {
			const parentEl = this.elements.get(parent);
			index < 0
				? parentEl.appendChild(el)
				: parentEl.insertBefore(el, parentEl.childNodes[index]);
		}
	}
}
