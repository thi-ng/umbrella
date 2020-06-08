import { assert, FnO } from "@thi.ng/api";
import { peek } from "@thi.ng/arrays";
import { isArray } from "@thi.ng/checks";
import type { Path, ZipperOps } from "./api";

const newPath = <T>(
    l: T[] | undefined,
    r: T[] | undefined,
    path: Path<T> | undefined,
    nodes: T[],
    changed = false
): Path<T> => ({
    l,
    r,
    path,
    nodes,
    changed,
});

const changedPath = <T>(path?: Path<T>) =>
    path ? { ...path, changed: true } : undefined;

export class Location<T> {
    protected readonly _node: T;
    protected readonly _ops: ZipperOps<T>;
    protected readonly _path: Path<T> | undefined;

    constructor(node: T, ops: ZipperOps<T>, path?: Path<T>) {
        this._node = node;
        this._ops = ops;
        this._path = path;
    }

    get isBranch() {
        return this._ops.branch(this._node);
    }

    get isFirst() {
        return !this.lefts;
    }

    get isLast() {
        return !this.rights;
    }

    get depth() {
        let d = 0;
        let path = this._path;
        while (path) {
            d++;
            path = path.path;
        }
        return d;
    }

    get node() {
        return this._node;
    }

    get children() {
        return this._ops.children(this._node);
    }

    get path() {
        return this._path ? this._path.nodes : undefined;
    }

    get lefts() {
        return this._path ? this._path.l : undefined;
    }

    get rights() {
        return this._path ? this._path.r : undefined;
    }

    get left() {
        const path = this._path;
        const lefts = path && path.l;
        return lefts && lefts.length
            ? new Location(
                  peek(lefts),
                  this._ops,
                  newPath(
                      lefts.slice(0, lefts.length - 1),
                      [this._node].concat(path!.r || []),
                      path!.path,
                      path!.nodes,
                      path!.changed
                  )
              )
            : undefined;
    }

    get right() {
        const path = this._path;
        const rights = path && path.r;
        if (!rights) return;
        const r = rights.slice(1);
        return new Location(
            rights[0],
            this._ops,
            newPath(
                (path!.l || []).concat([this._node]),
                r.length ? r : undefined,
                path!.path,
                path!.nodes,
                path!.changed
            )
        );
    }

    get leftmost() {
        const path = this._path;
        const lefts = path && path.l;
        return lefts && lefts.length
            ? new Location(
                  lefts[0],
                  this._ops,
                  newPath(
                      undefined,
                      lefts.slice(1).concat([this._node], path!.r || []),
                      path!.path,
                      path!.nodes,
                      path!.changed
                  )
              )
            : this;
    }

    get rightmost() {
        const path = this._path;
        const rights = path && path.r;
        return rights
            ? new Location(
                  peek(rights),
                  this._ops,
                  newPath(
                      (path!.l || []).concat(
                          [this._node],
                          rights.slice(0, rights.length - 1)
                      ),
                      undefined,
                      path!.path,
                      path!.nodes,
                      path!.changed
                  )
              )
            : this;
    }

    get down() {
        if (!this.isBranch) return;
        const children = this.children;
        if (!children) return;
        const path = this._path;
        const r = children.slice(1);
        return new Location(
            children[0],
            this._ops,
            newPath(
                undefined,
                r.length ? r : undefined,
                path,
                path ? path.nodes.concat([this._node]) : [this._node]
            )
        );
    }

    get up() {
        let path = this._path;
        const pnodes = path && path.nodes;
        if (!pnodes) return;
        const pnode = peek(pnodes);
        if (path!.changed) {
            return new Location(
                this.newNode(
                    pnode,
                    (path!.l || []).concat([this._node], path!.r || [])
                ),
                this._ops,
                changedPath(path!.path)
            );
        } else {
            return new Location(pnode, this._ops, path!.path);
        }
    }

    get root(): T {
        const parent = this.up;
        return parent ? parent.root : this._node;
    }

    get prev() {
        let node = this.left;
        if (!node) return this.up;
        while (true) {
            const child: Location<T> | undefined = node!.isBranch
                ? this.down
                : undefined;
            if (!child) return node;
            node = child.rightmost;
        }
    }

    get next() {
        if (this.isBranch) return this.down;
        let right = this.right;
        if (right) return right;
        let loc: Location<T> = this;
        while (true) {
            const up = loc.up;
            if (!up) return;
            right = up.right;
            if (right) return right;
            loc = up;
        }
    }

    replace(x: T) {
        return new Location(x, this._ops, changedPath(this._path));
    }

    update(fn: FnO<T, T>, ...xs: any[]) {
        return this.replace(fn(this._node, ...xs));
    }

    insertLeft(x: T) {
        this.ensureNotRoot();
        const path = this._path;
        return new Location(
            this._node,
            this._ops,
            newPath(
                path!.l ? path!.l.concat([x]) : [x],
                path!.r,
                path!.path,
                path!.nodes,
                true
            )
        );
    }

    insertRight(x: T) {
        this.ensureNotRoot();
        const path = this._path;
        return new Location(
            this._node,
            this._ops,
            newPath(
                path!.l,
                [x].concat(path!.r || []),
                path!.path,
                path!.nodes,
                true
            )
        );
    }

    insertChild(x: T) {
        this.ensureBranch();
        return this.replace(this.newNode(this._node, [x, ...this.children]));
    }

    appendChild(x: T) {
        this.ensureBranch();
        return this.replace(
            this.newNode(this._node, this.children.concat([x]))
        );
    }

    remove() {
        this.ensureNotRoot();
        const path = this._path!;
        const lefts = path.l;
        if (lefts ? lefts.length : 0) {
            let loc = new Location(
                peek(lefts!),
                this._ops,
                newPath(
                    lefts!.slice(0, lefts!.length - 1),
                    path.r,
                    path.path,
                    path.nodes,
                    true
                )
            );
            while (true) {
                const child = loc.isBranch ? loc.down : undefined;
                if (!child) return loc;
                loc = child.rightmost;
            }
        }
        return new Location(
            this.newNode(peek(path.nodes), path.r || []),
            this._ops,
            changedPath(path.path)
        );
    }

    protected newNode(node: T, children: T[]) {
        return this._ops.factory(node, children);
    }

    protected ensureNotRoot() {
        assert(!!this._path, "can't insert at root level");
    }

    private ensureBranch() {
        assert(this.isBranch, "can only insert in branches");
    }
}

export const zipper = <T>(ops: ZipperOps<T>, node: T): Location<T> =>
    new Location<T>(node, ops);

export const arrayZipper = <T>(root: T[]) =>
    zipper<T | T[]>(
        {
            branch: isArray,
            children: (x) => <T[]>x,
            factory: (_, xs) => <T[]>xs,
        },
        root
    );
