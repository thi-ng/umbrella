import type { FnU, IClear } from "@thi.ng/api";
import { ensureArray } from "@thi.ng/arrays/ensure-array";
import { equiv } from "@thi.ng/equiv";
import type { Attribs, GroupAttribs, IHiccupShape2 } from "@thi.ng/geom-api";
import { __copyAttribs } from "../internal/copy.js";

/**
 * Geometry/shape group container for other {@link IHiccupShape2}s, incl. nested
 * groups.
 */
export class Group implements IClear, IHiccupShape2<Group> {
	readonly type = "group";
	readonly dim = 2;

	children: IHiccupShape2[];

	constructor(
		public attribs?: GroupAttribs,
		children?: Iterable<IHiccupShape2>
	) {
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
	add(...shapes: IHiccupShape2[]) {
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
		return this.copyTransformed((c) => <IHiccupShape2>c.copy());
	}

	copyTransformed(fn: FnU<IHiccupShape2>) {
		return new Group(__copyAttribs(this.attribs), this.children.map(fn));
	}

	withAttribs(attribs: Attribs) {
		return new Group(attribs, this.children);
	}

	equiv(o: any) {
		return (
			o instanceof Group &&
			equiv(this.attribs, o.attribs) &&
			equiv(this.children, o.children)
		);
	}

	toHiccup() {
		return ["g", this.attribs, ...this.children.map((x) => x.toHiccup())];
	}
}
