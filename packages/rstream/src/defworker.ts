export const defInlineWorker = (src: string) =>
    defWorker(new Blob([src], { type: "text/javascript" }));

export const defWorker = (worker: Worker | string | Blob) =>
    worker instanceof Worker
        ? worker
        : new Worker(
              worker instanceof Blob ? URL.createObjectURL(worker) : worker
          );
