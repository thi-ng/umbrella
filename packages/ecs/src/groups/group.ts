import type { Event, FnO2, FnO3, IID } from "@thi.ng/api";
import { assert } from "@thi.ng/api/assert";
import { intersectionR } from "@thi.ng/associative/intersection";
import { map } from "@thi.ng/transducers/map";
import { transduce } from "@thi.ng/transducers/transduce";
import type {
    ComponentID,
    GroupInfo,
    GroupOpts,
    GroupTuple,
    ICache,
    IComponent,
} from "../api";
import { UnboundedCache } from "../caches/unbounded";
import { ObjectComponent } from "../components/object-component";
import {
    EVENT_ADDED,
    EVENT_CHANGED,
    EVENT_PRE_DELETE,
    LOGGER,
} from "../constants";

export class Group<SPEC, K extends ComponentID<SPEC>> implements IID<string> {
    readonly id: string;

    components: IComponent<K, any, any, any>[];
    owned: IComponent<K, any, any, any>[];
    ids: Set<number>;
    n: number;

    info: GroupInfo<SPEC, K>;
    cache: ICache<GroupTuple<SPEC, K>>;

    constructor(
        comps: IComponent<K, any, any, any>[],
        owned: IComponent<K, any, any, any>[] = comps,
        opts: GroupOpts
    ) {
        this.components = comps;
        this.ids = new Set();
        this.n = 0;
        this.id = opts.id;
        this.cache = opts.cache || new UnboundedCache();

        this.info = comps.reduce((acc: GroupInfo<SPEC, K>, c) => {
            acc[c.id] = {
                values: <any>c.vals,
                size: c.size,
                stride: c.stride,
            };
            return acc;
        }, <any>{});

        // update ownerships
        owned.forEach((c) => {
            assert(
                comps.includes(c),
                `owned component ${c.id} not in given list`
            );
            assert(
                !c.owner,
                () => `component ${c.id} already owned by ${c.owner!.id}`
            );
            c.owner = this;
        });
        this.owned = owned;
        this.addExisting();
        this.addRemoveListeners(true);
    }

    release() {
        this.addRemoveListeners(false);
        this.cache.release();
    }

    has(id: number) {
        return this.ids.has(id);
    }

    values() {
        return this.isFullyOwning()
            ? this.ownedValues()
            : this.nonOwnedValues();
    }

    getIndex(i: number) {
        this.ensureFullyOwning();
        return i < this.n
            ? this.getEntityUnsafe(this.components[0].dense[i])
            : undefined;
    }

    getEntity(id: number) {
        return this.has(id) ? this.getEntityUnsafe(id) : undefined;
    }

    getEntityUnsafe(id: number) {
        return this.cache.getSet(id, () => {
            const tuple = <GroupTuple<SPEC, K>>{ id: id };
            const comps = this.components;
            for (let j = comps.length; --j >= 0; ) {
                const c = comps[j];
                tuple[c.id] = <any>c.getIndex(c.sparse[id])!;
            }
            return tuple;
        });
    }

    run(fn: FnO2<GroupInfo<SPEC, K>, number, void>, ...xs: any[]) {
        this.ensureFullyOwning();
        fn(this.info, this.n, ...xs);
    }

    forEachRaw(
        fn: FnO3<GroupInfo<SPEC, K>, number, number, void>,
        ...xs: any[]
    ) {
        this.ensureFullyOwning();
        const info = this.info;
        const ref = this.components[0].dense;
        for (let i = 0, n = this.n; i < n; i++) {
            fn(info, ref[i], i, ...xs);
        }
    }

    forEach(fn: FnO2<GroupTuple<SPEC, K>, number, void>, ...xs: any[]) {
        let i = 0;
        for (let id of this.ids) {
            fn(this.getEntityUnsafe(id), i++, ...xs);
        }
    }

    isFullyOwning() {
        return this.owned.length === this.components.length;
    }

    isValidID(id: number) {
        for (let comp of this.components) {
            if (!comp.has(id)) return false;
        }
        return true;
    }

    protected onAddListener(e: Event) {
        LOGGER && LOGGER.debug(`add ${e.target.id}: ${e.value}`);
        this.addID(e.value);
    }

    protected onDeleteListener(e: Event) {
        LOGGER && LOGGER.debug(`delete ${e.target.id}: ${e.value}`);
        this.removeID(e.value);
    }

    protected onChangeListener(e: Event) {
        if (e.target instanceof ObjectComponent) {
            LOGGER && LOGGER.debug(`invalidate ${e.target.id}: ${e.value}`);
            this.cache.delete(e.value);
        }
    }

    protected addExisting() {
        const existing: Set<number> = transduce(
            map((c) => c.keys()),
            intersectionR(),
            this.components
        );
        for (let id of existing) {
            this.addID(id, false);
        }
    }

    protected addID(id: number, validate = true) {
        if (validate && !this.isValidID(id)) return;
        this.ids.add(id);
        this.reorderOwned(id, this.n++);
    }

    protected removeID(id: number, validate = true) {
        if (validate && !this.isValidID(id)) return;
        this.ids.delete(id);
        this.reorderOwned(id, --this.n);
    }

    protected reorderOwned(id: number, n: number) {
        const owned = this.owned;
        if (!owned.length) return;
        const id2 = owned[0].dense[n];
        let swapped = false;
        for (let i = owned.length; --i >= 0; ) {
            const comp = owned[i];
            // console.log(`moving id: ${id} in ${comp.id}...`);
            swapped = comp.swapIndices(comp.sparse[id], n) || swapped;
        }
        if (swapped) {
            this.cache.delete(id);
            this.cache.delete(id2);
        }
    }

    protected *ownedValues() {
        const comps = this.components;
        const ref = comps[0].dense;
        for (let i = this.n; --i >= 0; ) {
            yield this.getEntityUnsafe(ref[i]);
        }
    }

    protected *nonOwnedValues() {
        for (let id of this.ids) {
            yield this.getEntityUnsafe(id);
        }
    }

    protected ensureFullyOwning() {
        assert(
            this.isFullyOwning(),
            `group ${this.id} isn't fully owning its components`
        );
    }

    protected addRemoveListeners(add: boolean) {
        const f = add ? "addListener" : "removeListener";
        this.components.forEach((comp) => {
            comp[f](EVENT_ADDED, this.onAddListener, this);
            comp[f](EVENT_PRE_DELETE, this.onDeleteListener, this);
            comp[f](EVENT_CHANGED, this.onChangeListener, this);
        });
    }
}
