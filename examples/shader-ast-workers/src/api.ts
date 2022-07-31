export interface WorkerJob {
	id: number;
	width: number;
	height: number;
	time: number;
	y1: number;
	y2: number;
}

export interface WorkerResult {
	buf: Uint32Array;
	stats: number[];
}

export const NUM_WORKERS = navigator.hardwareConcurrency || 4;
