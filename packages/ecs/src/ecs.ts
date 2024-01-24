import type { Event, INotify, Listener } from "@thi.ng/api";
import { INotifyMixin } from "@thi.ng/api/mixins/inotify";
import { uintTypeForSize } from "@thi.ng/api/typedarray";
import { bitSize } from "@thi.ng/binary/count";
import { isArray } from "@thi.ng/checks/is-array";
import { isString } from "@thi.ng/checks/is-string";
import { assert } from "@thi.ng/errors/assert";
import { IDGen } from "@thi.ng/idgen";
import type { IMemPoolArray } from "@thi.ng/malloc";
import { NativePool } from "@thi.ng/malloc/native";
import { filter } from "@thi.ng/transducers/filter";
import {
	EVENT_ADDED,
	EVENT_PRE_DELETE,
	type ComponentID,
	type ECSEventType,
	type ECSOpts,
	type GroupOpts,
	type IComponent,
	type MemMappedComponentOpts,
	type ObjectComponentOpts,
} from "./api.js";
import { MemMappedComponent } from "./components/mem-component.js";
import { ObjectComponent } from "./components/object-component.js";
import { Group } from "./groups/group.js";

let NEXT_GROUP_ID = 0;

@INotifyMixin
export class ECS<SPEC> implements INotify<ECSEventType> {
	idgen: IDGen;
	pool: IMemPoolArray;
	components: Map<
		ComponentID<SPEC>,
		IComponent<ComponentID<SPEC>, any, any, any>
	>;
	groups: Map<string, Group<SPEC, any>>;

	constructor(opts?: Partial<ECSOpts>) {
		opts = { capacity: 1000, pool: new NativePool(), ...opts };
		this.idgen = new IDGen(bitSize(opts.capacity!), 0);
		this.pool = opts.pool!;
		this.components = new Map();
		this.groups = new Map();
	}

	defEntity<K extends ComponentID<SPEC>>(
		comps?: K[] | IComponent<K, any, any, any>[] | Partial<Pick<SPEC, K>>
	) {
		const id = this.idgen.next();
		if (comps) {
			if (isArray(comps)) {
				if (!comps.length) return id!;
				for (let cid of comps) {
					const comp = isString(cid) ? this.components.get(cid) : cid;
					assert(!!comp, `unknown component ID: ${cid}`);
					comp!.add(id!);
				}
			} else {
				for (let cid in comps) {
					const comp = this.components.get(cid);
					assert(!!comp, `unknown component ID: ${cid}`);
					comp!.add(id!, <any>comps[cid]);
				}
			}
		}
		this.notify({ id: EVENT_ADDED, target: this, value: id });
		return id!;
	}

	defComponent<K extends ComponentID<SPEC>>(
		opts: MemMappedComponentOpts<K>
	): MemMappedComponent<K> | undefined;
	defComponent<K extends ComponentID<SPEC>>(
		opts: ObjectComponentOpts<K, SPEC[K]>
	): ObjectComponent<K, SPEC[K]> | undefined;
	defComponent<K extends ComponentID<SPEC>>(opts: any) {
		assert(
			!this.components.has(opts.id),
			`component '${opts.id}' already existing`
		);
		const cap = this.idgen.capacity;
		const utype = uintTypeForSize(cap);
		const sparse = this.pool.mallocAs(utype, cap);
		const dense = this.pool.mallocAs(utype, cap);
		if (!(sparse && dense)) return;
		const comp: IComponent<K, any, any, any> =
			opts.type !== undefined
				? new MemMappedComponent(dense, sparse, opts)
				: new ObjectComponent(sparse, dense, opts);
		this.components.set(opts.id, comp);
		return comp;
	}

	defGroup<K extends ComponentID<SPEC>>(
		comps: IComponent<K, any, any, any>[],
		owned: IComponent<K, any, any, any>[] = comps,
		opts: Partial<GroupOpts> = {}
	) {
		opts = {
			id: `group${NEXT_GROUP_ID++}`,
			...opts,
		};
		assert(
			!this.groups.has(opts.id!),
			`group '${opts.id}' already existing`
		);
		const g = new Group<SPEC, K>(comps, owned, <GroupOpts>opts);
		this.groups.set(g.id, g);
		return g;
	}

	hasID(id: number) {
		this.idgen.has(id);
	}

	deleteID(id: number) {
		if (this.idgen.free(id)) {
			this.notify({ id: EVENT_PRE_DELETE, target: this, value: id });
			for (let c of this.componentsForID(id)) {
				c.delete(id);
			}
			return true;
		}
		return false;
	}

	componentsForID(id: number) {
		return filter((c) => c.has(id), this.components.values());
	}

	groupsForID(id: number) {
		return filter((g) => g.has(id), this.groups.values());
	}

	setCapacity(newCap: number) {
		this.idgen.capacity = newCap;
		const pool = this.pool;
		for (let comp of this.components.values()) {
			comp.resize(pool, newCap);
		}
	}

	// @ts-ignore: mixin
	// prettier-ignore
	addListener(id: ECSEventType, fn: Listener<ECSEventType>, scope?: any): boolean {}

	// @ts-ignore: mixin
	// prettier-ignore
	removeListener(id: ECSEventType, fn: Listener<ECSEventType>, scope?: any): boolean {}

	// @ts-ignore: mixin
	notify(event: Event<ECSEventType>): boolean {}
}
