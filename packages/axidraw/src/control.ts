import type { IDeref, IReset } from "@thi.ng/api";
import { AxiDrawState } from "./api.js";

export class AxiDrawControl implements IDeref<AxiDrawState>, IReset {
	state: AxiDrawState = AxiDrawState.CONTINUE;

	constructor(public interval = 1000) {}

	deref() {
		return this.state;
	}

	reset() {
		this.state = AxiDrawState.CONTINUE;
		return this;
	}

	pause() {
		if (this.state === AxiDrawState.CONTINUE) {
			this.state = AxiDrawState.PAUSE;
		}
	}

	resume() {
		if (this.state === AxiDrawState.PAUSE) {
			this.state = AxiDrawState.CONTINUE;
		}
	}

	cancel() {
		this.state = AxiDrawState.CANCEL;
	}
}
