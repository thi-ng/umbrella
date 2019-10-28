import {
    assert,
    Event,
    Fn3,
    IID,
    IObjectOf,
    TypedArray
} from "@thi.ng/api";
import { intersection } from "@thi.ng/associative";
import { ComponentInfo, ICache } from "./api";
import { Component } from "./component";
import { LRU } from "./lru";

export class Group implements IID<string> {
    readonly id: string;

    components: Component<TypedArray>[];
    owned: Component<TypedArray>[];
    ids: Set<number>;
    n: number;

    info: IObjectOf<ComponentInfo>;
    cache: ICache<IObjectOf<TypedArray>>;

    constructor(
        comps: Component<TypedArray>[],
        owned: Component<TypedArray>[] = comps
    ) {
        this.components = comps;
        this.ids = new Set();
        this.n = 0;
        this.id = comps.map((c) => c.id).join("-");
        this.info = comps.reduce((acc: IObjectOf<ComponentInfo>, c) => {
            acc[c.id] = { buffer: c.vals, size: c.size, stride: c.stride };
            return acc;
        }, {});
        // update ownerships
        owned.forEach((c) => {
            assert(
                !c.owner,
                () => `component ${c.id} already owned by ${c.owner!.id}`
            );
            c.owner = this;
        });
        this.owned = owned;
        // FIXME size
        this.cache = new LRU(this.ids.size);
        this.addExisting();
        // call addID for each
        comps.forEach((comp) => {
            comp.addListener("add", this.onAddListener, this);
            comp.addListener("delete", this.onDeleteListener, this);
        });
    }

    *values() {
        const comps = this.components;
        const n = comps.length;
        for (let i = this.n; --i >= 0; ) {
            const tuple: any = { id: comps[0].dense[i] };
            for (let j = n; --j >= 0; ) {
                const c = comps[j];
                tuple[c.id] = c.getIndex(i);
            }
            yield tuple;
        }
    }

    forEachRaw(fn: Fn3<IObjectOf<ComponentInfo>, number, number, void>) {
        assert(
            this.owned.length === this.components.length,
            `group ${this.id} isn't fully owning its components`
        );
        const ref = this.components[0].dense;
        for (let i = 0, n = this.n; i < n; i++) {
            fn(this.info, ref[i], i);
        }
    }

    forEach(fn: Fn3<IObjectOf<TypedArray>, number, number, void>) {
        const comps = this.components;
        const n = comps.length;
        let i = 0;
        for (let id of this.ids) {
            const tuple = this.cache.getSet(id, () => {
                const tuple: IObjectOf<TypedArray> = {};
                for (let j = n; --j >= 0; ) {
                    const c = comps[j];
                    tuple[c.id] = c.getIndex(c.sparse[id])!;
                }
                return tuple;
            });
            fn(tuple, id, i);
            i++;
        }
    }

    release() {
        this.components.forEach((comp) => {
            comp.removeListener("add", this.onAddListener, this);
            comp.removeListener("delete", this.onDeleteListener, this);
        });
    }

    onAddListener(e: Event) {
        // console.log(`add ${e.target.id}: ${e.value}`);
        this.addID(e.value);
    }

    onDeleteListener(e: Event) {
        // console.log(`delete ${e.target.id}: ${e.value}`);
        this.deleteID(e.value);
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
            comp.swapIndices(comp.sparse[id], n);
        }
    }

    protected deleteID(id: number, validate = true) {
        if (validate && !this.validID(id)) return;
        this.ids.delete(id);
        const n = --this.n;
        for (let comp of this.owned) {
            // console.log(`moving id: ${id} in ${comp.id}...`);
            comp.swapIndices(comp.sparse[id], n);
        }
    }

    protected validID(id: number) {
        for (let comp of this.components) {
            if (!comp.has(id)) return false;
        }
        return true;
    }
}
