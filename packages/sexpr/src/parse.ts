import { assert } from "@thi.ng/api";
import {
    DEFAULT_SYNTAX,
    Expression,
    Node,
    RootNode,
    SyntaxOpts
} from "./api";

export const parse = (tokens: Iterable<string>, opts?: Partial<SyntaxOpts>) => {
    const { scopeOpen, scopeClose } = {
        ...DEFAULT_SYNTAX,
        ...opts
    };
    const tree: Node[] = [{ type: "root", children: [] }];
    for (let t of tokens) {
        if (scopeOpen.indexOf(t) !== -1) {
            tree.push({ type: "expr", value: t, children: [] });
        } else if (scopeClose.indexOf(t) !== -1) {
            // TODO check matching scope type
            assert(tree.length > 1, "invalid nesting");
            (<Expression>tree[tree.length - 2]).children!.push(tree.pop()!);
        } else {
            let node: Node;
            let value: number;
            if (t.startsWith('"')) {
                node = { type: "str", value: t.substring(1, t.length - 1) };
            } else if (
                (t.startsWith("0x") &&
                    !isNaN((value = parseInt(t.substr(2), 16)))) ||
                !isNaN((value = parseFloat(t)))
            ) {
                node = { type: "num", value };
            } else {
                node = { type: "sym", value: t };
            }
            (<Expression>tree[tree.length - 1]).children!.push(node);
        }
    }
    return <RootNode>tree[0];
};
