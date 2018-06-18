import { IObjectOf } from "@thi.ng/api";
import * as fsm from "@thi.ng/transducers-fsm";
import { Transducer } from "@thi.ng/transducers/api";

export interface ParseOpts {
    entities: boolean;
}

export interface ParseElement {
    tag: string;
    attribs: IObjectOf<string>;
    body: string;
    children: ParseElement[];
}

export interface ParseEvent extends Partial<ParseElement> {
    type: Type;
}

export enum Type {
    PROC,
    DOCTYPE,
    COMMENT,
    ELEM_START,
    ELEM_END,
    ELEM_BODY,
    ERROR,
}

interface ParseState extends fsm.FSMState {
    scope: any[];
    tag: string;
    attribs: any;
    body: string;
    name: string;
    val: string;
    pos: number;
    quote: string;
    phase: number;
    isProc: boolean;
    opts: Partial<ParseOpts>;
}

enum State {
    WAIT,
    ERROR,
    MAYBE_ELEM,
    ELEM_START,
    ELEM_END,
    ELEM_SINGLE,
    ELEM_BODY,
    MAYBE_ATTRIB,
    ATTRIB_NAME,
    ATTRIB_VAL_START,
    ATTRIB_VALUE,
    MAYBE_INSTRUCTION,
    COMMENT,
    COMMENT_BODY,
    DOCTYPE,
    PROC_DECL,
    PROC_END,
}

const ENTITIES = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&apos;": "'",
};

const ENTITY_RE = new RegExp(`(${Object.keys(ENTITIES).join("|")})`, "g");

export const parse = (opts: Partial<ParseOpts> = {}): Transducer<string, ParseEvent> =>
    fsm.fsm({
        states: PARSER,
        init: () => (<ParseState>{
            state: State.WAIT,
            scope: [],
            pos: 0,
            opts,
        }),
        terminate: State.ERROR
    });

const isWS = (x: string) =>
    x == " " || x == "\t" || x == "\n" || x == "\r";

const isTagChar = (x: string) =>
    (x >= "A" && x <= "Z") ||
    (x >= "a" && x <= "z") ||
    (x >= "0" && x <= "9") ||
    x == "-" ||
    x == "_" ||
    x == ":";

const error = (s: ParseState, body: string) => {
    s.state = State.ERROR;
    return { type: Type.ERROR, body };
};

const unexpected = (s: ParseState, x: string) =>
    error(s, `unexpected char: '${x}' @ pos ${s.pos}`);

const replaceEntities = (x: string) => x.replace(ENTITY_RE, (y) => ENTITIES[y]);

const PARSER: fsm.FSMStateMap<ParseState, string, ParseEvent> = {

    [State.ERROR]: () => { },

    [State.WAIT]: (state, ch) => {
        state.pos++;
        if (!isWS(ch)) {
            if (ch === "<") {
                state.state = State.MAYBE_ELEM;
            } else {
                return unexpected(state, ch);
            }
        }
    },

    [State.MAYBE_ELEM]: (state, ch) => {
        state.pos++;
        if (ch === "/") {
            if (state.scope.length == 0) {
                return unexpected(state, ch);
            }
            state.state = State.ELEM_END;
            state.tag = "";
        } else if (isTagChar(ch)) {
            state.state = State.ELEM_START;
            state.tag = ch;
            state.attribs = {};
        } else if (ch === "!") {
            state.state = State.MAYBE_INSTRUCTION;
        } else if (ch === "?") {
            state.state = State.PROC_DECL;
            state.phase = 0;
            state.tag = "";
            state.body = "";
        } else {
            return unexpected(state, ch);
        }
    },

    [State.ELEM_START]: (state, ch) => {
        state.pos++;
        if (isTagChar(ch)) {
            state.tag += ch;
        } else if (isWS(ch)) {
            state.state = State.MAYBE_ATTRIB;
        } else if (ch === ">") {
            const res = { type: Type.ELEM_START, tag: state.tag, attribs: state.attribs };
            state.state = State.ELEM_BODY;
            state.scope.push({ tag: state.tag, attribs: state.attribs, children: [] });
            state.body = "";
            return res;
        } else if (ch === "/") {
            state.state = State.ELEM_SINGLE;
        } else {
            return unexpected(state, ch);
        }
    },

    [State.ELEM_END]: (state, ch) => {
        state.pos++;
        if (isTagChar(ch)) {
            state.tag += ch;
        } else if (ch === ">") {
            const n = state.scope.length;
            if (n > 0 && state.tag === state.scope[n - 1].tag) {
                const res = state.scope[n - 1];
                state.scope.pop();
                if (n > 1) {
                    state.scope[n - 2].children.push(res);
                }
                state.state = State.WAIT;
                return { type: Type.ELEM_END, ...res };
            } else {
                error(state, state.tag);
            }
        }
    },

    [State.ELEM_SINGLE]: (state, ch) => {
        state.pos++;
        if (ch === ">") {
            state.state = State.WAIT;
            const n = state.scope.length;
            const res = { tag: state.tag, attribs: state.attribs };
            if (n > 0) {
                state.scope[n - 1].children.push(res);
            }
            return { type: Type.ELEM_END, ...res };
        } else {
            return unexpected(state, ch);
        }
    },

    [State.ELEM_BODY]: (state, ch) => {
        state.pos++;
        if (ch === "<") {
            let res;
            if (state.body.length > 0) {
                if (state.opts.entities) {
                    state.body = replaceEntities(state.body);
                }
                state.scope[state.scope.length - 1].body = state.body;
                res = { type: Type.ELEM_BODY, tag: state.tag, body: state.body };
            }
            state.state = State.MAYBE_ELEM;
            state.tag = "";
            return res;
        } else {
            state.body += ch;
        }
    },

    [State.MAYBE_ATTRIB]: (state, ch) => {
        state.pos++;
        if (isTagChar(ch)) {
            state.state = State.ATTRIB_NAME;
            state.name = ch;
            state.val = "";
        } else {
            if (state.isProc) {
                if (ch === "?") {
                    state.state = State.PROC_END;
                } else if (!isWS(ch)) {
                    return unexpected(state, ch);
                }
            } else {
                if (ch === ">") {
                    const res = { type: Type.ELEM_START, tag: state.tag, attribs: state.attribs };
                    state.state = State.ELEM_BODY;
                    state.scope.push({ tag: state.tag, attribs: state.attribs, children: [] });
                    state.body = "";
                    return res;
                } else if (ch === "/") {
                    state.state = State.ELEM_SINGLE;
                } else if (!isWS(ch)) {
                    return unexpected(state, ch);
                }
            }
        }
    },

    [State.ATTRIB_NAME]: (state, ch) => {
        state.pos++;
        if (isTagChar(ch)) {
            state.name += ch;
        } else if (ch === "=") {
            state.state = State.ATTRIB_VAL_START;
        } else {
            return unexpected(state, ch);
        }
    },

    [State.ATTRIB_VAL_START]: (state, ch) => {
        state.pos++;
        if (ch === "\"" || ch === "'") {
            state.state = State.ATTRIB_VALUE;
            state.quote = ch;
        } else {
            return unexpected(state, ch);
        }
    },

    [State.ATTRIB_VALUE]: (state, ch) => {
        state.pos++;
        if (ch === state.quote) {
            if (state.opts.entities) {
                state.val = replaceEntities(state.val);
            }
            state.attribs[state.name] = state.val;
            state.state = State.MAYBE_ATTRIB;
        } else {
            state.val += ch;
        }
    },

    [State.MAYBE_INSTRUCTION]: (state, ch) => {
        state.pos++;
        if (ch === "-") {
            state.state = State.COMMENT;
        } else if (ch === "D") {
            state.state = State.DOCTYPE;
            state.phase = 1;
            state.body = "";
        } else {
            return unexpected(state, ch);
        }
    },

    [State.COMMENT]: (state, ch) => {
        state.pos++;
        if (ch === "-") {
            state.state = State.COMMENT_BODY;
            state.body = "";
        } else {
            return unexpected(state, ch);
        }
    },

    [State.COMMENT_BODY]: (state, ch) => {
        state.pos++;
        if (ch === ">") {
            const n = state.body.length;
            if (state.body.substr(n - 2) !== "--") {
                return unexpected(state, ch);
            }
            state.state = State.WAIT;
            return { type: Type.COMMENT, body: state.body.substr(0, n - 2) };
        } else {
            state.body += ch;
        }
    },

    [State.DOCTYPE]: (state, ch) => {
        state.pos++;
        if (state.phase < 8) {
            if (ch === "DOCTYPE "[state.phase]) {
                state.phase++;
            } else {
                return unexpected(state, ch);
            }
        } else if (ch === ">") {
            state.state = State.WAIT;
            return { type: Type.DOCTYPE, body: state.body.trim() };
        } else {
            state.body += ch;
        }
    },

    [State.PROC_DECL]: (state, ch) => {
        state.pos++;
        if (isTagChar(ch)) {
            state.tag += ch;
        } else if (isWS(ch)) {
            state.state = State.MAYBE_ATTRIB;
            state.isProc = true;
            state.attribs = {};
        } else {
            return unexpected(state, ch);
        }
    },

    [State.PROC_END]: (state, ch) => {
        state.pos++;
        if (ch === ">") {
            state.state = State.WAIT;
            state.isProc = false;
            return { type: Type.PROC, tag: state.tag, attribs: state.attribs };
        } else {
            return unexpected(state, ch);
        }
    },
};
