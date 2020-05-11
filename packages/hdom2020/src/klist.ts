import type {
    Fn,
    IObjectOf,
    Nullable,
    NumOrString,
    Predicate2,
} from "@thi.ng/api";
import { diffArray, DiffMode } from "@thi.ng/diff";
import { equiv as _equiv } from "@thi.ng/equiv";
import type { ISubscribable } from "@thi.ng/rstream";
import type { IComponent } from "./api";
import { $move } from "./dom";
import { $compile } from "./element";
import { List } from "./list";
import { withStream } from "./with-stream";

export const $klist = <T>(
    src: ISubscribable<T[]>,
    tag: string,
    attribs: any,
    childCtor: Fn<T, any>,
    keyFn: Fn<T, NumOrString>,
    equiv?: Predicate2<T>
) => withStream<T[]>(src, new KList<T>(tag, attribs, childCtor, keyFn, equiv));

class KList<T> extends List<T> {
    constructor(
        tag: string,
        attribs: any,
        childCtor: Fn<T, IComponent>,
        protected keyFn: Fn<T, NumOrString>,
        equiv: Predicate2<T> = _equiv
    ) {
        super(tag, attribs, childCtor, equiv);
    }

    async update(curr: T[]) {
        if (curr) {
            const root = this.root!.el!;
            const children = this.children!;
            const edits = diffArray(
                this.items,
                curr,
                DiffMode.ONLY_DISTANCE_LINEAR_ONLY_CHANGES,
                this.equiv
            ).linear!;
            const keyFn = this.keyFn;
            const equivKeys = extractEquivElements(edits, keyFn);
            let offset = 0;
            // console.log(edits, equivKeys);
            for (let i = 0, n = edits.length; i < n; i += 3) {
                if (edits[i] < 0) {
                    const k = keyFn(<T>edits[i + 2]);
                    const ek = equivKeys[k];
                    if (ek[2] === undefined) {
                        const idx = <number>edits[i + 1] + offset;
                        // console.log("remove", k, idx, offset);
                        children[idx].unmount();
                        children.splice(idx, 1);
                        offset--;
                        // console.log(children.map((c) => (<any>c).$id));
                    } else {
                        const i1 = ek[0]! + offset;
                        const i2 = ek[2]!;
                        const child = children[i1];
                        // console.log(
                        //     "move",
                        //     k,
                        //     (<any>child).$id,
                        //     ek,
                        //     i1,
                        //     i2,
                        //     offset
                        // );
                        $move(child.el!, root, i2);
                        children.splice(i1, 1);
                        children.splice(i2, 0, child);
                        // console.log(children.map((c) => (<any>c).$id));
                        offset--;
                    }
                } else if (edits[i] > 0) {
                    const k = keyFn(<T>edits[i + 2]);
                    if (equivKeys[k][0] === undefined) {
                        const idx = <number>edits[i + 1];
                        // console.log("add", k, idx, offset);
                        const child = $compile(this.childCtor(<T>edits[i + 2]));
                        (<any>child).$id = k;
                        const el = await child.mount(root);
                        $move(el, root, idx);
                        children.splice(idx, 0, child);
                        offset++;
                        // console.log(children.map((c) => (<any>c).$id));
                    }
                }
            }
            // console.log(
            //     _equiv(
            //         this.children.map((c) => (<any>c).$id),
            //         curr
            //     )
            // );
            this.items = curr;
        }
    }
}

const extractEquivElements = <T>(edits: any[], keyFn: Fn<T, NumOrString>) => {
    let k: NumOrString;
    let ek: Nullable<number>[];
    const equiv: IObjectOf<Nullable<number>[]> = {};
    for (let i = edits.length; (i -= 3) >= 0; ) {
        if ((k = keyFn(edits[i + 2])) !== undefined) {
            ek = equiv[k];
            !ek && (equiv[k] = ek = [, ,]);
            ek[edits[i] + 1] = edits[i + 1];
        }
    }
    return equiv;
};
