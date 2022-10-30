import { adaptDPI } from "@thi.ng/adapt-dpi";
import { assert } from "@thi.ng/errors/assert";
import type {
	IWasmAPI,
	ReadonlyWasmString,
	WasmBridge,
	WasmType,
	WasmTypeBase,
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
	EventBody,
	EventType,
	NS_PREFIXES,
} from "./api.js";

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

export class WasmDom implements IWasmAPI<DOMExports> {
	parent!: WasmBridge<DOMExports>;
	$Event!: WasmType<WasmEvent>;
	$CreateElementOpts!: WasmType<CreateElementOpts>;

	elements = new ObjectIndex<Element>({ name: "elements" });
	listeners: Record<number, WasmListener> = {};

	protected currEvent: Event | null = null;
	protected currDataTransfer: DataTransfer | null = null;

	async init(parent: WasmBridge<DOMExports>) {
		this.parent = parent;
		this.elements.add(document.head);
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
					this.initElement(el, opts, nestedParent);
					const id = this.elements.add(el);
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

			_setBooleanAttrib: (
				elementID: number,
				name: number,
				val: number
			) => {
				const el = this.elements.get(elementID);
				const attr = this.parent.getString(name);
				val ? el.setAttribute(attr, "") : el.removeAttribute(attr);
			},

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

			_getBooleanAttrib: (elementID: number, name: number) =>
				this.elements
					.get(elementID)
					.getAttribute(this.parent.getString(name)) != null
					? 1
					: 0,

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
						e.target === window
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
					this.parent.exports.dom_callListener(
						listenerID,
						event.__base
					);
					if (slice) {
						this.parent.free(slice);
					}
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
				ctx.removeEventListener(listener.name, listener.fn);
				this.parent.logger.debug(
					`removing event listener #${listenerID}`
				);
				this.parent.free([listener.event.__base, this.$Event.size]);
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
					this.parent.exports.dom_fullscreenChanged();
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
					this.parent.exports.dom_fullscreenChanged();
				}
			},
		};
	}

	protected initElement(
		el: Element,
		opts: Pick<
			Readonly<CreateElementOpts>,
			"class" | "id" | "index" | "parent"
		> &
			Partial<{ html: ReadonlyWasmString; text: ReadonlyWasmString }>,
		nestedParent?: number
	) {
		const { id, class: $class, index } = opts;
		if (id.length) el.setAttribute("id", id.deref());
		if ($class.length) el.setAttribute("class", $class.deref());
		if (opts.html?.length) {
			el.innerHTML = opts.html.deref();
		} else if (opts.text?.length) {
			(<HTMLElement>el).innerText = opts.text.deref();
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
}
