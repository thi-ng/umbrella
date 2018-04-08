import { start } from "@thi.ng/hdom";

// static component function to create styled box
const box = (prefix, body) =>
    ["div",
        {
            style: {
                display: "inline-block",
                background: "#ccc",
                width: "30%",
                height: "40px",
                padding: "4px",
                margin: "2px",
                "text-align": "center"
            }
        },
        ["strong", prefix], ["br"], body];

// stateful component function
const counter = (id, from = 0, step = 1) => () => box(id, (from += step).toLocaleString());

// dynamic component function (external state, i.e. date)
const timer = () => box("time", new Date().toLocaleTimeString());

// application root component closure
// initializes stateful components
const app = (() => {
    const users = counter("users");
    const profits = counter("$$$", 1e6, 99);
    return () => ["div", ["h1", "Dashboard"], users, profits, timer];
})();

// start update loop (RAF)
start("app", app);
