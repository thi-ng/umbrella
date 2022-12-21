import { swapLane13 } from "@thi.ng/binary";
import type { IWasmAPI, WasmExports } from "@thi.ng/wasm-api";
import type { WasmDom } from "@thi.ng/wasm-api-dom/dom";
import type { WasmBridge } from "@thi.ng/wasm-api/bridge";
import { ObjectIndex } from "@thi.ng/wasm-api/object-index";
import {
	$GradientColorStop,
	$TextMetrics,
	FillRule,
	FontKerning,
	GlobalCompositeOp,
	LineCap,
	LineJoin,
	PatternRepeat,
	TextAlign,
	TextBaseline,
	TextDirection,
	WasmCanvas2DImports,
} from "./api.js";

const TAU = Math.PI * 2;

export interface WasmCanvas2DExports extends WasmExports {}

export class WasmCanvas2D implements IWasmAPI<WasmCanvas2DExports> {
	static readonly id = "canvas2d";

	readonly id = WasmCanvas2D.id;
	readonly dependencies = ["dom"];

	parent!: WasmBridge<WasmCanvas2DExports>;
	dom!: WasmDom;

	gradients!: ObjectIndex<CanvasGradient>;
	patterns!: ObjectIndex<CanvasPattern>;

	ctx?: CanvasRenderingContext2D;
	img?: ImageData;
	u32?: Uint32Array;

	async init(parent: WasmBridge<WasmCanvas2DExports>) {
		this.parent = parent;
		this.dom = <WasmDom>this.parent.modules.dom;
		this.gradients = new ObjectIndex({
			name: "gradients",
			logger: parent.logger,
		});
		this.patterns = new ObjectIndex({
			name: "patterns",
			logger: parent.logger,
		});
		return true;
	}

	getImports(): WasmCanvas2DImports {
		return {
			beginCtx: (id) => {
				this.ctx = (<HTMLCanvasElement>(
					this.dom.elements.get(id)
				)).getContext("2d")!;
			},

			endCtx: () => {
				this.ctx = this.img = this.u32 = undefined;
			},

			save: () => this.ctx!.save(),
			restore: () => this.ctx!.restore(),
			translate: (x, y) => this.ctx!.translate(x, y),
			scale: (x, y) => this.ctx!.scale(x, y),
			rotate: (theta) => this.ctx!.rotate(theta),
			transform: (addr: number) => {
				// @ts-ignore spread
				this.ctx!.transform(...this.parent.getF32Array(addr, 6));
			},

			setFont: (addr) => (this.ctx!.font = this.parent.getString(addr)),
			setFontKerning: (mode) =>
				(this.ctx!.fontKerning = <any>FontKerning[mode].toLowerCase()),
			setTextAlign: (mode) =>
				(this.ctx!.textAlign = <any>TextAlign[mode].toLowerCase()),
			setTextBaseline: (mode) =>
				(this.ctx!.textBaseline = <any>(
					TextBaseline[mode].toLowerCase()
				)),
			setTextDirection: (mode) =>
				(this.ctx!.direction = <any>TextDirection[mode].toLowerCase()),

			setFill: (addr) =>
				(this.ctx!.fillStyle = this.parent.getString(addr)),
			setGradientFill: (id) =>
				(this.ctx!.fillStyle = this.gradients.get(id)),
			setPatternFill: (id) =>
				(this.ctx!.fillStyle = this.patterns.get(id)),
			setStroke: (addr) =>
				(this.ctx!.strokeStyle = this.parent.getString(addr)),
			setGradientStroke: (id) =>
				(this.ctx!.strokeStyle = this.gradients.get(id)),
			setPatternStroke: (id) =>
				(this.ctx!.strokeStyle = this.patterns.get(id)),
			setLineWidth: (w) => (this.ctx!.lineWidth = w),
			setLineCap: (id) =>
				(this.ctx!.lineCap = <any>LineCap[id].toLowerCase()),
			setLineJoin: (id) =>
				(this.ctx!.lineJoin = <any>LineJoin[id].toLowerCase()),
			setMiterLimit: (limit) => (this.ctx!.miterLimit = limit),

			_setLineDash: (addr, num) =>
				this.ctx!.setLineDash(this.parent.getF32Array(addr, num)),
			setLineDashOffset: (offset) => (this.ctx!.lineDashOffset = offset),

			setShadow: (addr, x, y, blur) => {
				const ctx = this.ctx!;
				ctx.shadowColor = this.parent.getString(addr);
				ctx.shadowOffsetX = x;
				ctx.shadowOffsetY = y;
				ctx.shadowBlur = blur;
			},

			setGlobalAlpha: (alpha) => (this.ctx!.globalAlpha = alpha),
			setGlobalCompositeOp: (op) =>
				(this.ctx!.globalCompositeOperation = <any>(
					GlobalCompositeOp[op].replace("_", "-")
				)),

			setFilter: (addr) =>
				(this.ctx!.filter = this.parent.getString(addr)),

			_createLinearGradient: (x1, y1, x2, y2, addr, num) =>
				this.initGradient(
					this.ctx!.createLinearGradient(x1, y1, x2, y2),
					addr,
					num
				),
			_createRadialGradient: (x1, y1, r1, x2, y2, r2, addr, num) =>
				this.initGradient(
					this.ctx!.createRadialGradient(x1, y1, r1, x2, y2, r2),
					addr,
					num
				),
			_createConicGradient: (theta, x, y, addr, num) =>
				this.initGradient(
					this.ctx!.createConicGradient(theta, x, y),
					addr,
					num
				),
			removeGradient: (id) => this.gradients.delete(id),

			createPattern: (addr, width, height, repeat) => {
				const canvas = document.createElement("canvas");
				canvas.width = width;
				canvas.height = height;
				const ctx = canvas.getContext("2d")!;
				const { img, dest } = this.ensureRegion(
					0,
					0,
					width,
					height,
					ctx
				);
				dest.set(this.parent.getU32Array(addr, dest.length));
				ctx.putImageData(img, 0, 0);
				return this.patterns.add(
					this.ctx!.createPattern(
						canvas,
						<any>PatternRepeat[repeat].replace("_", "-")
					)!
				);
			},
			removePattern: (id) => this.patterns.delete(id),

			beginPath: () => this.ctx!.beginPath(),
			closePath: () => this.ctx!.closePath(),
			stroke: () => this.ctx!.stroke(),
			fill: () => this.ctx!.fill(),
			fillWithRule: (rule) =>
				this.ctx!.fill(<any>FillRule[rule].toLowerCase()),
			clip: () => this.ctx!.clip(),

			clearRect: (x, y, w, h) => this.ctx!.clearRect(x, y, w, h),
			fillRect: (x, y, w, h) => this.ctx!.fillRect(x, y, w, h),
			strokeRect: (x, y, w, h) => this.ctx!.strokeRect(x, y, w, h),

			arc: (x, y, radius, startAngle, endAngle, ccw) =>
				this.ctx!.arc(x, y, radius, startAngle, endAngle, !!ccw),
			arcTo: (x1, y1, x2, y2, radius) =>
				this.ctx!.arcTo(x1, y1, x2, y2, radius),
			ellipse: (x, y, rx, ry, rotation, start, end, ccw) =>
				this.ctx!.ellipse(x, y, rx, ry, rotation, start, end, !!ccw),
			moveTo: (x, y) => this.ctx!.moveTo(x, y),
			lineTo: (x, y) => this.ctx!.lineTo(x, y),
			cubicTo: (cp1x, cp1y, cp2x, cp2y, x, y) =>
				this.ctx!.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y),
			quadraticTo: (cpx, cpy, x, y) =>
				this.ctx!.quadraticCurveTo(cpx, cpy, x, y),

			_points: (addr, num, radius, fill) => {
				num *= 2;
				const pts = this.parent.getF32Array(addr, num);
				const ctx = this.ctx!;
				const cmd = ctx[fill ? "fill" : "stroke"].bind(ctx);
				for (let i = 2; i < num; i += 2) {
					ctx.beginPath();
					ctx.arc(pts[i], pts[i + 1], radius, 0, TAU);
					cmd();
				}
			},

			_polyline: (addr, num, fill) => {
				num *= 2;
				const pts = this.parent.getF32Array(addr, num);
				const ctx = this.ctx!;
				ctx.beginPath();
				ctx.moveTo(pts[0], pts[1]);
				for (let i = 2; i < num; i += 2) {
					ctx.lineTo(pts[i], pts[i + 1]);
				}
				if (fill) {
					ctx.closePath();
					ctx.fill();
				} else ctx.stroke();
			},

			fillText: (addr, x, y, w) =>
				this.ctx!.fillText(
					this.parent.getString(addr),
					x,
					y,
					w > 0 ? w : undefined
				),
			strokeText: (addr, x, y, w) =>
				this.ctx!.strokeText(
					this.parent.getString(addr),
					x,
					y,
					w > 0 ? w : undefined
				),
			_measureText: (addr, metrics) =>
				$TextMetrics(this.parent)
					.instance(metrics)
					.fromMetrics(
						this.ctx!.measureText(this.parent.getString(addr))
					),

			putPixelsGray: (addr) => {
				const { ctx, img, u32 } = this.ensureImageData();
				const src = this.parent.getU8Array(addr, u32!.length);
				for (let i = 0, n = src.length; i < n; i++) {
					u32![i] = 0xff000000 | (src[i] * 0x010101);
				}
				ctx!.putImageData(img!, 0, 0);
			},

			putPixelRegionGray: (addr, x, y, width, height) => {
				const { img, dest } = this.ensureRegion(x, y, width, height);
				const src = this.parent.getU8Array(addr, dest.length);
				for (let i = 0, n = src.length; i < n; i++)
					dest[i] = 0xff000000 | (x * 0x010101);
				this.ctx!.putImageData(img, x, y);
			},

			putPixelsIndexed: (addr, paletteAddr, paletteLen) => {
				const { ctx, img, u32 } = this.ensureImageData();
				const src = this.parent.getU8Array(addr, u32!.length);
				const lut = this.parent.getU32Array(paletteAddr, paletteLen);
				for (let i = 0, n = src.length; i < n; i++)
					u32![i] = swapLane13(lut[src[i]]);
				ctx!.putImageData(img!, 0, 0);
			},

			putPixelRegionIndexed: (
				addr,
				paletteAddr,
				paletteLen,
				x,
				y,
				width,
				height
			) => {
				const { img, dest } = this.ensureRegion(x, y, width, height);
				const src = this.parent.getU8Array(addr, dest.length);
				const lut = this.parent.getU32Array(paletteAddr, paletteLen);
				for (let i = 0, n = src.length; i < n; i++)
					dest[i] = swapLane13(lut[src[i]]);
				this.ctx!.putImageData(img, x, y);
			},

			putPixelsARGB: (addr) => {
				const { ctx, img, u32 } = this.ensureImageData();
				const src = this.parent.getU32Array(addr, u32!.length);
				for (let i = 0, n = src.length; i < n; i++)
					u32![i] = swapLane13(src[i]);
				ctx!.putImageData(img!, 0, 0);
			},

			putPixelRegionARGB: (addr, x, y, width, height) => {
				const { img, dest } = this.ensureRegion(x, y, width, height);
				const src = this.parent.getU32Array(addr, dest.length);
				for (let i = 0, n = src.length; i < n; i++)
					dest[i] = swapLane13(src[i]);
				this.ctx!.putImageData(img, x, y);
			},

			putPixelsABGR: (addr) => {
				const { ctx, img, u32 } = this.ensureImageData();
				u32!.set(this.parent.getU32Array(addr, u32!.length));
				ctx!.putImageData(img!, 0, 0);
			},

			putPixelRegionABGR: (addr, x, y, width, height) => {
				const { img, dest } = this.ensureRegion(x, y, width, height);
				dest.set(this.parent.getU32Array(addr, dest.length));
				this.ctx!.putImageData(img, x, y);
			},

			getPixels: (addr, x, y, width, height) => {
				const { dest } = this.ensureRegion(x, y, width, height);
				this.parent.getU32Array(addr, width * height).set(dest);
			},
		};
	}

	protected initGradient(grad: CanvasGradient, addr: number, num: number) {
		const $Stop = $GradientColorStop(this.parent);
		for (; num-- > 0; addr += $Stop.size) {
			const stop = $Stop.instance(addr);
			grad.addColorStop(stop.pos, stop.color.deref());
		}
		return this.gradients.add(grad);
	}

	protected ensureImageData() {
		if (!this.img) {
			const ctx = this.ctx!;
			this.img = ctx.getImageData(
				0,
				0,
				ctx.canvas.width,
				ctx.canvas.height
			);
			this.u32 = new Uint32Array(this.img.data.buffer);
		}
		return this;
	}

	protected ensureRegion(
		x: number,
		y: number,
		width: number,
		height: number,
		ctx: CanvasRenderingContext2D = this.ctx!
	) {
		const img = ctx.getImageData(x, y, width, height);
		return { img, dest: new Uint32Array(img.data.buffer) };
	}
}
