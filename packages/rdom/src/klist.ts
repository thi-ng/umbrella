// SPDX-License-Identifier: Apache-2.0
import type { Fn2, Maybe, NumOrString } from "@thi.ng/api";
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

export interface KListOpts<T> extends ListBaseOpts<T> {
	key?: Fn2<T, number, NumOrString>;
}

export interface KListItem {
	k: NumOrString;
	v: IComponent;
}

/**
 * Similar to {@link $list}, however additionally uses keying to establish list
 * item identities and uses these keys (and *only* these!) in a more complex
 * diffing algorithm to avoid re-initialization of list items if they've been
 * re-ordered or changed positions due to removal/insertion of other items in
 * the list.
 *
 * @remarks
 * The given `key` function is used to obtain a *unique* key value for each list
 * item obtained from the reactive arrays obtained from `src`. Like a hash, the
 * key value MUST represent an item's *current* value such that if the value
 * changes, so does the key.
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
 * import { $klist } from "@thi.ng/rdom";
 * import { reactive } from "@thi.ng/rstream";
 *
 * const items = reactive([{id: "a", val: 1}, {id: "b", val: 2}, {id: "c", val: 3}]);
 *
 * $klist(
 *   // data source (any rstream subscribable)
 *   items,
 *   {
 *     // outer list element & attribs
 *     el: "ul",
 *     attribs: { class: "list red" },
 *     // list item component constructor
 *     item: (x) => ["li", {}, x.id, ` (${x.val})`],
 *     // key function
 *     key: (x) => `${x.id}-${x.val}`
 *   }
 * ).mount(document.body);
 *
 * // update list:
 * // - item a will be removed
 * // - item b is unchanged
 * // - item d will be newly inserted
 * // - item c will be updated (due to new value)
 * setTimeout(
 *   () => {
 *     items.next([
 *       { id: "b", val: 2 },
 *       { id: "d", val: 4 },
 *       { id: "c", val: 30 },
 *     ]);
 *   },
 *   1000
 * );
 * ```
 *
 * @param src -
 * @param opts -
 */
export const $klist = <T>(src: ISubscribable<T[]>, opts: KListOpts<T>) =>
	$subWithID(src, new KList<T>(opts), __nextID("klist", src));

export class KList<T> extends Component<T[]> implements IMountWithState<T[]> {
	protected items?: KListItem[] = [];
	protected cache?: Map<NumOrString, KListItem>;
	protected anchor?: Comment;

	constructor(protected opts: KListOpts<T>) {
		super();
	}

	async mount(parent: ParentNode, index: NumOrNode, state: T[]) {
		this.items = [];
		this.cache = new Map();
		const { el, anchor } = __initList(parent, index, this.opts);
		this.el = el;
		this.anchor = anchor;
		this.update(state);
		return this.el!;
	}

	async unmount() {
		this.items!.forEach((c) => c.v.unmount());
		if (isString(this.opts.el)) this.$remove();
		this.anchor?.remove();
		this.el = undefined;
		this.items = undefined;
		this.cache = undefined;
	}

	async update(curr: T[]) {
		if (!curr) return;
		const {
			opts: { item: ctor, key: keyFn = (_, i) => i },
			items,
			cache,
			el: parent,
		} = this;
		const currItems: KListItem[] = [];
		const currCache = new Map<NumOrString, KListItem>();
		const offsets = new Map<NumOrString, number>();
		const deltas = new Map<NumOrString, number>();
		let numPrev = items!.length;
		let numCurr = curr.length;

		let i: number;
		for (i = numPrev; i-- > 0; ) {
			offsets.set(items![i].k, i);
		}
		for (i = numCurr; i-- > 0; ) {
			const val = curr[i];
			const key = keyFn(val, i);
			let item = cache!.get(key);
			item
				? item.v.update(val) // TODO obsolete?
				: (item = {
						k: key,
						v: $compile(ctor(val)),
					});
			currCache.set(key, (currItems[i] = item));
			const off = offsets.get(key);
			off != undefined && deltas.set(key, Math.abs(i - off));
		}

		const willMove = new Set<NumOrString>();
		const didMove = new Set<NumOrString>();
		let next: Maybe<Node> = this.anchor;

		const insert = async (item: KListItem) => {
			if (cache!.has(item.k)) {
				this.$moveTo(parent!, item.v.el!, next);
				next = item.v.el!;
			} else {
				cache!.set(item.k, item);
				next = await item.v.mount(parent!, next);
			}
			numCurr--;
		};

		while (numPrev && numCurr) {
			const prevItem = items![numPrev - 1];
			const prevKey = prevItem.k;
			const currItem = currItems[numCurr - 1];
			const currKey = currItem.k;
			if (currItem === prevItem) {
				next = currItem.v.el!;
				numPrev--;
				numCurr--;
			} else if (!currCache.has(prevKey)) {
				await prevItem.v.unmount();
				cache!.delete(prevKey);
				numPrev--;
			} else if (!cache!.has(currKey) || willMove.has(currKey)) {
				await insert(currItem);
			} else if (didMove.has(prevKey)) {
				numPrev--;
			} else if (deltas.get(currKey)! > deltas.get(prevKey)!) {
				await insert(currItem);
				didMove.add(currKey);
			} else {
				willMove.add(prevKey);
				numPrev--;
			}
		}

		while (numPrev--) {
			const item = items![numPrev];
			if (!currCache.has(item.k)) {
				await item.v.unmount();
				cache!.delete(item.k);
			}
		}

		while (numCurr) {
			await insert(currItems[numCurr - 1]);
		}

		this.items = currItems;
	}
}
