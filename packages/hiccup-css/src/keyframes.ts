import { CSSOpts } from "./api";
import { formatDecls } from "./css";
import { indent } from "./utils";

export function at_keyframes(id: string, stops: any);
export function at_keyframes(id: string, from: any, to: any);
export function at_keyframes(id: string, ...args: any[]) {
    const stops = args.length === 1 ? args[0] : { from: args[0], to: args[1] };
    return (acc: string[], opts: CSSOpts) => {
        const outer = indent(opts);
        opts.depth++;
        const inner = indent(opts);
        acc.push(`${outer}@keyframes ${id}${opts.format.declStart}`);
        for (let s in stops) {
            if (stops.hasOwnProperty(s)) {
                acc.push([
                    inner, s, opts.format.declStart,
                    formatDecls(stops[s], opts),
                    inner, opts.format.declEnd
                ].join(""));
            }
        }
        opts.depth--;
        acc.push(outer + opts.format.declEnd);
        return acc;
    };
}
