export function inlineWorker(src: string) {
    return makeWorker(new Blob([src], { type: "text/javascript" }));
}

export function makeWorker(worker: Worker | string | Blob) {
    return worker instanceof Worker ?
        worker :
        new Worker(
            worker instanceof Blob ?
                URL.createObjectURL(worker) :
                worker
        );
}
