import { assert, Type, typedArray } from "@thi.ng/api";
import { isArray, isString } from "@thi.ng/checks";
import { ReadonlyVec } from "@thi.ng/vectors";
import { ComponentOpts, GroupOpts } from "./api";
import { Component } from "./component";
import { Group } from "./group";
import { IDGen } from "./id";

export class ECS {
    idgen: IDGen;
    components: Map<string, Component<string, Type>>;
    groups: Map<string, Group<string>>;

    constructor(capacity = 1000) {
        this.idgen = new IDGen(capacity);
        this.components = new Map();
        this.groups = new Map();
    }

    defEntity<K extends string>(
        comps?:
            | string[]
            | Component<K, Type>[]
            | Record<K, ReadonlyVec | undefined>
    ) {
        const id = this.idgen.next();
        assert(
            id !== undefined,
            `max number of components reached (${this.idgen.capacity})`
        );
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
                    comp!.add(id!, comps[cid]);
                }
            }
        }
        return id!;
    }

    defComponent<K extends string, T extends Type = Type.F32>(
        opts: ComponentOpts<K, T>
    ) {
        const cap = this.idgen.capacity;
        const utype = uintType(cap);
        const comp = new Component<K, T>(
            typedArray(utype, cap),
            typedArray(utype, cap),
            opts
        );
        // TODO add exist check
        this.components.set(comp.id, comp);
        return comp;
    }

    defGroup<A extends string>(
        comps: [Component<A, Type>],
        owned?: Component<A, Type>[],
        opts?: Partial<GroupOpts>
    ): Group<A>;
    defGroup<A extends string, B extends string>(
        comps: [Component<A, Type>, Component<B, Type>],
        owned?: Component<A | B, Type>[],
        opts?: Partial<GroupOpts>
    ): Group<A | B>;
    defGroup<A extends string, B extends string, C extends string>(
        comps: [Component<A, Type>, Component<B, Type>, Component<C, Type>],
        owned?: Component<A | B | C, Type>[],
        opts?: Partial<GroupOpts>
    ): Group<A | B | C>;
    defGroup<
        A extends string,
        B extends string,
        C extends string,
        D extends string
    >(
        comps: [
            Component<A, Type>,
            Component<B, Type>,
            Component<C, Type>,
            Component<D, Type>
        ],
        owned?: Component<A | B | C | D, Type>[],
        opts?: Partial<GroupOpts>
    ): Group<A | B | C | D>;
    defGroup(
        comps: Component<string, Type>[],
        owned?: Component<string, Type>[],
        opts?: Partial<GroupOpts>
    ): Group<string>;
    defGroup(
        comps: Component<string, Type>[],
        owned: Component<string, Type>[] = comps,
        opts: Partial<GroupOpts> = {}
    ): Group<string> {
        const g = new Group(comps, owned, opts);
        // TODO add exist check
        this.groups.set(g.id, g);
        return g;
    }
}

const uintType = (num: number) =>
    num <= 0x100 ? Type.U8 : num <= 0x10000 ? Type.U16 : Type.U32;
