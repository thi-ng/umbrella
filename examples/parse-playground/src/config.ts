import type { IObjectOf } from "@thi.ng/api";
import type { EditorOpts } from "@thi.ng/rdom-components";
import type { CodeTemplate, Status } from "./api";

const REPO_URL = "https://github.com/thi-ng/umbrella/tree/develop/";
export const DOC_URL = REPO_URL + "packages/parse#readme";
export const SRC_URL = REPO_URL + "examples/parse-playground";

export const CODE_TEMPLATES: IObjectOf<CodeTemplate> = {
    js: {
        name: "JavaScript (ESM)",
        ext: "js",
        code: `// Downloaded @ {1}
// Source: {0}

import { defContext } from "@thi.ng/parse/context";
import { defGrammar } from "@thi.ng/parse/grammar";

export const lang = defGrammar(\`\n{2}\n\`);

export const parse = (src, opts) => {
    const ctx = defContext(src, opts);
    return { result: lang.rules.{3}(ctx), ctx };
};`,
    },

    ts: {
        name: "TypeScript",
        ext: "ts",
        code: `// Downloaded @ {1}
// Source: {0}

import type { ContextOpts } from "@thi.ng/parse";
import { defContext } from "@thi.ng/parse/context";
import { defGrammar } from "@thi.ng/parse/grammar";

export const lang = defGrammar(\`\n{2}\n\`);

export const parse = (src: string, opts?: Partial<ContextOpts>) => {
    const ctx = defContext(src, opts);
    return { result: lang!.rules.{3}(ctx), ctx };
};`,
    },
};

export const DEFAULT_GRAMMAR = `# grammar rules...
list: '('! <expr> ')'! ;
sym: ( <ALPHA_NUM> | [?!$+\\u002d*/.~#^=<>] )+ => join ;
expr: ( <FLOAT> | <STRING> | <sym> | <list> | <WS1> )* ;
main: <START> <expr> <END> => hoist ;
`;

export const DEFAULT_RULE = "main";

export const DEFAULT_INPUTS = [
    `(def hello (x) (str "hello, " x))
(print (hello -12.3))`,
    "(hello world)",
    "intentionally left blank",
];

export const LINK_CLASSES = "link blue";

export const BUTTON_CLASSES =
    "pa2 db w-100 bg-blue hover-bg-dark-blue bg-animate white bn pointer";

export const PANEL_CLASSES = "w-100 pa2 code f7 lh-copy bg-animate";

export const EDITOR_OPTS: Partial<EditorOpts> = {
    wrapper: { class: "relative" },
    editor: { attribs: { class: PANEL_CLASSES + " editor", rows: 16 } },
    cursor: {
        attribs: {
            class: "absolute top-0 right-0 z1 pa2 br3 br--left br--bottom bg-light-gray gray tr f7",
        },
    },
};

export const DROPDOWN_ATTRIBS = { class: "db w-100 mb2 pa2" };

export const BG_COLS: Record<Status, string> = {
    ok: "bg-washed-green dark-green",
    partial: "bg-washed-yellow orange",
    fail: "bg-washed-red dark-red",
    err: "bg-light-red white",
};

export const TAB_CLASSES = ".dib.w3.pa2.mr2.br3.br--top.pointer";
