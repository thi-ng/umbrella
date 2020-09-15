import {
    assert,
    Event,
    INotify,
    INotifyMixin,
    Listener,
    typedArray,
    uintType,
} from "@thi.ng/api";
import { bitSize } from "@thi.ng/binary";
import { isArray, isString } from "@thi.ng/checks";
import { IDGen } from "@thi.ng/idgen";
import { filter } from "@thi.ng/transducers";
import {
    ComponentID,
    GroupOpts,
    IComponent,
    MemMappedComponentOpts,
    ObjectComponentOpts,
} from "./api";
import { MemMappedComponent } from "./components/mem-component";
import { ObjectComponent } from "./components/object-component";
import { EVENT_ADDED, EVENT_PRE_DELETE } from "./constants";
import { Group } from "./groups/group";

let NEXT_GROUP_ID = 0;

@INotifyMixin
export class ECS<SPEC> implements INotify {
    idgen: IDGen;
    components: Map<
        ComponentID<SPEC>,
        IComponent<ComponentID<SPEC>, any, any, any>
    >;
    groups: Map<string, Group<SPEC, any>>;

    constructor(capacity = 1000) {
        this.idgen = new IDGen(bitSize(capacity), 0);
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
    ): MemMappedComponent<K>;
    defComponent<K extends ComponentID<SPEC>>(
        opts: ObjectComponentOpts<K, SPEC[K]>
    ): ObjectComponent<K, SPEC[K]>;
    defComponent<K extends ComponentID<SPEC>>(opts: any) {
        assert(
            !this.components.has(opts.id),
            `component '${opts.id}' already existing`
        );
        const cap = this.idgen.capacity;
        const utype = uintType(cap);
        const sparse = typedArray(utype, cap);
        const dense = typedArray(utype, cap);
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
        for (let comp of this.components.values()) {
            comp.resize(newCap);
        }
    }

    /** {@inheritDoc @thi.ng/api#INotify.addListener} */
    // @ts-ignore: mixin
    addListener(id: string, fn: Listener, scope?: any): boolean {}

    /** {@inheritDoc @thi.ng/api#INotify.removeListener} */
    // @ts-ignore: mixin
    removeListener(id: string, fn: Listener, scope?: any): boolean {}

    /** {@inheritDoc @thi.ng/api#INotify.notify} */
    // @ts-ignore: mixin
    notify(event: Event) {}
}
