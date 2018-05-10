import { ICopy } from "@thi.ng/api/api";
import { equiv } from "@thi.ng/equiv";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { EquivMap } from "@thi.ng/associative/equiv-map";
import { LLSet } from "@thi.ng/associative/ll-set";
import { union } from "@thi.ng/associative/union";
import { filter } from "@thi.ng/iterators/filter";
import { reduce } from "@thi.ng/iterators/reduce";

export class DGraph<T> implements
    Iterable<T>,
    ICopy<DGraph<T>> {

    dependencies: EquivMap<T, LLSet<T>>;
    dependents: EquivMap<T, LLSet<T>>;

    constructor() {
        this.dependencies = new EquivMap<T, LLSet<T>>();
        this.dependents = new EquivMap<T, LLSet<T>>();
    }

    *[Symbol.iterator]() {
        yield* this.sort();
    }

    get [Symbol.species]() {
        return DGraph;
    }

    copy() {
        const g = new DGraph<T>();
        for (let e of this.dependencies) {
            g.dependencies.set(e[0], e[1].copy());
        }
        for (let e of this.dependents) {
            g.dependents.set(e[0], e[1].copy());
        }
        return g;
    }

    addDependency(node: T, dep: T) {
        if (equiv(node, dep) || this.depends(dep, node)) {
            illegalArgs(`Circular dependency between: ${node} & ${dep}`);
        }
        let d: LLSet<T> = this.dependencies.get(node);
        this.dependencies.set(node, d ? d.add(dep) : new LLSet<T>([dep]));
        d = this.dependents.get(dep);
        this.dependents.set(dep, d ? d.add(node) : new LLSet<T>([node]));
        return this;
    }

    removeEdge(node: T, dep: T) {
        let d = this.dependencies.get(node);
        if (d) {
            d.delete(dep);
        }
        d = this.dependents.get(dep);
        if (d) {
            d.delete(node);
        }
        return this;
    }

    removeNode(x: T) {
        this.dependencies.delete(x);
        return this;
    }

    depends(x: T, y: T) {
        return this.transitiveDependencies(x).has(y);
    }

    dependent(x: T, y: T) {
        return this.transitiveDependents(x).has(y);
    }

    immediateDependencies(x: T): Set<T> {
        return this.dependencies.get(x) || new LLSet<T>();
    }

    immediateDependents(x: T): Set<T> {
        return this.dependents.get(x) || new LLSet<T>();
    }

    isLeaf(x: T) {
        return this.immediateDependents(x).size === 0;
    }

    isRoot(x: T) {
        return this.immediateDependencies(x).size === 0;
    }

    nodes(): Set<T> {
        return union(
            new LLSet<T>(this.dependencies.keys()),
            new LLSet<T>(this.dependents.keys()),
        );
    }

    leaves(): IterableIterator<T> {
        return filter((node: T) => this.isLeaf(node), this.nodes());
    }

    roots(): IterableIterator<T> {
        return filter((node: T) => this.isRoot(node), this.nodes());
    }

    transitiveDependencies(x: T) {
        return transitive(this.dependencies, x);
    }

    transitiveDependents(x: T) {
        return transitive(this.dependents, x);
    }

    sort() {
        const sorted: T[] = [];
        const g = this.copy();
        let queue = new LLSet(g.leaves());
        while (true) {
            if (!queue.size) {
                return sorted.reverse();
            }
            const node = queue.first();
            queue.delete(node);
            for (let d of [...g.immediateDependencies(node)]) {
                g.removeEdge(node, d);
                if (g.isLeaf(d)) {
                    queue.add(d);
                }
            }
            sorted.push(node);
            g.removeNode(node);
        }
    }
}

function transitive<T>(nodes: EquivMap<T, LLSet<T>>, x: T): LLSet<T> {
    const deps: LLSet<T> = nodes.get(x);
    if (deps) {
        return reduce(
            (acc, k: T) => <LLSet<T>>union(acc, transitive(nodes, k)),
            deps,
            deps
        );
    }
    return new LLSet<T>();
}
