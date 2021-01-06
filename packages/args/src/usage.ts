import type { IObjectOf } from "@thi.ng/api";
import { format, padRight, repeat } from "@thi.ng/strings";
import type { Args, UsageOpts } from "./api";

export const wordWrap = (opts: UsageOpts) => (str: string) => {
    let ln = 0;
    let curr: string[] = [];
    const res: string[] = [];
    const num = opts.lineWidth - opts.colWidth;
    for (let w of str.split(" ")) {
        if (ln + w.length + 1 <= num) {
            curr.push(w);
            ln += w.length + (ln > 0 ? 1 : 0);
        } else {
            res.push(curr.join(" "));
            curr = [w];
            ln = w.length;
        }
    }
    ln && res.push(curr.join(" "));
    return res
        .map((l, i) => (i > 0 ? repeat(" ", opts.colWidth) : "") + l)
        .join("\n");
};

export const usage = <T extends IObjectOf<any>>(
    specs: Args<T>,
    opts: Partial<UsageOpts> = {}
) => {
    opts = { lineWidth: 72, colWidth: 32, ...opts };
    return Object.keys(specs)
        .sort()
        .map((id) => {
            const spec = specs[id];
            const hint = spec.hint ? " " + spec.hint.toUpperCase() : "";
            const alias = spec.alias ? `-${spec.alias}${hint}, ` : "";
            id = `--${id}${hint}`;
            const res: string = format(
                [padRight(opts.colWidth!), wordWrap(<UsageOpts>opts)],
                `${alias}${id}`,
                (spec.optional === false ? "[required] " : "") +
                    (spec.desc || "")
            );
            return res;
        })
        .join("\n");
};
