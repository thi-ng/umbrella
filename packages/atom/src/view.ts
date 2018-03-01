import { equiv as _equiv } from "@thi.ng/api/equiv";
import { IView, Path, ReadonlyAtom, ViewTransform } from "./api";
import { getter, toPath } from "./path";

export class View<T> implements
    IView<T> {

    static NEXT_ID = 0;

    readonly id: string;

    readonly parent: ReadonlyAtom<any>;
    readonly path: PropertyKey[];

    protected state: T;
    protected tx: ViewTransform<T>;
    protected unprocessed: any;
    protected isDirty: boolean;

    constructor(parent: ReadonlyAtom<any>, path: Path, tx?: ViewTransform<T>, equiv = _equiv) {
        this.parent = parent;
        this.id = `view-${View.NEXT_ID++}`;
        this.tx = tx || ((x: any) => x);
        this.path = toPath(path);
        this.isDirty = true;
        const lookup = getter(this.path);
        const state = this.parent.deref();
        this.unprocessed = state ? lookup(state) : undefined;
        parent.addWatch(this.id, (_, prev, curr) => {
            const pval: T = prev ? lookup(prev) : prev;
            const val: T = curr ? lookup(curr) : curr;
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

    changed() {
        return this.isDirty;
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
}
