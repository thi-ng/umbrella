import {
    assert,
    Event,
    FnO2,
    FnO3,
    IID,
    Type
} from "@thi.ng/api";
import { intersection } from "@thi.ng/associative";
import {
    ComponentInfo,
    ComponentTuple,
    EVENT_ADDED,
    EVENT_PRE_REMOVE,
    GroupOpts,
    ICache
} from "./api";
import { Component } from "./component";
import { UnboundedCache } from "./unbounded";

let NEXT_ID = 0;

export class Group<K extends string> implements IID<string> {
    readonly id: string;

    components: Component<K, Type>[];
    owned: Component<K, Type>[];
    ids: Set<number>;
    n: number;

    info: Record<K, ComponentInfo>;
    cache: ICache<ComponentTuple<K>>;

    constructor(
        comps: Component<K, Type>[],
        owned: Component<K, Type>[] = comps,
        opts: Partial<GroupOpts> = {}
    ) {
        this.components = comps;
        this.ids = new Set();
        this.n = 0;
        this.id = opts.id || `group${NEXT_ID++}`;
        this.cache = opts.cache || new UnboundedCache();

        this.info = comps.reduce(
            (acc: Record<K, ComponentInfo>, c) => {
                acc[c.id] = { buffer: c.vals, size: c.size, stride: c.stride };
                return acc;
            },
            <any>{}
        );

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

        comps.forEach((comp) => {
            comp.addListener(EVENT_ADDED, this.onAddListener, this);
            comp.addListener(EVENT_PRE_REMOVE, this.onRemoveListener, this);
        });
    }

    release() {
        this.components.forEach((comp) => {
            comp.removeListener(EVENT_ADDED, this.onAddListener, this);
            comp.removeListener(EVENT_PRE_REMOVE, this.onRemoveListener, this);
        });
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
            const tuple = <ComponentTuple<K>>{ id: id };
            const comps = this.components;
            for (let j = comps.length; --j >= 0; ) {
                const c = comps[j];
                tuple[c.id] = <any>c.getIndex(c.sparse[id])!;
            }
            return tuple;
        });
    }

    run(fn: FnO2<Record<K, ComponentInfo>, number, void>, ...xs: any[]) {
        this.ensureFullyOwning();
        fn(this.info, this.n, ...xs);
    }

    forEachRaw(
        fn: FnO3<Record<K, ComponentInfo>, number, number, void>,
        ...xs: any[]
    ) {
        this.ensureFullyOwning();
        const info = this.info;
        const ref = this.components[0].dense;
        for (let i = 0, n = this.n; i < n; i++) {
            fn(info, ref[i], i, ...xs);
        }
    }

    forEach(fn: FnO2<ComponentTuple<K>, number, void>, ...xs: any[]) {
        let i = 0;
        for (let id of this.ids) {
            fn(this.getEntityUnsafe(id), i++, ...xs);
        }
    }

    isFullyOwning() {
        return this.owned.length === this.components.length;
    }

    protected onAddListener(e: Event) {
        // console.log(`add ${e.target.id}: ${e.value}`);
        this.addID(e.value);
    }

    protected onRemoveListener(e: Event) {
        // console.log(`delete ${e.target.id}: ${e.value}`);
        this.removeID(e.value);
    }

    protected addExisting() {
        const existing = this.components
            .slice(1)
            .reduce(
                (acc, c) => intersection(acc, new Set(c.keys())),
                new Set<number>(this.components[0].keys())
            );
        for (let id of existing) {
            this.addID(id, false);
        }
    }

    protected addID(id: number, validate = true) {
        if (validate && !this.validID(id)) return;
        this.ids.add(id);
        const n = this.n++;
        for (let comp of this.owned) {
            // console.log(`moving id: ${id} in ${comp.id}...`);
            comp.swapIndices(comp.sparse[id], n) && this.invalidateCache(id);
        }
    }

    protected removeID(id: number, validate = true) {
        if (validate && !this.validID(id)) return;
        this.ids.delete(id);
        this.cache.delete(id);
        const n = --this.n;
        for (let comp of this.owned) {
            // console.log(`moving id: ${id} in ${comp.id}...`);
            comp.swapIndices(comp.sparse[id], n) && this.invalidateCache(id);
        }
    }

    protected validID(id: number) {
        for (let comp of this.components) {
            if (!comp.has(id)) return false;
        }
        return true;
    }

    protected invalidateCache(id: number) {
        this.cache && this.cache.delete(id);
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
}
