import { Reducer } from "../api";

export function join(sep = ""): Reducer<string, any> {
    return [
        () => <any>[],
        (acc) => (<any>acc).join(sep),
        (acc, x) => ((<any>acc).push(x), acc),
    ];
}
