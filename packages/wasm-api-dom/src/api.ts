// SPDX-License-Identifier: Apache-2.0
import { XML_SVG, XML_XLINK, XML_XMLNS } from "@thi.ng/prefixes/xml";
import type { WasmExports } from "@thi.ng/wasm-api";

export * from "./generated/types.js";

export interface WasmDomExports extends WasmExports {
	_dom_init(): void;
	_dom_callListener(listenerID: number, event: number): void;
	_dom_callRAF(rafID: number, t: number): void;
	_dom_fullscreenChanged(): void;
	_dom_addListener(listenerAddr: number): number;
	_dom_removeListener(listenerID: number): void;
}

export interface WasmDomImports extends WebAssembly.ModuleImports {
	/**
	 * Queries the browser's current `window` object and writes results to given
	 * {@link WindowInfo} pointer.
	 *
	 * @param infoAddr
	 */
	getWindowInfo(infoAddr: number): void;

	/**
	 * Similar to global `document.getElementById()`, but returning ID handle of
	 * found indexed element, or -1 if none could be found. If the DOM element
	 * exists, but isn't yet managed/indexed, it will be added to the index and
	 * its ID returned.
	 *
	 * @param nameAddr
	 */
	getElementByID(nameAddr: number): number;

	/**
	 * Takes a {@link CreateElementOpts} pointer and creates a new DOM element
	 * according to the given opts. The created element is indexed and a unique
	 * ID handle returned.
	 *
	 * @remarks
	 * The DOM element created will NOT be garbage collected unless explicitly
	 * (or implicitly via ancestors) removed via
	 * {@link WasmDomImports.removeElement}.
	 *
	 * @param optsAddr
	 */
	createElement(optsAddr: number): number;

	/**
	 * Removes DOM element for given ID and all of its known children.
	 *
	 * @remarks
	 * IMPORTANT: Currently there's no way to automatically garbage collect
	 * WASM-side event listeners (i.e. those registered via
	 * {@link WasmDomImports._addListener}) attached to the element or anywhere in
	 * its sub-tree. These must be manually removed via
	 * {@link WasmDomImports._removeListener} prior to calling this function.
	 *
	 * @param elementID
	 */
	removeElement(elementID: number): void;

	/**
	 * Takes a {@link CreateCanvasOpts} pointer and creates a new canvas element
	 * according to the given opts. Returns unique ID handle for new element,
	 * see {@link WasmDomImports.createElement} for details.
	 *
	 * @param optsAddr
	 */
	createCanvas(optsAddr: number): number;

	/**
	 * Resizes the canvas element for given `elementID` to provided size (in CSS
	 * pixels). The given device pixel ratio `dpr` will be used to adjust the
	 * actual number of physical pixels. See
	 * [thi.ng/canvas](https://thi.ng/canvas) for reference.
	 *
	 * @param elementID
	 * @param width
	 * @param height
	 * @param dpr
	 */
	setCanvasSize(
		elementID: number,
		width: number,
		height: number,
		dpr: number
	): void;

	/**
	 * Sets `.innerHTML` property of a DOM element to provided `body` string.
	 *
	 * @param elementID
	 * @param body
	 */
	setInnerHtml(elementID: number, body: number): void;

	/**
	 * Sets `.innerText` property of a DOM element to provided `body` string.
	 *
	 * @param elementID
	 * @param body
	 */
	setInnerText(elementID: number, body: number): void;

	/**
	 * Sets attribute for given element to new string value. Both `nameAddr` and
	 * `valAddr` are pointers to zero-terminated u8 arrays (or standard Zig
	 * string literals).
	 *
	 * @param elementID
	 * @param nameAddr
	 * @param valAddr
	 */
	setStringAttrib(elementID: number, nameAddr: number, valAddr: number): void;

	/**
	 * Reads a string attribute value from DOM element, encodes it as UTF-8 and
	 * writes zero-terminated bytes to char pointer `valAddr`. Only `maxBytes`
	 * are written (incl. any sentinel). Returns actual number of bytes written
	 * (excluding the sentinel).
	 *
	 * @param elementID
	 * @param nameAddr
	 * @param valAddr
	 * @param maxBytes
	 */
	_getStringAttrib(
		elementID: number,
		nameAddr: number,
		valAddr: number,
		maxBytes: number
	): number;

	/**
	 * Similar to {@link WasmDomImports._getStringAttrib}, reads a string attribute
	 * value from DOM element and allocates memory for it. Writes
	 * `[pointer,length]` tuple to `sliceAddr` (using the global allocator
	 * configured for the WASM bridge). Caller owns the memory.
	 *
	 * @param elementID
	 * @param nameAddr
	 * @param sliceAddr
	 */
	_getStringAttribAlloc(
		elementID: number,
		nameAddr: number,
		sliceAddr: number
	): void;

	/**
	 * Sets attribute for given element to new f64 value. `nameAddr` is a
	 * pointer to a zero-terminated u8 array (or standard Zig `[]u8` slice).
	 *
	 * @param elementID
	 * @param nameAddr
	 * @param val
	 */
	setNumericAttrib(elementID: number, nameAddr: number, val: number): void;

	/**
	 * Reads a numeric attribute value from DOM element and returns it as f64.
	 *
	 * @param elementID
	 * @param nameAddr
	 */
	getNumericAttrib(elementID: number, nameAddr: number): number;

	/**
	 * Sets (or removes) boolean attribute for given element. `nameAddr` is a
	 * pointer to a zero-terminated u8 array (or standard Zig `[]u8` slice). If
	 * `state` is non-zero, the attrib will be created/ensured, if zero it will
	 * be removed.
	 *
	 * @param elementID
	 * @param nameAddr
	 * @param state
	 */
	_setBooleanAttrib(elementID: number, nameAddr: number, state: number): void;

	/**
	 * Check if the DOM element has given attribute and returns 1 if so, else 0.
	 *
	 * @param elementID
	 * @param nameAddr
	 */
	_getBooleanAttrib(elementID: number, nameAddr: number): number;

	addClass(elementID: number, nameAddr: number): void;

	removeClass(elementID: number, nameAddr: number): void;

	/**
	 * Attaches a new DOM event listener for given event name to element (or
	 * window) given by `ctxID`. The `listenerID` is managed by the Zig
	 * counterpart of this API.
	 *
	 * @remarks
	 * The following context IDs are special:
	 *
	 * - -1: `window`
	 * - 0: `document.body`
	 *
	 * @param ctxID
	 * @param nameAddr
	 * @param listenerID
	 */
	_addListener(ctxID: number, nameAddr: number, listenerID: number): void;
	/**
	 * Removes DOM event listener for given listener ID.
	 *
	 * @param listenerID
	 */
	_removeListener(listenerID: number): void;

	_requestAnimationFrame(rafID: number): void;

	_requestFullscreen(elementID: number): Promise<void>;
}

/**
 * Registry of wellknown namespace URIs and their aliases.
 */
export const NS_PREFIXES: Record<string, string> = {
	svg: XML_SVG,
	xlink: XML_XLINK,
	xmlns: XML_XMLNS,
};
