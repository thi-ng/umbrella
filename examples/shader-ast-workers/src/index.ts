import { polyline } from "@thi.ng/hdom-canvas";
import { fitClamped } from "@thi.ng/math";
import { canvasPixels } from "@thi.ng/pixel";
import { forkJoin, stream } from "@thi.ng/rstream";
import { bounds } from "@thi.ng/transducers-stats";
import { NUM_WORKERS, WorkerJob, WorkerResult } from "./api";

const W = 256;
const H = 256;

const rowsPerSlice = H / NUM_WORKERS;
const pixelsPerSlice = (W * H) / NUM_WORKERS;

const canvas = canvasPixels(W, H);
document.body.appendChild(canvas.canvas);

const imgU32 = new Uint32Array(canvas.img.data.buffer);

const time = stream<number>();

// fork worker jobs & re-join results
forkJoin<number, WorkerJob, WorkerResult, void>({
    src: time,
    // WorkerJob preparation
    // this function is called for each worker ID to define a region of
    // the image to compute. the results of that function are the messages
    // sent to the workers...
    fork: (id, numWorkers, time) => ({
        width: W,
        height: H,
        y1: id * rowsPerSlice,
        y2: (id + 1) * rowsPerSlice,
        id,
        time,
    }),
    // re-join partial results (here, update canvas)
    join: (parts) => {
        updatePixels(parts);
        drawStats(parts);
        // trigger next update
        time.next(time.deref()! + 0.05);
    },
    worker: "./worker.js",
    numWorkers: NUM_WORKERS,
});

const updatePixels = (parts: WorkerResult[]) => {
    for (let i = 0; i < NUM_WORKERS; i++) {
        imgU32.set(parts[i].buf, i * pixelsPerSlice);
    }
    canvas.ctx.putImageData(canvas.img, 0, 0);
};

const drawStats = (parts: WorkerResult[]) => {
    canvas.ctx.strokeStyle = "white";
    for (let i = 0; i < NUM_WORKERS; i++) {
        const x = i * 32 + 4;
        const stats = parts[i].stats;
        if (stats && x < W) {
            const [min, max] = bounds(stats);
            polyline(
                canvas.ctx,
                {},
                stats.map((y, j) => [x + j, fitClamped(y, min, max, 28, 4)])
            );
        }
    }
};

// initial kick off
time.next(0);

// HMR handling
if (process.env.NODE_ENV !== "production") {
    const hot = (<any>module).hot;
    hot && hot.dispose(() => time.done());
}
