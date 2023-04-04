<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

{{meta.status}}

{{repo.supportPackages}}

{{repo.relatedPackages}}

{{meta.blogPosts}}

## Installation

{{pkg.install}}

{{pkg.size}}

## Dependencies

{{pkg.deps}}

{{repo.examples}}

## API

{{pkg.docs}}

```ts tangle:export/readme.ts
import { fromIterable, merge, trace } from "@thi.ng/rstream";
import { serialize } from "@thi.ng/rstream-dot";

// create dummy dataflow
const a = fromIterable([1, 2, 3]);
const b = fromIterable([10, 20, 30]);
a.map((x) => x * 10, { id: "x10" });
merge({ src: [a, b] }).subscribe(trace());

// now capture the topology by walking the graph from its root(s)
// and convert the result to GraphViz DOT format
console.log(serialize([a, b]));
```

Resulting output:

```dot tangle:export/readme.dot
digraph g {
rankdir=LR;
node[fontname="sans-serif",fontsize=10,style=filled,fontcolor=white];
edge[fontname="sans-serif",fontsize=10];
s0[label="iterable-0\n(Stream)", color="blue"];
s1[label="x10", color="black"];
s2[label="in-iterable-0", color="black"];
s3[label="streammerge-2\n(StreamMerge)", color="red"];
s4[label="sub-3", color="black"];
s5[label="iterable-1\n(Stream)", color="blue"];
s6[label="in-iterable-1", color="black"];
s3 -> s4;
s2 -> s3;
s0 -> s1[label="xform"];
s0 -> s2;
s6 -> s3;
s5 -> s6;
}
```

Copy output to file `graph.dot` and then run:

```bash
dot -Tsvg -o graph.svg graph.dot
```

This will generate this diagram:

![graphviz output](../../assets/examples/rs-dot-example.svg)

<!-- include ../../assets/tpl/footer.md -->
