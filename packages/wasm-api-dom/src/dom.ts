import { adaptDPI } from "@thi.ng/adapt-dpi";
import type { NumOrString } from "@thi.ng/api";
import { assert } from "@thi.ng/errors/assert";
import {
	IWasmAPI,
	ReadonlyWasmString,
	WasmBridge,
	WasmStringSlice,
	WasmType,
	WasmTypeBase,
} from "@thi.ng/wasm-api";
import { ObjectIndex } from "@thi.ng/wasm-api/object-index";
import {
	$CreateCanvasOpts,
	$CreateElementOpts,
	$Event,
	$WindowInfo,
	AttribType,
	CreateElementOpts,
	Event as WasmEvent,
	EventBody,
	EventType,
	NS_PREFIXES,
	WasmDomExports,
	WasmDomImports,
} from "./api.js";

/**
 * Hidden property for managed DOM elements to track IDs of attached WASM event
 * listeners
 */
const __listeners = "__wasm_listeners";

interface WasmElement extends Element {
	[__listeners]: Set<number>;
}

/**
 * Map of JS event name regexps to {@link EventType} enums and {@link EventBody}
 * field names
 */
const EVENT_MAP: [
	RegExp,
	Exclude<keyof EventBody, keyof WasmTypeBase> | undefined,
	EventType
][] = [
	[/^drag(end|enter|leave|over|start)|drop$/, "drag", EventType.DRAG],
	[/^blur|focus(in|out)?$/, , EventType.FOCUS],
	[/^change|(before)?input$/, "input", EventType.INPUT],
	[/^key(down|press|up)$/, "key", EventType.KEY],
	[
		/^(dbl)?click|contextmenu|mouse(down|enter|leave|move|out|over|up)$/,
		"mouse",
		EventType.MOUSE,
	],
	[
		/^(got|lost)pointercapture|pointer(cancel|down|enter|leave|move|out|over|up)$/,
		"pointer",
		EventType.POINTER,
	],
	[/^scroll$/, "scroll", EventType.SCROLL],
	[/^touch(cancel|end|move|start)$/, "touch", EventType.TOUCH],
	[/^wheel$/, "touch", EventType.WHEEL],
];

/** @internal */
interface WasmListener {
	ctx: number;
	name: string;
	event: WasmEvent;
	fn: EventListener;
}

export class WasmDom implements IWasmAPI<WasmDomExports> {
	static readonly id = "dom";

	readonly id = WasmDom.id;

	parent!: WasmBridge<WasmDomExports>;
	$Event!: WasmType<WasmEvent>;
	$CreateElementOpts!: WasmType<CreateElementOpts>;

	elements = new ObjectIndex<Element>({ name: "elements" });
	listeners: Record<number, WasmListener> = {};

	protected currEvent: Event | null = null;
	protected currDataTransfer: DataTransfer | null = null;

	async init(parent: WasmBridge<WasmDomExports>) {
		this.parent = parent;
		if (parent.exports._dom_init) {
			parent.exports._dom_init();
		} else {
			parent.logger.warn("DOM module unused, skipping auto-init...");
		}
		this.elements.add(document.head);
		this.elements.add(document.body);
		this.$Event = $Event(this.parent);
		this.$CreateElementOpts = $CreateElementOpts(this.parent);
		return true;
	}

	getImports(): WasmDomImports {
		return {
			getWindowInfo: (ptr: number) => {
				const info = $WindowInfo(this.parent).instance(ptr);
				info.innerWidth = window.innerWidth;
				info.innerHeight = window.innerHeight;
				info.dpr = window.devicePixelRatio || 1;
				info.scrollX = window.scrollX;
				info.scrollY = window.scrollY;
				info.fullscreen =
					(document.fullscreenElement ||
					(<any>document).webkitFullscreenElement
						? 1
						: 0) |
					(document.fullscreenEnabled ||
					(<any>document).webkitFullscreenEnabled
						? 2
						: 0);
			},

			getElementByID: (nameAddr: number) => {
				const name = this.parent.getString(nameAddr);
				let id = this.elements.find((el) => el.id === name);
				if (id === undefined) {
					const el = document.getElementById(name);
					return el ? this.elements.add(el) : -1;
				}
				return id;
			},

			createElement: (optsAddr: number) => {
				const create = (
					opts: CreateElementOpts,
					nestedParent?: number
				) => {
					const tagName = opts.tag.deref();
					const ns = opts.ns.deref();
					const el = ns
						? document.createElementNS(
								NS_PREFIXES[ns] || ns,
								tagName
						  )
						: document.createElement(tagName);
					const id = this.elements.add(el);
					this.initElement(id, el, opts, nestedParent);
					if (opts.children.length > 0) {
						for (let child of opts.children) {
							create(child, id);
						}
					}
					return id;
				};
				return create(this.$CreateElementOpts.instance(optsAddr));
			},

			removeElement: (elementID: number) => {
				assert(elementID > 1, "can't remove reserved element");
				const el = this.elements.get(elementID, false);
				if (!el) return;
				const remove = (el: Element) => {
					const elementID = this.elements.find(
						(x) => x === el,
						false
					);
					if (elementID !== undefined) {
						this.elements.delete(elementID, false);
						const elementListeners = (<WasmElement>el)[__listeners];
						if (elementListeners) {
							for (let listenerID of elementListeners) {
								this.removeListener(el, listenerID);
								// WASM side cleanup
								this.parent.exports._dom_removeListener(
									listenerID
								);
							}
						}
					}
					el.parentNode?.removeChild(el);
					for (let child of [...el.children]) remove(child);
				};
				remove(el);
			},

			createCanvas: (optsAddr: number) => {
				const opts = $CreateCanvasOpts(this.parent).instance(optsAddr);
				const el = document.createElement("canvas");
				adaptDPI(el, opts.width, opts.height, opts.dpr);
				const id = this.elements.add(el);
				this.initElement(id, el, opts);
				return id;
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

			setStringAttrib: (elementID: number, name: number, val: number) =>
				this.setAttrib(elementID, name, this.parent.getString(val)),

			setNumericAttrib: (elementID: number, name: number, val: number) =>
				this.setAttrib(elementID, name, val),

			_setBooleanAttrib: (
				elementID: number,
				nameAddr: number,
				val: number
			) => {
				const el = this.elements.get(elementID);
				const name = this.parent.getString(nameAddr);
				if (name in el) {
					// @ts-ignore
					el[name] = !!val;
				} else {
					val ? el.setAttribute(name, "") : el.removeAttribute(name);
				}
			},

			_getStringAttrib: (
				elementID: number,
				nameAddr: number,
				valAddr: number,
				maxBytes: number
			) =>
				this.parent.setString(
					String(this.getAttrib(elementID, nameAddr) || ""),
					valAddr,
					maxBytes,
					true
				),

			_getStringAttribAlloc: (
				elementID: number,
				nameAddr: number,
				slice: number
			) =>
				new WasmStringSlice(this.parent, slice).setAlloc(
					String(this.getAttrib(elementID, nameAddr) || ""),
					true
				),

			getNumericAttrib: (elementID: number, nameAddr: number) =>
				Number(this.getAttrib(elementID, nameAddr) || ""),

			_getBooleanAttrib: (elementID: number, nameAddr: number) =>
				~~(this.getAttrib(elementID, nameAddr) != null),

			addClass: (elementID: number, name: number) =>
				this.elements
					.get(elementID)
					.classList.add(this.parent.getString(name)),

			removeClass: (elementID: number, name: number) =>
				this.elements
					.get(elementID)
					.classList.remove(this.parent.getString(name)),

			_addListener: (ctxID: number, name: number, listenerID: number) => {
				const ctx = ctxID < 0 ? window : this.elements.get(ctxID);
				const eventName = this.parent.getString(name);
				const eventSpec = EVENT_MAP.find(([re]) => re.test(eventName));
				const [eventBodyID, eventTypeID] = eventSpec
					? [eventSpec[1], eventSpec[2]]
					: [undefined, EventType.UNKOWN];
				const hasModifiers = [
					EventType.DRAG,
					EventType.INPUT,
					EventType.KEY,
					EventType.MOUSE,
					EventType.POINTER,
					EventType.TOUCH,
					EventType.WHEEL,
				].includes(eventTypeID);
				const event = this.$Event.instance(
					this.parent.allocate(this.$Event.size)[0]
				);
				const body = eventBodyID ? event.body[eventBodyID] : undefined;
				const fn = (e: Event) => {
					this.currEvent = e;
					this.parent.ensureMemory();
					event.__bytes.fill(0);
					const target =
						e.target === ctx
							? ctxID
							: e.target === window
							? -1
							: this.elements.find((x) => x === e.target, false);
					event.target = target !== undefined ? target : -2;
					event.id = eventTypeID;
					const slice = body ? body.fromEvent(<any>e) : undefined;
					if (hasModifiers) {
						(<any>body!).modifiers = this.encodeModifiers(
							<KeyboardEvent>e
						);
					}
					if (eventTypeID === EventType.DRAG) {
						this.currDataTransfer = (<DragEvent>e).dataTransfer;
					}
					this.parent.exports._dom_callListener(
						listenerID,
						event.__base
					);
					if (slice) this.parent.free(slice);
					this.currEvent = null;
					this.currDataTransfer = null;
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
				if (ctxID >= 0) {
					(
						(<WasmElement>ctx)[__listeners] ||
						((<WasmElement>ctx)[__listeners] = new Set())
					).add(listenerID);
				}
			},

			preventDefault: () => {
				this.currEvent && this.currEvent.preventDefault();
			},

			stopPropagation: () => {
				this.currEvent && this.currEvent.stopPropagation();
			},

			stopImmediatePropagation: () => {
				this.currEvent && this.currEvent.stopImmediatePropagation();
			},

			_removeListener: (listenerID: number) => {
				const listener = this.listeners[listenerID];
				assert(!!listener, `unknown listener ID: ${listenerID}`);
				const ctx =
					listener.ctx < 0 ? window : this.elements.get(listener.ctx);
				this.removeListener(ctx, listenerID);
				if (listener.ctx >= 0) {
					const listeners = (<WasmElement>ctx)[__listeners];
					if (listeners.has(listenerID)) listeners.delete(listenerID);
				}
			},

			setInnerHtml: (elementID: number, body: number) => {
				this.elements.get(elementID).innerHTML =
					this.parent.getString(body);
			},

			setInnerText: (elementID: number, body: number) => {
				(<HTMLElement>this.elements.get(elementID)).innerText =
					this.parent.getString(body);
			},

			_requestAnimationFrame: (rafID: number) => {
				this.parent.logger.fine(`requestAnimationFrame #${rafID}`);
				requestAnimationFrame((t) =>
					this.parent.exports._dom_callRAF(rafID, t)
				);
			},

			_requestFullscreen: async (elementID: number) => {
				if (
					!(
						document.fullscreenElement ||
						(<any>document).webkitFullscreenElement
					)
				) {
					const el =
						elementID <= 1
							? document.documentElement
							: this.elements.get(elementID);
					const method =
						el.requestFullscreen ||
						(<any>el).webkitRequestFullscreen;
					await method.bind(el)();
					this.parent.exports._dom_fullscreenChanged();
				}
			},

			_exitFullscreen: async () => {
				if (
					document.fullscreenElement ||
					(<any>document).webkitFullscreenElement
				) {
					const method =
						document.exitFullscreen ||
						(<any>document).webkitExitFullscreen;
					await method.bind(document)();
					this.parent.exports._dom_fullscreenChanged();
				}
			},
		};
	}

	protected initElement(
		elementID: number,
		el: Element,
		opts: Pick<
			Readonly<CreateElementOpts>,
			"attribs" | "class" | "id" | "index" | "parent"
		> &
			Partial<{
				html: ReadonlyWasmString;
				text: ReadonlyWasmString;
			}>,
		nestedParent?: number
	) {
		const { id, attribs, class: $class, index } = opts;
		if (id.length) el.setAttribute("id", id.deref());
		if ($class.length) el.setAttribute("class", $class.deref());
		if (opts.html?.length) {
			el.innerHTML = opts.html.deref();
		} else if (opts.text?.length) {
			(<HTMLElement>el).innerText = opts.text.deref();
		}
		if (attribs && attribs.length) {
			for (let attr of attribs) {
				const name = attr.name.deref();
				if (attr.kind === AttribType.EVENT) {
					const listenerAddr = attr.value.event.__base;
					const listenerID =
						this.parent.exports._dom_addListener(listenerAddr);
					this.getImports()._addListener(
						elementID,
						attr.name.addr,
						listenerID
					);
				} else if (attr.kind === AttribType.FLAG) {
					attr.value.flag && el.setAttribute(name, "");
				} else {
					el.setAttribute(
						name,
						attr.kind === AttribType.STR
							? attr.value.str.deref()
							: String(attr.value.num)
					);
				}
			}
		}
		const parent = nestedParent != undefined ? nestedParent : opts.parent;
		if (parent >= 0) {
			const parentEl = this.elements.get(parent);
			index < 0
				? parentEl.appendChild(el)
				: parentEl.insertBefore(el, parentEl.childNodes[index]);
		}
	}

	protected encodeModifiers(e: KeyboardEvent) {
		return (
			(e.shiftKey ? 1 : 0) |
			(e.ctrlKey ? 2 : 0) |
			(e.altKey ? 4 : 0) |
			(e.metaKey ? 8 : 0)
		);
	}

	protected getAttrib(elementID: number, nameAddr: number) {
		const el = this.elements.get(elementID);
		const name = this.parent.getString(nameAddr);
		return name in el ? el[<keyof Element>name] : el.getAttribute(name);
	}

	protected setAttrib(
		elementID: number,
		nameAddr: number,
		value: NumOrString
	) {
		const el = this.elements.get(elementID);
		const name = this.parent.getString(nameAddr);
		return name in el
			? // @ts-ignore
			  (el[name] = value)
			: el.setAttribute(name, String(value));
	}

	protected removeListener(ctx: Window | Element, listenerID: number) {
		const listener = this.listeners[listenerID];
		assert(!!listener, `invalid listener ID ${listenerID}`);
		this.parent.logger.debug(`removing event listener #${listenerID}`);
		delete this.listeners[listenerID];
		ctx.removeEventListener(listener.name, listener.fn);
		this.parent.free([listener.event.__base, this.$Event.size]);
	}
}
