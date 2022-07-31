import type { WebGLExtensionMap } from "./ext.js";

export interface WeblGLCanvasOpts {
	canvas: string | HTMLCanvasElement;
	parent: HTMLElement;
	opts: Partial<WebGLContextAttributes>;
	version: 1 | 2;
	width: number;
	height: number;
	autoScale: boolean;
	onContextLost: EventListener;
	ext: (keyof WebGLExtensionMap)[];
}
