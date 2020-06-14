import { start } from "@thi.ng/hdom";

const timer = (period: number, name = `${period}ms`) => {
    return <any>{
        // life cycle init method
        // called when the component is being added to the real DOM
        init() {
            this.inited = true;
            this.val = 0;
        },
        render() {
            // Key part of this example:

            // Here we check the current time stamp for timer
            // `period` crossings and only return an actual new
            // tree/content iff the time stamp is within 16ms of the
            // period (i.e. in the 1 frame following the timer
            // period). In all other cases, we return some dummy
            // content with the root element using the hdom `__skip`
            // control attribute to skip diffing of this branch and
            // not apply the given tree/branch.

            // IMPORTANT: the element type of the skipped branch MUST
            // match the type of the real content (e.g. here `div`)
            const t = Date.now();
            return !this.inited || t % period < 16
                ? ["div.sans-serif", `${name} @ ${this.val++ || 0}`]
                : // dummy content (could be an empty div)
                  ["div", { __skip: true }, "I should be never seen"];
        },
    };
};

// root component object w/ life cycle methods
const app = <any>{
    init() {
        // create timer component instances
        this.timers = [[timer(1000)], [timer(500)], [timer(250)]];
    },
    render() {
        return [
            "div.ma3.sans-serif",
            ["h1", "Selective component updates"],
            this.timers,
            [
                "a.db.mt3.link",
                {
                    href:
                        "https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-skip",
                },
                "Source code",
            ],
        ];
    },
};

// kick off
const cancel = start([app]);

// HMR handling
if (process.env.NODE_ENV !== "production") {
    const hot = (<any>module).hot;
    hot && hot.dispose(cancel);
}
