import type { IHiccupShape2 } from "@thi.ng/geom-api";

/**
 * Dummy shape container for arbitrary hiccup elements. See {@link extra} for
 * more details.
 */
export class Extra implements IHiccupShape2<Extra> {
	readonly type = "extra";
	readonly dim = 2;

	constructor(public body: any[]) {}

	copy(): Extra {
		return new Extra(this.body);
	}

	withAttribs() {
		return this.copy();
	}

	toHiccup() {
		return this.body;
	}
}
