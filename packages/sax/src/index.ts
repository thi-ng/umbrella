import { Event } from "@thi.ng/api";
import * as fsm from "@thi.ng/transducers-fsm";
import { Transducer } from "@thi.ng/transducers/api";

export interface ParseState extends fsm.FSMState {
    pos: number;
    scope: any[];
    tag: string;
    body: string;
    attribs: any;
    name: string;
    val: string;
    quote: string;
    phase: number;
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

export const parse = (): Transducer<string, Event> =>
    fsm.fsm({
        states: PARSER,
        init: () => (<ParseState>{
            state: State.WAIT,
            scope: [],
            pos: 0
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

const unexpected = (s: ParseState, x: string) => {
    s.state = State.ERROR;
    return { id: "error", value: `unexpected char: '${x}' @ pos: ${s.pos}` };
};

const PARSER: fsm.FSMStateMap<ParseState, string, Event> = {
    [State.ERROR]: () => {
    },

    [State.WAIT]: (s: ParseState, x: string) => {
        s.pos++;
        if (!isWS(x)) {
            if (x === "<") {
                s.state = State.MAYBE_ELEM;
            } else {
                return unexpected(s, x);
            }
        }
    },

    [State.MAYBE_ELEM]: (s: ParseState, x: string) => {
        s.pos++;
        if (x === "/") {
            if (s.scope.length == 0) {
                return unexpected(s, x);
            }
            s.state = State.ELEM_END;
            s.tag = "";
        } else if (isTagChar(x)) {
            s.state = State.ELEM_START;
            s.tag = x;
            s.attribs = {};
        } else if (x === "!") {
            s.state = State.MAYBE_INSTRUCTION;
        } else if (x === "?") {
            s.state = State.PROC_DECL;
            s.phase = 0;
            s.body = "";
        } else {
            return unexpected(s, x);
        }
    },

    [State.ELEM_START]: (s: ParseState, x: string) => {
        s.pos++;
        if (isTagChar(x)) {
            s.tag += x;
        } else if (isWS(x)) {
            s.state = State.MAYBE_ATTRIB;
        } else if (x === ">") {
            const res = { id: "elem", value: { tag: s.tag, attribs: s.attribs } };
            s.state = State.ELEM_BODY;
            s.scope.push({ tag: s.tag, attribs: s.attribs, children: [] });
            s.body = "";
            return res;
        } else if (x === "/") {
            s.state = State.ELEM_SINGLE;
        } else {
            return unexpected(s, x);
        }
    },

    [State.ELEM_END]: (s: ParseState, x: string) => {
        s.pos++;
        if (isTagChar(x)) {
            s.tag += x;
        } else if (x === ">") {
            const n = s.scope.length;
            if (n > 0 && s.tag === s.scope[n - 1].tag) {
                const res = { id: "end", value: s.scope[n - 1] };
                s.scope.pop();
                if (n > 1) {
                    s.scope[n - 2].children.push(res.value);
                }
                s.state = State.WAIT;
                return res;
            } else {
                throw new Error(`unmatched end tag: ${s.tag}`);
            }
        }
    },

    [State.ELEM_SINGLE]: (s: ParseState, x: string) => {
        s.pos++;
        if (x === ">") {
            s.state = State.WAIT;
            const n = s.scope.length;
            const res = { tag: s.tag, attribs: s.attribs };
            if (n > 0) {
                s.scope[n - 1].children.push(res);
            }
            return { id: "elem", value: res };
        } else {
            return unexpected(s, x);
        }
    },

    [State.ELEM_BODY]: (s: ParseState, x: string) => {
        s.pos++;
        if (x === "<") {
            let res;
            if (s.body.length > 0) {
                s.scope[s.scope.length - 1].body = s.body;
                res = { id: "body", value: { tag: s.tag, body: s.body } }
            }
            s.state = State.MAYBE_ELEM;
            s.tag = "";
            return res;
        } else {
            s.body += x;
        }
    },

    [State.MAYBE_ATTRIB]: (s: ParseState, x: string) => {
        s.pos++;
        if (isTagChar(x)) {
            s.state = State.ATTRIB_NAME;
            s.name = x;
            s.val = "";
        } else if (x === ">") {
            const res = { id: "elem", value: { tag: s.tag, attribs: s.attribs } };
            s.state = State.ELEM_BODY;
            s.scope.push({ tag: s.tag, attribs: s.attribs, children: [] });
            s.body = "";
            return res;
        } else if (x === "/") {
            s.state = State.ELEM_SINGLE;
        } else if (s.tag === "xml" && x === "?") {
            s.state = State.PROC_END;
        } else if (!isWS(x)) {
            return unexpected(s, x);
        }
    },

    [State.ATTRIB_NAME]: (s: ParseState, x: string) => {
        s.pos++;
        if (isTagChar(x)) {
            s.name += x;
        } else if (x === "=") {
            s.state = State.ATTRIB_VAL_START;
        } else {
            return unexpected(s, x);
        }
    },

    [State.ATTRIB_VAL_START]: (s: ParseState, x: string) => {
        s.pos++;
        if (x === "\"" || x === "'") {
            s.state = State.ATTRIB_VALUE;
            s.quote = x;
        } else {
            return unexpected(s, x);
        }
    },

    [State.ATTRIB_VALUE]: (s: ParseState, x: string) => {
        s.pos++;
        if (x === s.quote) {
            s.attribs[s.name] = s.val;
            s.state = State.MAYBE_ATTRIB;
        } else {
            s.val += x;
        }
    },

    [State.MAYBE_INSTRUCTION]: (s: ParseState, x: string) => {
        s.pos++;
        if (x === "-") {
            s.state = State.COMMENT;
        } else if (x === "D") {
            s.state = State.DOCTYPE;
            s.phase = 1;
            s.body = "";
        } else {
            return unexpected(s, x);
        }
    },

    [State.COMMENT]: (s: ParseState, x: string) => {
        s.pos++;
        if (x === "-") {
            s.state = State.COMMENT_BODY;
            s.body = "";
        } else {
            return unexpected(s, x);
        }
    },

    [State.COMMENT_BODY]: (s: ParseState, x: string) => {
        s.pos++;
        if (x === ">") {
            const n = s.body.length;
            if (s.body.substr(n - 2) !== "--") {
                return unexpected(s, x);
            }
            s.state = State.WAIT;
            return { id: "comment", value: s.body.substr(0, n - 2) };
        } else {
            s.body += x;
        }
    },

    [State.DOCTYPE]: (s: ParseState, x: string) => {
        s.pos++;
        if (s.phase < 8) {
            if (x === "DOCTYPE "[s.phase]) {
                s.phase++;
            } else {
                return unexpected(s, x);
            }
        } else if (x === ">") {
            s.state = State.WAIT;
            return { id: "doctype", value: s.body.trim() };
        } else {
            s.body += x;
        }
    },

    [State.PROC_DECL]: (s: ParseState, x: string) => {
        s.pos++;
        if (x === "xml "[s.phase]) {
            s.phase++;
            if (s.phase == 4) {
                s.state = State.MAYBE_ATTRIB;
                s.tag = "xml";
                s.attribs = {};
            }
        } else {
            return unexpected(s, x);
        }
    },

    [State.PROC_END]: (s: ParseState, x: string) => {
        s.pos++;
        if (x === ">") {
            s.state = State.WAIT;
            return { id: "proc", value: { tag: s.tag, attribs: s.attribs } };
        } else {
            return unexpected(s, x);
        }
    },
};
