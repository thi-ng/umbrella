import type { Fn, Predicate2 } from "@thi.ng/api";
import type { ISubscribable } from "@thi.ng/rstream";
import type { IComponent, IMountWithState, NumOrElement } from "./api.js";
import { $compile } from "./compile.js";
import { Component } from "./component.js";
import { __nextID } from "./idgen.js";
import { $subWithID } from "./sub.js";

/**
 * Creates a generalized and dynamically updating list component from items of
 * the given `src` stream.
 *
 * @remarks
 * Only very basic key-less diffing of list items is performed (using the
 * `equiv` equality predicate arg, i.e. `equiv(prev[i], curr[i])`).
 *
 * Use this list component only for cases when the child item components do not
 * involve complex lifecycles (e.g. preloaders, intro animations etc.). Any list
 * items changing position will be first unmounted, then remounted. To avoid
 * this full lifecycle transition, consider using {@link $klist}, which employs
 * a more elaborate diffing mechanism and keying to uniquely identify list items
 * (regardless of their position in the array).
 *
 * @example
 * ```ts
 * const items = reactive([{id: "a"}, {id: "b"}, {id: "c"}]);
 *
 * $list(
 *   // data source (rstream subsribable)
 *   items,
 *   // outer list element & attribs
 *   "ul",
 *   { class: "list red" },
 *   // list item component constructor
 *   (x) => ["li", {}, x.id],
 *   // optional equality predicate (default this.ng/equiv)
 *   (a, b) => a.id === b.id
 * ).mount(document.body);
 *
 * // update list
 * items.next([{id: "b"}, {id: "d"}, {id: "c"}]);
 *
 * // removes component for item A
 * // recreates B in new position
 * // creates D
 * // keeps C
 * ```
 *
 *
 * @param src -
 * @param tag -
 * @param attribs -
 * @param ctor -
 * @param equiv -
 */
export const $list = <T>(
	src: ISubscribable<T[]>,
	tag: string,
	attribs: any,
	ctor: Fn<T, any>,
	equiv?: Predicate2<T>
) =>
	$subWithID(
		src,
		new List<T>(tag, attribs, ctor, equiv),
		__nextID("list", src)
	);

export class List<T> extends Component implements IMountWithState<T[]> {
	prev?: T[];
	items?: IComponent[];

	constructor(
		protected tag: string,
		protected attribs: any,
		protected ctor: Fn<T, IComponent>,
		protected equiv: Predicate2<T> = (a, b) => a === b
	) {
		super();
	}

	async mount(parent: Element, index: NumOrElement, state: T[]) {
		this.prev = [];
		this.items = [];
		this.el = this.$el(this.tag, this.attribs, null, parent, index);
		this.update(state);
		return this.el;
	}

	async unmount() {
		this.items!.forEach((c) => c.unmount());
		this.$remove();
		this.el = undefined;
		this.items = undefined;
		this.prev = undefined;
	}

	async update(curr: T[]) {
		if (!curr) return;
		const { ctor, equiv, items, prev, el: parent } = this;
		const nb = curr.length;
		let na = prev!.length;
		let n = Math.min(na, nb);
		for (let i = 0; i < n; i++) {
			if (!equiv(prev![i], curr[i])) {
				await items![i].unmount();
				const val = curr[i];
				const child = $compile(ctor(val));
				await child.mount(parent!, i);
				items![i] = child;
				prev![i] = val;
			}
		}
		if (na < nb) {
			for (; n < nb; n++) {
				const val = curr[n];
				const child = $compile(ctor(val));
				await child.mount(parent!, -1);
				items![n] = child;
				prev![n] = val;
			}
		} else {
			while (--na >= nb) {
				await items![na].unmount();
				items!.pop();
				prev!.pop();
			}
		}
	}
}
