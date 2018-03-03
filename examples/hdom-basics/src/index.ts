import { start } from "@thi.ng/hdom";

// stateless component w/ params
const greeter = (name) => ["h1.title", "hello ", name];

// component w/ local state
const counter = () => {
    let i = 0;
    return () => ["button", { onclick: () => (i++) }, `clicks: ${i}`];
};

const app = () => {
    // instantiation
    const counters = [counter(), counter()];
    // root component is just a static array
    return ["div#app", [greeter, "world"], ...counters];
};

start(document.body, app());
