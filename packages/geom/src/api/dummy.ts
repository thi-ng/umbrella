import type { IHiccupShape2 } from "@thi.ng/geom-api";

/**
 * Dummy shape container for arbitrary hiccup elements.
 */
export class Dummy implements IHiccupShape2<Dummy> {
	readonly type = "dummy";
	readonly dim = 2;

	constructor(public body: any[]) {}

	copy(): Dummy {
		return new Dummy(this.body);
	}

	withAttribs() {
		return this.copy();
	}

	toHiccup() {
		return this.body;
	}
}
