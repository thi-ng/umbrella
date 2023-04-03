import type { Fn, Fn2, NumOrString } from "@thi.ng/api";
import type { ISubscribable } from "@thi.ng/rstream";
import type { IComponent, IMountWithState, NumOrElement } from "./api.js";
import { $compile } from "./compile.js";
import { Component } from "./component.js";
import { $moveTo } from "./dom.js";
import { __nextID } from "./idgen.js";
import { $subWithID } from "./sub.js";

interface KListItem {
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
 * The given `keyFn` is used to obtain a *unique* key value for each list item
 * obtained from the reactive arrays obtained from `src`. Like a hash, the key
 * value MUST represent an item's *current* value such that if the value
 * changes, so does the key.
 *
 * @example
 * ```ts
 * const items = reactive([{id: "a", val: 1}, {id: "b", val: 2}, {id: "c", val: 3}]);
 *
 * $klist(
 *   // data source (any rstream subscribable)
 *   items,
 *   // outer list element & attribs
 *   "ul",
 *   { class: "list red" },
 *   // list item component constructor
 *   (x) => ["li", {}, x.id, ` (${x.val})`],
 *   // key function
 *   (x) => `${x.id}-${x.val}`
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
 * @param tag -
 * @param attribs -
 * @param childCtor -
 * @param keyFn -
 */
export const $klist = <T>(
	src: ISubscribable<T[]>,
	tag: string,
	attribs: any,
	childCtor: Fn<T, any>,
	keyFn?: Fn2<T, number, NumOrString>
) =>
	$subWithID(
		src,
		new KList<T>(tag, attribs, childCtor, keyFn),
		__nextID("klist", src)
	);

export class KList<T> extends Component<T[]> implements IMountWithState<T[]> {
	items?: KListItem[] = [];
	cache?: Map<NumOrString, KListItem>;

	constructor(
		protected tag: string,
		protected attribs: any,
		protected ctor: Fn<T, any>,
		protected keyFn: Fn2<T, number, NumOrString> = (_, i) => i
	) {
		super();
	}

	async mount(parent: Element, index: NumOrElement, state: T[]) {
		this.items = [];
		this.cache = new Map();
		this.el = this.$el(this.tag, this.attribs, null, parent, index);
		this.update(state);
		return this.el!;
	}

	async unmount() {
		this.items!.forEach((c) => c.v.unmount());
		this.$remove();
		this.el = undefined;
		this.items = undefined;
		this.cache = undefined;
	}

	async update(curr: T[]) {
		if (!curr) return;
		const { keyFn, items, ctor, cache, el: parent } = this;
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
		let next: Element;

		const insert = async (item: KListItem) => {
			if (cache!.has(item.k)) {
				$moveTo(parent!, item.v.el!, next);
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
