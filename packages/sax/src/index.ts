import { Event, IObjectOf } from "@thi.ng/api";
import { Transducer, Reducer } from "@thi.ng/transducers/api";

export interface FSMState {
    state: PropertyKey;
}

export type FSMStateMap<T extends FSMState, A, B> = IObjectOf<FSMHandler<T, A, B>>;
export type FSMHandler<T extends FSMState, A, B> = (state: T, input: A) => B;

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

export interface ParseState extends FSMState {
    scope: string[];
    tag: string;
    body: string;
    attribs: any;
    phase: number;
    name: string;
    val: string;
}

export enum State {
    WAIT,
    ELEM,
    ELEM_BODY,
    ATTRIB,
}

const unexpected = (x) => { throw new Error(`unexpected char: ${x}`); };

export const PARSER: FSMStateMap<ParseState, string, Event> = {
    [State.WAIT]: (s: ParseState, x: string) => {
        if (isWS(x)) {
            return null;
        } else if (x == "<") {
            s.state = State.ELEM;
            s.phase = 0;
        } else {
            unexpected(x);
        }
    },

    [State.ELEM]: (s: ParseState, x: string) => {
        switch (s.phase) {
            case 0:
                if (x == "/") {
                    if (s.scope.length == 0) {
                        unexpected(x);
                    }
                    s.tag = "";
                    s.phase = 1;
                } else if (isTagChar(x)) {
                    s.tag = x;
                    s.attribs = {};
                    s.phase = 2;
                } else {
                    unexpected(x);
                }
                break;
            // end
            case 1:
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
                break;
            // start
            case 2:
                if (isTagChar(x)) {
                    s.tag += x;
                } else if (isWS(x)) {
                    s.state = State.ATTRIB;
                    s.phase = 0;
                } else if (x == ">") {
                    const res = { id: "elem", value: { tag: s.tag, attribs: s.attribs } };
                    s.scope.push(s.tag);
                    s.state = State.ELEM_BODY;
                    s.body = "";
                    return res;
                } else if (x == "/") {
                    s.phase = 3;
                } else {
                    unexpected(x);
                }
                break;
            case 3:
                if (x == ">") {
                    s.state = State.WAIT;
                    return { id: "start", value: { tag: s.tag, attribs: s.attribs } };
                } else {
                    unexpected(x);
                }
                break;
        }
    },


    [State.ELEM_BODY]: (s: ParseState, x: string) => {
        if (x == "<") {
            const res = s.body.length > 0 ?
                { id: "body", value: s.body } :
                undefined;
            s.state = State.ELEM;
            s.tag = "";
            s.phase = 0;
            return res;
        } else {
            s.body += x;
        }
    },

    [State.ATTRIB]: (s: ParseState, x: string) => {
        switch (s.phase) {
            // ws
            case 0:
                if (isTagChar(x)) {
                    s.name = x;
                    s.val = "";
                    s.phase = 2;
                } else if (x == ">") {
                    const res = { id: "elem", value: { tag: s.tag, attribs: s.attribs } };
                    s.scope.push(s.tag);
                    s.state = State.ELEM_BODY;
                    s.body = "";
                    return res;
                } else if (x == "/") {
                    s.phase = 1;
                } else if (!isWS(x)) {
                    unexpected(x);
                }
                break;
            // self-closing
            case 1:
                if (x == ">") {
                    s.state = State.WAIT;
                    return { id: "elem", value: { tag: s.tag, attribs: s.attribs } };
                } else {
                    unexpected(x);
                }
                break;
            // attrib name
            case 2:
                if (isTagChar(x)) {
                    s.name += x;
                } else if (x == "=") {
                    s.phase = 3;
                } else {
                    unexpected(x);
                }
                break;
            case 3:
                if (x == "\"") {
                    s.phase = 4;
                } else {
                    unexpected(x);
                }
                break;
            case 4:
                if (x == "\"") {
                    s.attribs[s.name] = s.val;
                    s.phase = 0;
                } else {
                    s.val += x;
                }
        }
    }
}