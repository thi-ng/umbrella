import { Event, IObjectOf } from "@thi.ng/api";
import { Transducer, Reducer } from "@thi.ng/transducers/api";

export interface FSMState {
    state: PropertyKey;
}

export type FSMStateMap<T extends FSMState, A, B> = IObjectOf<FSMHandler<T, A, B>>;
export type FSMHandler<T extends FSMState, A, B> = (state: T, input: A) => B | void;

export function fsm<T extends FSMState, A, B>(states: FSMStateMap<T, A, B>, initial: () => T): Transducer<A, B> {
    return (rfn: Reducer<any, B>) => {
        let state = initial();
        const r = rfn[2];
        return [
            rfn[0],
            (acc) => rfn[1](acc),
            (acc, x) => {
                // console.log(state.state, x, state);
                const res = states[<any>state.state](state, x);
                if (res) {
                    acc = r(acc, res);
                }
                return acc;
            }];
    }
}

const isWS = (x: string) =>
    x == " " || x == "\t" || x == "\n" || x == "\r";

const isTagChar = (x: string) =>
    (x >= "A" && x <= "Z") ||
    (x >= "a" && x <= "z") ||
    (x >= "0" && x <= "9") ||
    x == "-" ||
    x == "_" ||
    x == ":";

const unexpected = (x) => { throw new Error(`unexpected char: ${x}`); };

export interface ParseState extends FSMState {
    scope: string[];
    tag: string;
    body: string;
    attribs: any;
    name: string;
    val: string;
}

enum State {
    WAIT,
    MAYBE_ELEM,
    ELEM_START,
    ELEM_END,
    ELEM_SINGLE,
    ELEM_BODY,
    MAYBE_ATTRIB,
    ATTRIB_NAME,
    ATTRIB_VAL_START,
    ATTRIB_VALUE
}


export const PARSER: FSMStateMap<ParseState, string, Event> = {
    [State.WAIT]: (s: ParseState, x: string) => {
        if (!isWS(x)) {
            if (x == "<") {
                s.state = State.MAYBE_ELEM;
            } else {
                unexpected(x);
            }
        }
    },

    [State.MAYBE_ELEM]: (s: ParseState, x: string) => {
        if (x == "/") {
            if (s.scope.length == 0) {
                unexpected(x);
            }
            s.state = State.ELEM_END;
            s.tag = "";
        } else if (isTagChar(x)) {
            s.state = State.ELEM_START;
            s.tag = x;
            s.attribs = {};
        } else {
            unexpected(x);
        }
    },

    [State.ELEM_START]: (s: ParseState, x: string) => {
        if (isTagChar(x)) {
            s.tag += x;
        } else if (isWS(x)) {
            s.state = State.MAYBE_ATTRIB;
        } else if (x == ">") {
            const res = { id: "elem", value: { tag: s.tag, attribs: s.attribs } };
            s.state = State.ELEM_BODY;
            s.scope.push(s.tag);
            s.body = "";
            return res;
        } else if (x == "/") {
            s.state = State.ELEM_SINGLE;
        } else {
            unexpected(x);
        }
    },

    [State.ELEM_END]: (s: ParseState, x: string) => {
        if (isTagChar(x)) {
            s.tag += x;
        } else if (x == ">") {
            if (s.tag == s.scope[s.scope.length - 1]) {
                const res = { id: "end", value: { tag: s.tag } };
                s.scope.pop();
                s.state = State.WAIT;
                return res;
            } else {
                throw new Error(`unmatched end tag: ${s.tag}`);
            }
        }
    },

    [State.ELEM_SINGLE]: (s: ParseState, x: string) => {
        if (x == ">") {
            s.state = State.WAIT;
            return { id: "start", value: { tag: s.tag, attribs: s.attribs } };
        } else {
            unexpected(x);
        }
    },

    [State.ELEM_BODY]: (s: ParseState, x: string) => {
        if (x == "<") {
            const res = s.body.length > 0 ?
                { id: "body", value: s.body } :
                undefined;
            s.state = State.MAYBE_ELEM;
            s.tag = "";
            return res;
        } else {
            s.body += x;
        }
    },

    [State.MAYBE_ATTRIB]: (s: ParseState, x: string) => {
        if (isTagChar(x)) {
            s.state = State.ATTRIB_NAME;
            s.name = x;
            s.val = "";
        } else if (x == ">") {
            const res = { id: "elem", value: { tag: s.tag, attribs: s.attribs } };
            s.state = State.ELEM_BODY;
            s.scope.push(s.tag);
            s.body = "";
            return res;
        } else if (x == "/") {
            s.state = State.ELEM_SINGLE;
        } else if (!isWS(x)) {
            unexpected(x);
        }
    },

    [State.ATTRIB_NAME]: (s: ParseState, x: string) => {
        if (isTagChar(x)) {
            s.name += x;
        } else if (x == "=") {
            s.state = State.ATTRIB_VAL_START;
        } else {
            unexpected(x);
        }
    },

    [State.ATTRIB_VAL_START]: (s: ParseState, x: string) => {
        if (x == "\"") {
            s.state = State.ATTRIB_VALUE;
        } else {
            unexpected(x);
        }
    },

    [State.ATTRIB_VALUE]: (s: ParseState, x: string) => {
        if (x == "\"") {
            s.attribs[s.name] = s.val;
            s.state = State.MAYBE_ATTRIB;
        } else {
            s.val += x;
        }
    },
}