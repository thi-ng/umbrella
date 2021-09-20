import { isString } from "@thi.ng/checks/is-string";
import {
    ASTNode,
    DEFAULT_SYNTAX,
    Expression,
    Root,
    SyntaxOpts,
    Token,
} from "./api";
import { tokenize } from "./tokenize";

export class ParseError extends Error {
    line: number;
    col: number;

    constructor(msg: string, line: number, col: number) {
        super(msg);
        this.line = line;
        this.col = col;
    }
}

/**
 * Takes a `src` string or {@link Token} iteratable and parses it into
 * an AST, then returns tree's root node. Throws {@link ParseError} if
 * the token order causes illegal nesting. The error includes `line` and
 * `column` information of the offending token.
 *
 * @param src -
 * @param opts -
 */
export const parse = (
    src: string | Iterable<Token>,
    opts?: Partial<SyntaxOpts>
) => {
    const { scopes } = {
        ...DEFAULT_SYNTAX,
        ...opts,
    };
    const scopeOpen = scopes.map((x) => x[0]);
    const scopeClose = scopes.map((x) => x[1]);
    const tree: ASTNode[] = [{ type: "root", children: [] }];
    let currScope = -1;
    for (let token of isString(src) ? tokenize(src, opts) : src) {
        const t = token.value;
        let tmp: number;
        if ((tmp = scopeOpen.indexOf(t)) !== -1) {
            tree.push({ type: "expr", value: t, children: [] });
            currScope = tmp;
        } else if ((tmp = scopeClose.indexOf(t)) !== -1) {
            if (tree.length < 2 || currScope !== tmp) {
                throw new ParseError(`unmatched '${t}'`, token.line, token.col);
            }
            (<Expression>tree[tree.length - 2]).children!.push(tree.pop()!);
            currScope = scopeOpen.indexOf(
                (<Expression>tree[tree.length - 1]).value
            );
        } else {
            let node: ASTNode;
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
    if (tree.length > 1) {
        throw new ParseError("unclosed s-expression", -1, -1);
    }
    return <Root>tree[0];
};
