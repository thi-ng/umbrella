import { start } from "@thi.ng/hdom/start";

// stateless component w/ params
// the first arg is an auto-injected context object
// (not used here, see `hdom-context-basics` example for details)
const greeter = (_: any, name: string) => ["h1.title", "hello ", name];

// component w/ local state
const counter = (i = 0) => {
    return () => ["button", { onclick: () => i++ }, `clicks: ${i}`];
};

const app = () => {
    // initialization steps
    // ...
    // root component is just a static array
    return ["div#app", [greeter, "world"], counter(), counter(100)];
};

// start update loop (browser only, see diagram below)
start(app());

// alternatively apply DOM tree only once
// (stateful components won't update though)
// hdom.createDOM(document.body, hdom.normalizeTree(app()));
