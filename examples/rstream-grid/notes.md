# Rewire dataflow

```ts
export const useScale = (graph: IObjectOf<ISubscribable<any>>, bus: EventBus) => {
    const node = rsg.addNode(graph, bus.state, "scale", {
        fn: scale,
        ins: {
            shapes: { stream: "grid" },
            scale: { path: "params.scale" },
        }
    });
    (<StreamSync<any, any>>graph.svg).removeID("shapes");
    (<StreamSync<any, any>>graph.svg).add(node.subscribe(null, "shapes"));
};
```