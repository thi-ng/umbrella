import { adaptDPI } from "@thi.ng/adapt-dpi";
import { isString } from "@thi.ng/checks/is-string";
import type { WeblGLCanvasOpts } from "./api/canvas.js";
import type { WebGLExtensionMap } from "./api/ext.js";
import { error } from "./error.js";

const defaultOpts: WebGLContextAttributes = {
	alpha: true,
	antialias: true,
	depth: true,
	premultipliedAlpha: true,
	preserveDrawingBuffer: false,
	stencil: false,
};

export const glCanvas = (opts: Partial<WeblGLCanvasOpts> = {}) => {
	const canvas = opts.canvas
		? isString(opts.canvas)
			? <HTMLCanvasElement>document.getElementById(opts.canvas)
			: opts.canvas
		: document.createElement("canvas");
	opts.width && (canvas.width = opts.width);
	opts.height && (canvas.height = opts.height);
	opts.autoScale !== false && adaptDPI(canvas, canvas.width, canvas.height);
	opts.parent && opts.parent.appendChild(canvas);
	const gl = <WebGLRenderingContext>canvas.getContext(
		opts.version === 2 ? "webgl2" : "webgl",
		{
			...defaultOpts,
			...opts.opts,
		}
	);
	if (!gl) {
		error("WebGL unavailable");
	}
	opts.onContextLost &&
		canvas.addEventListener("webglcontextlost", opts.onContextLost);
	return {
		canvas,
		gl,
		ext: getExtensions(gl, opts.ext!),
	};
};

export const getExtensions = <K extends keyof WebGLExtensionMap>(
	gl: WebGLRenderingContext,
	ids: K[],
	required = true
): Pick<WebGLExtensionMap, K> => {
	const ext: any = {};
	if (ids) {
		for (let id of ids) {
			ext[id] = gl.getExtension(id);
			required && !ext[id] && error(`extension ${id} not available`);
		}
	}
	return ext;
};
