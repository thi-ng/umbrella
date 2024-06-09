import type { FnU, IClear } from "@thi.ng/api";
import { ensureArray } from "@thi.ng/arrays/ensure-array";
import { equiv } from "@thi.ng/equiv";
import type { Attribs, IHiccupShape3 } from "../api.js";
import { __copyAttribs } from "../internal/copy.js";

/**
 * Geometry/shape group container for other {@link IHiccupShape3}s, incl. nested
 * groups.
 */
export class Group3 implements IClear, IHiccupShape3<Group3> {
	readonly type = "group3";
	readonly dim = 3;

	children: IHiccupShape3[];

	constructor(public attribs?: Attribs, children?: Iterable<IHiccupShape3>) {
		this.children = children ? ensureArray(children) : [];
	}

	*[Symbol.iterator]() {
		yield* this.children;
	}

	/**
	 * Appends given `shapes` to this {@link Group.children} array.
	 *
	 * @param shapes
	 */
	add(...shapes: IHiccupShape3[]) {
		this.children.push(...shapes);
		return this;
	}

	/**
	 * Removes all children from the group.
	 */
	clear() {
		this.children.length = 0;
	}

	copy(): Group3 {
		return this.copyTransformed((c) => <IHiccupShape3>c.copy());
	}

	copyTransformed(fn: FnU<IHiccupShape3>) {
		return new Group3(__copyAttribs(this.attribs), this.children.map(fn));
	}

	withAttribs(attribs: Attribs) {
		return new Group3(attribs, this.children);
	}

	equiv(o: any) {
		return (
			o instanceof Group3 &&
			equiv(this.attribs, o.attribs) &&
			equiv(this.children, o.children)
		);
	}

	toHiccup() {
		return ["g", this.attribs, ...this.children.map((x) => x.toHiccup())];
	}
}
