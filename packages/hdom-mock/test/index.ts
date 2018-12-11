import * as assert from "assert";
import { HDOMNode, MockImpl } from "../src/index";

describe("hdom-mock", () => {

    it("node", () => {
        const a = new HDOMNode("div");
        const impl = new MockImpl(a);
        impl.createTextElement(a, "foo");
        a.appendChild(new HDOMNode("span"));
        impl.createTextElement(a, "bar");
        assert.deepEqual(a.toHiccup(), ["div", {}, "foo", ["span", {}], "bar"]);
        assert.deepEqual(impl.getChild(a, 0).toHiccup(), ["span", {}]);
        a.textContent = "foobar";
        assert.strictEqual(impl.getChild(a, 0), undefined);
        assert.deepEqual(a.toHiccup(), ["div", {}, "foobar"]);
    });

    it("basic diff", () => {
        const opts = { ctx: { button: { class: "bt" } } };
        const app = new HDOMNode("root");
        const impl = new MockImpl(app);
        const a = impl.normalizeTree(opts, ["div#foo.bar", [(ctx, label) => ["button", { ...ctx.button }, label], "hi"]]);
        const b = impl.normalizeTree(opts, ["div#foo2.bar.baz", [(ctx, label) => ["button", { ...ctx.button }, label], "hello"], ["div", "extra"]]);
        const c = impl.normalizeTree(opts, ["div#foo3.baz.bux", ["div", "extra"]]);
        impl.diffTree(opts, app, [], a);
        assert.deepEqual(app.toHiccup(),
            ["root", {},
                ["div", { id: "foo", class: "bar", key: "0" },
                    ["button", { class: "bt", key: "0-0" }, "hi"]]]
        );
        impl.diffTree(opts, app, a, b);
        assert.deepEqual(app.toHiccup(),
            ["root", {},
                ["div", { id: "foo2", class: "bar baz", key: "0" },
                    ["button", { class: "bt", key: "0-0" }, "hello"],
                    ["div", { key: "0-1" }, ["span", { key: "0-1-0" }, "extra"]]]]
        );
        impl.diffTree(opts, app, b, c);
        assert.deepEqual(app.toHiccup(),
            ["root", {},
                ["div", { id: "foo3", class: "baz bux", key: "0" },
                    ["div", { key: "0-0" }, ["span", { key: "0-0-0" }, "extra"]]]]
        );
    });
});
