import { start } from "@thi.ng/hdom";

// stateless component w/ params
// the first arg is an auto-injected context object
// (not used here, see `hdom-context-basics` example for details)
const greeter = (_, name) => ["h1.title", "hello ", name];

// counter component w/ local state
const counter = (i = 0) => {
    const attribs = { onclick: () => (i++) };
    return () => ["button", attribs, `clicks: ${i}`];
};

// root component is a simple array
const app = ["div#app", [greeter, "world"], counter(), counter(100)];

start(document.body, app);
