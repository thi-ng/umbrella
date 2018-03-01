import { IDeref, IID, IRelease } from "@thi.ng/api/api";
import { equiv as _equiv } from "@thi.ng/api/equiv";
import { ReadonlyAtom, ViewTransform } from "./api";
import { getter, toPath } from "./path";

export class View<A, B> implements
    IDeref<B>,
    IID<string>,
    IRelease {

    static NEXT_ID = 0;

    readonly id: string;

    readonly parent: ReadonlyAtom<A>;
    readonly path: PropertyKey[];

    protected state: B;
    protected tx: ViewTransform<A, B>;
    protected unprocessed: A;
    protected isDirty: boolean;

    constructor(parent: ReadonlyAtom<A>, path: PropertyKey | PropertyKey[], tx?: ViewTransform<A, B>, equiv = _equiv) {
        this.parent = parent;
        this.id = `view-${View.NEXT_ID++}`;
        this.tx = tx || ((x: any) => x);
        this.path = toPath(path);
        this.isDirty = true;
        const lookup = getter(this.path);
        const state = this.parent.deref();
        this.unprocessed = state ? lookup(state) : undefined;
        parent.addWatch(this.id, (_, prev, curr) => {
            const pval: A = prev ? lookup(prev) : prev;
            const val: A = curr ? lookup(curr) : curr;
            if (!equiv(val, pval)) {
                this.unprocessed = val;
                this.isDirty = true;
            }
        });
    }

    deref() {
        if (this.isDirty) {
            this.state = this.tx(this.unprocessed);
            this.unprocessed = undefined;
            this.isDirty = false;
        }
        return this.state;
    }

    /**
     * Like `deref()`, but doesn't update view's cached state
     * and dirty flag if value has changed. If there's an unprocessed
     * value change, returns result of this sub's transformer or else
     * the cached value.
     *
     * **Important:** Use this function only if the view's transformer
     * is stateless or else might cause undefined/inconsistent
     * behavior when calling deref() subsequently.
     */
    view() {
        return this.isDirty ? this.tx(this.unprocessed) : this.state;
    }

    release() {
        this.unprocessed = undefined;
        this.isDirty = true;
        return this.parent.removeWatch(this.id);
    }

    changed() {
        return this.isDirty;
    }
}
