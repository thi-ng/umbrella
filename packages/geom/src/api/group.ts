import type { Fn, IClear } from "@thi.ng/api";
import { ensureArray } from "@thi.ng/arrays/ensure-array";
import { equiv } from "@thi.ng/equiv";
import type { Attribs, IHiccupShape } from "@thi.ng/geom-api";
import { __copyAttribs } from "../internal/copy.js";

/**
 * Geometry/shape group container for other {@link IHiccupShape}s, incl. nested
 * groups.
 */
export class Group implements IClear, IHiccupShape {
	children: IHiccupShape[];

	constructor(public attribs?: Attribs, children?: Iterable<IHiccupShape>) {
		this.children = children ? ensureArray(children) : [];
	}

	get type() {
		return "group";
	}

	*[Symbol.iterator]() {
		yield* this.children;
	}

	/**
	 * Appends given `shapes` to this {@link Group.children} array.
	 *
	 * @param shapes
	 */
	add(...shapes: IHiccupShape[]) {
		this.children.push(...shapes);
		return this;
	}

	/**
	 * Removes all children from the group.
	 */
	clear() {
		this.children.length = 0;
	}

	copy(): Group {
		return this.copyTransformed((c) => <IHiccupShape>c.copy());
	}

	copyTransformed(fn: Fn<IHiccupShape, IHiccupShape>) {
		return new Group(__copyAttribs(this), this.children.map(fn));
	}

	withAttribs(attribs: Attribs): Group {
		return new Group(attribs, this.children);
	}

	equiv(o: any) {
		return o instanceof Group && equiv(this.children, o.children);
	}

	toHiccup() {
		return ["g", this.attribs, ...this.children.map((x) => x.toHiccup())];
	}
}
