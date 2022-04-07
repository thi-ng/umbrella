import { polyline } from "@thi.ng/hiccup-canvas/polyline";
import { fitClamped } from "@thi.ng/math/fit";
import { canvasPixels } from "@thi.ng/pixel/canvas";
import { forkJoin } from "@thi.ng/rstream/forkjoin";
import { reactive } from "@thi.ng/rstream/stream";
import { bounds } from "@thi.ng/transducers-stats/bounds";
import { NUM_WORKERS, type WorkerJob, type WorkerResult } from "./api";
import WORKER from "./worker?worker";

const W = 256;
const H = 256;

const rowsPerSlice = H / NUM_WORKERS;
const pixelsPerSlice = (W * H) / NUM_WORKERS;

const canvas = canvasPixels(W, H);
document.body.appendChild(canvas.canvas);

const imgU32 = new Uint32Array(canvas.img.data.buffer);

const time = reactive(0);

// fork worker jobs & re-join results
forkJoin<number, WorkerJob, WorkerResult, void>({
    src: time,
    // WorkerJob preparation
    // this function is called for each worker ID to define a region of
    // the image to compute. the results of that function are the messages
    // sent to the workers...
    fork: (id, _, time) => ({
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
    worker: () => new WORKER(),
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
