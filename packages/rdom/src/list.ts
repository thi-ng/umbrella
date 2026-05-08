// SPDX-License-Identifier: Apache-2.0
import type { Predicate2 } from "@thi.ng/api";
import { isString } from "@thi.ng/checks/is-string";
import type { ISubscribable } from "@thi.ng/rstream";
import type {
	IComponent,
	IMountWithState,
	ListBaseOpts,
	NumOrNode,
} from "./api.js";
import { $compile } from "./compile.js";
import { Component } from "./component.js";
import { __nextID } from "./idgen.js";
import { __initList } from "./internal/list.js";
import { $subWithID } from "./sub.js";

export interface ListOpts<T> extends ListBaseOpts<T> {
	/**
	 * Equality predicate function to determine if a list item has changed. Uses
	 * `===` by default.
	 */
	equiv?: Predicate2<T>;
}

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
 * See {@link ListBaseOpts} for more details about wrapped vs. bare lists, i.e.
 * using a list wrapper element for items or attaching list items directly to
 * this component's parent. Also see this example project to illustrate the
 * structure/possibilities of bare lists:
 *
 * - https://demo.thi.ng/umbrella/rdom-bare-lists/
 *
 * @example
 * ```ts
 * import { $list } from "@thi.ng/rdom";
 * import { reactive } from "@thi.ng/rstream";
 *
 * const items = reactive([{id: "a"}, {id: "b"}, {id: "c"}]);
 *
 * $list(
 *   // data source (rstream subsribable)
 *   items,
 *   {
 *     // outer list element & attribs
 *     el: "ul",
 *     attribs: { class: "list red" },
 *     // list item component constructor
 *     item: (x) => ["li", {}, x.id],
 *     // optional equality predicate (default this.ng/equiv)
 *     equiv: (a, b) => a.id === b.id
 *   }
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
 * @param src -
 * @param opts -
 */
export const $list = <T>(src: ISubscribable<T[]>, opts: ListOpts<T>) =>
	$subWithID(src, new List<T>(opts), __nextID("list", src));

export class List<T> extends Component implements IMountWithState<T[]> {
	protected prev?: T[];
	protected items?: IComponent[];
	protected anchor?: Comment;
	protected offset = 0;
	protected numChildren = -1;

	constructor(protected opts: ListOpts<T>) {
		super();
	}

	async mount(parent: ParentNode, index: NumOrNode, state: T[]) {
		this.prev = [];
		this.items = [];
		const { el, anchor } = __initList(parent, index, this.opts);
		this.el = el;
		this.anchor = anchor;
		this.update(state);
		return this.el;
	}

	async unmount() {
		this.items!.forEach((c) => c.unmount());
		if (isString(this.opts.el)) this.$remove();
		this.anchor?.remove();
		this.el = undefined;
		this.items = undefined;
		this.prev = undefined;
	}

	async update(curr: T[]) {
		if (!curr) return;
		const {
			opts: { item: ctor, equiv = (a, b) => a === b },
			items,
			prev,
			el: parent,
			anchor,
		} = this;
		const nb = curr.length;
		let na = prev!.length;
		let n = Math.min(na, nb);
		let offset = this.offset;
		const children = parent!.childNodes;
		if (anchor && children.length !== this.numChildren) {
			this.numChildren = children.length;
			this.offset = offset = [...children].indexOf(anchor);
		}
		for (let i = 0; i < n; i++) {
			if (!equiv(prev![i], curr[i])) {
				await items![i].unmount();
				const val = curr[i];
				const child = $compile(ctor(val));
				await child.mount(parent!, i + offset);
				items![i] = child;
				prev![i] = val;
			}
		}
		if (na < nb) {
			for (; n < nb; n++) {
				const val = curr[n];
				const child = $compile(ctor(val));
				await child.mount(parent!, n + offset);
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
