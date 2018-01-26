import { DEBUG } from "../api";
import { Stream } from "../stream";
import { makeWorker } from "../utils/worker";

export function fromWorker<T>(worker: Worker | Blob | string, terminate = true) {
    const _worker = makeWorker(worker);
    return new Stream<T>((stream) => {
        const ml = (e: MessageEvent) => { stream.next(e.data); };
        const el = (e: MessageEvent) => { stream.error(e.data); };
        _worker.addEventListener("message", ml);
        _worker.addEventListener("error", el);
        return () => {
            _worker.removeEventListener("message", ml);
            _worker.removeEventListener("error", el);
            if (terminate) {
                DEBUG && console.log("terminating worker", _worker);
                _worker.terminate();
            }
        };
    });
}
