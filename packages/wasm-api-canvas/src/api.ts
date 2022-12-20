import type {
	FillRule,
	FontKerning,
	GlobalCompositeOp,
	LineCap,
	LineJoin,
	PatternRepeat,
	TextAlign,
	TextBaseline,
	TextDirection,
} from "./generated/api.js";

export * from "./generated/api.js";

export interface WasmCanvas2DImports extends WebAssembly.ModuleImports {
	beginCtx(ctx: number): void;
	endCtx(): void;

	save(): void;
	restore(): void;
	translate(x: number, y: number): void;
	scale(x: number, y: number): void;
	rotate(theta: number): void;
	/**
	 * Applies 2x3 matrix (f32) stored at given address.
	 *
	 * @param addr
	 */
	transform(addr: number): void;

	setFont(addr: number): void;
	setFontKerning(mode: FontKerning): void;
	setTextAlign(mode: TextAlign): void;
	setTextBaseline(mode: TextBaseline): void;
	setTextDirection(dir: TextDirection): void;

	setFill(addr: number): void;
	setGradientFill(id: number): void;
	setPatternFill(id: number): void;
	setStroke(addr: number): void;
	setGradientStroke(id: number): void;
	setPatternStroke(id: number): void;
	setLineWidth(w: number): void;
	setLineCap(cap: LineCap): void;
	setLineJoin(join: LineJoin): void;
	setMiterLimit(limit: number): void;
	_setLineDash(addr: number, num: number): void;
	setLineDashOffset(offset: number): void;
	setShadow(addr: number, x: number, y: number, blur: number): void;
	setGlobalAlpha(alpha: number): void;
	setGlobalCompositeOp(op: GlobalCompositeOp): void;
	setFilter(addr: number): void;

	beginPath(): void;
	closePath(): void;
	fill(): void;
	fillWithRule(rule: FillRule): void;
	stroke(): void;
	clip(): void;

	clearRect(x: number, y: number, w: number, h: number): void;
	fillRect(x: number, y: number, w: number, h: number): void;
	strokeRect(x: number, y: number, w: number, h: number): void;

	arc(
		x: number,
		y: number,
		radius: number,
		startAngle: number,
		endAngle: number,
		ccw: number
	): void;
	arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;
	ellipse(
		x: number,
		y: number,
		rx: number,
		ry: number,
		rotation: number,
		startTheta: number,
		endTheta: number,
		ccw: number
	): void;
	moveTo(x: number, y: number): void;
	lineTo(x: number, y: number): void;
	cubicTo(
		cp1x: number,
		cp1y: number,
		cp2x: number,
		cp2y: number,
		x: number,
		y: number
	): void;
	quadraticTo(cpx: number, cpy: number, x: number, y: number): void;

	_points(addr: number, num: number, radius: number, fill: number): void;
	_polyline(addr: number, num: number, fill: number): void;

	fillText(addr: number, x: number, y: number, w: number): void;
	strokeText(addr: number, x: number, y: number, w: number): void;
	_measureText(strAddr: number, metrics: number): void;

	_createLinearGradient(
		x1: number,
		y1: number,
		x2: number,
		y2: number,
		stops: number,
		num: number
	): number;
	_createRadialGradient(
		x1: number,
		y1: number,
		r1: number,
		x2: number,
		y2: number,
		r2: number,
		stops: number,
		num: number
	): number;
	_createConicGradient(
		startTheta: number,
		x: number,
		y: number,
		stops: number,
		num: number
	): number;
	removeGradient(id: number): void;

	createPattern(
		addr: number,
		width: number,
		height: number,
		repeat: PatternRepeat
	): number;
	removePattern(id: number): void;

	/**
	 * Converts u8 grayscale pixel buffer to ABGR format and copies it to
	 * current canvas context.
	 *
	 * @remarks
	 * Assumes pixel buffer has same dimensions as canvas!
	 *
	 * Also see {@link WasmCanvas2DImports.putPixelRegionGray}.
	 *
	 * @param addr
	 */
	putPixelsGray(addr: number): void;

	/**
	 * Converts u8 grayscale pixel buffer to ABGR format and copies region to
	 * current canvas context.
	 *
	 * @param addr
	 * @param x
	 * @param y
	 * @param width
	 * @param height
	 */
	putPixelRegionGray(
		addr: number,
		x: number,
		y: number,
		width: number,
		height: number
	): void;

	/**
	 * Converts u8 indexed color pixel buffer to _ABGR_ format (using given
	 * palette of u32 ARGB colors) and copies it to current canvas context.
	 *
	 * @remarks
	 * Assumes pixel buffer has same dimensions as canvas!
	 *
	 * Also see {@link WasmCanvas2DImports.putPixelRegionIndexed}.
	 *
	 * @param addr
	 * @param paletteAddr
	 * @param paletteLen
	 */
	putPixelsIndexed(
		addr: number,
		paletteAddr: number,
		paletteLen: number
	): void;

	/**
	 * Converts u8 indexed color pixel buffer to _ABGR_ format (using given
	 * palette of u32 ARGB colors) and copies it to region in current canvas
	 * context.
	 *
	 * @param addr
	 * @param paletteAddr
	 * @param paletteLen
	 * @param x
	 * @param y
	 * @param width
	 * @param height
	 */
	putPixelRegionIndexed(
		addr: number,
		paletteAddr: number,
		paletteLen: number,
		x: number,
		y: number,
		width: number,
		height: number
	): void;

	/**
	 * Converts u32 ARGB pixel buffer to _ABGR_ and copies it to current canvas
	 * context.
	 *
	 * @remarks
	 * Assumes pixel buffer has same dimensions as canvas!
	 *
	 * Also see {@link WasmCanvas2DImports.putPixelRegionARGB}.
	 *
	 * @param addr
	 */
	putPixelsARGB(addr: number): void;

	/**
	 * Converts u32 ARGB pixel buffer to _ABGR_ and copies it to region in current
	 * canvas context.
	 *
	 * @param addr
	 * @param x
	 * @param y
	 * @param width
	 * @param height
	 */
	putPixelRegionARGB(
		addr: number,
		x: number,
		y: number,
		width: number,
		height: number
	): void;

	/**
	 * Copies u32 ABGR pixel buffer to current canvas context.
	 *
	 * @remarks
	 * Assumes pixel buffer has same dimensions as canvas!
	 *
	 * Also see {@link WasmCanvas2DImports.putPixelRegionABGR}.
	 *
	 * @param addr
	 */
	putPixelsABGR(addr: number): void;

	/**
	 * Copies u32 ABGR pixel buffer to region in current canvas context.
	 *
	 * @param addr
	 * @param x
	 * @param y
	 * @param width
	 * @param height
	 */
	putPixelRegionABGR(
		addr: number,
		x: number,
		y: number,
		width: number,
		height: number
	): void;

	getPixels(
		addr: number,
		x: number,
		y: number,
		width: number,
		height: number
	): void;
}
