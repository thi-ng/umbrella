import {
    assert,
    IObjectOf,
    Type,
    TypedArray,
    typedArray,
    TypedArrayTypeMap
} from "@thi.ng/api";
import { isArray, isString } from "@thi.ng/checks";
import { ReadonlyVec } from "@thi.ng/vectors";
import { ComponentOpts, GroupOpts } from "./api";
import { Component } from "./component";
import { Group } from "./group";
import { IDGen } from "./id";

export class ECS {
    idgen: IDGen;
    components: Map<string, Component<TypedArray>>;
    groups: Map<string, Group>;

    constructor(capacity = 1000) {
        this.idgen = new IDGen(capacity);
        this.components = new Map();
        this.groups = new Map();
    }

    defEntity(
        comps?:
            | string[]
            | Component<TypedArray>[]
            | IObjectOf<ReadonlyVec | undefined>
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

    defComponent<T extends Type = Type.F32>(opts: Partial<ComponentOpts>) {
        const cap = this.idgen.capacity;
        const utype = uintType(cap);
        const comp = new Component<TypedArrayTypeMap[T]>(
            typedArray(utype, cap),
            typedArray(utype, cap),
            opts
        );
        // TODO add exist check
        this.components.set(comp.id, comp);
        return comp;
    }

    defGroup(
        comps: Component<TypedArray>[],
        owned: Component<TypedArray>[] = comps,
        opts: Partial<GroupOpts> = {}
    ) {
        const g = new Group(comps, owned, opts);
        // TODO add exist check
        this.groups.set(g.id, g);
        return g;
    }
}

const uintType = (num: number) =>
    num <= 0x100 ? Type.U8 : num <= 0x10000 ? Type.U16 : Type.U32;
