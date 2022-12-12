import type { Fn0 } from "@thi.ng/api";
import { isFunction } from "@thi.ng/checks/is-function";
import type { WorkerSource } from "./api.js";

export const defInlineWorker = (src: string) =>
	defWorker(new Blob([src], { type: "text/javascript" }));

export const defWorker = (worker: WorkerSource) =>
	worker instanceof Worker
		? worker
		: isFunction<Fn0<Worker>>(worker)
		? worker()
		: new Worker(
				worker instanceof Blob ? URL.createObjectURL(worker) : worker
		  );
