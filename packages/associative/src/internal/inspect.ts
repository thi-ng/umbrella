import { mixin } from "@thi.ng/api/mixin";
import { isNode } from "@thi.ng/checks/is-node";
import { map } from "@thi.ng/transducers/map";

let inspect:
    | ((
          object: any,
          showHidden?: boolean,
          depth?: number | null,
          color?: boolean
      ) => string)
    | null = null;

isNode() &&
    import("util").then((m) => {
        inspect = m.inspect;
    });

const inspectSet = (coll: Set<any>, opts: any) =>
    [...map((x) => inspect!(x, opts), coll)].join(", ");

const inspectMap = (coll: Map<any, any>, opts: any) =>
    [
        ...map(
            ([k, v]) => `${inspect!(k, opts)} => ${inspect!(v, opts)}`,
            coll
        ),
    ].join(", ");

/**
 * NodeJS inspection mixin
 *
 * @remarks
 * Reference:
 * https://nodejs.org/api/util.html#util_custom_inspection_functions_on_objects
 *
 * @internal
 */
export const __inspectable = mixin({
    [Symbol.for("nodejs.util.inspect.custom")](depth: number, opts: any) {
        const name = this[Symbol.toStringTag];
        const childOpts = {
            ...opts,
            depth: opts.depth === null ? null : opts.depth - 1,
        };
        return depth >= 0
            ? [
                  `${name}(${this.size || 0}) {`,
                  inspect
                      ? this instanceof Set
                          ? inspectSet(this, childOpts)
                          : this instanceof Map
                          ? inspectMap(this, childOpts)
                          : ""
                      : "",
                  "}",
              ].join(" ")
            : opts.stylize(`[${name}]`, "special");
    },
});
