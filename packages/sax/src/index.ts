import type { IObjectOf } from "@thi.ng/api";
import { NO_OP } from "@thi.ng/api/api";
import { unescapeEntities } from "@thi.ng/strings/entities";
import { ESCAPES } from "@thi.ng/strings/escape";
import type { Transducer } from "@thi.ng/transducers";
import { fsm, type FSMState, type FSMStateMap } from "@thi.ng/transducers-fsm";
import { __iter, iterator } from "@thi.ng/transducers/iterator";

export interface ParseOpts {
	/**
	 * If `true`, unescape standard XML entities in body text and attrib
	 * values.
	 *
	 * Default: false
	 */
	entities: boolean;
	/**
	 * If `true`, include children tags in {@link ELEM_END} events. For very
	 * large documents, this should be disabled to save (or even fit
	 * into) memory.
	 *
	 * Default: true
	 */
	children: boolean;
	/**
	 * If `true`, trims element body, comments and CDATA content. If the
	 * remaining string is empty, no event will be generated for this
	 * value.
	 *
	 * Default: false
	 */
	trim: boolean;
	/**
	 * If `true`, HTML5 boolean attributes are supported.
	 *
	 * Default: false
	 */
	boolean: boolean;
	/**
	 * If given, element names in this set are allowed to omit their
	 * closing `/`. E.g. `<link href="...">` vs `<link href="..."/>`
	 *
	 * Default: undefined (none allowed)
	 */
	// voidTags: Set<string>; // TODO #48
}

export const VOID_TAGS = new Set(
	"area base br col command embed hr img input keygen link meta param source track wbr".split(
		" "
	)
);

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
	/**
	 * XML processing instruction event
	 */
	PROC,
	/**
	 * XML Doctype element event
	 */
	DOCTYPE,
	/**
	 * XML comment element event
	 */
	COMMENT,
	/**
	 * XML CDATA content event
	 */
	CDATA,
	/**
	 * XML element start (incl. attribs) event
	 */
	ELEM_START,
	/**
	 * XML element end event (possibly incl. already parsed children)
	 */
	ELEM_END,
	/**
	 * XML element body (text) event
	 */
	ELEM_BODY,
	/**
	 * Parser error event
	 */
	ERROR,
}

interface ParseState extends FSMState {
	scope: any[];
	pos: number;
	opts: Partial<ParseOpts>;
	tag?: string;
	attribs?: any;
	body?: string;
	name?: string;
	val?: string;
	quote?: string;
	phase?: number;
	isProc?: boolean;
}

const enum State {
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
	CDATA,
	// H_CHAR,
	// U_CHAR,
}

/**
 * Returns XML parser transducer, optionally configured with given
 * options. If `src` is also given, returns an iterator instead.
 *
 * @param opts -
 */
export function parse(
	opts?: Partial<ParseOpts>
): Transducer<string, ParseEvent>;
export function parse(src: string): IterableIterator<ParseEvent>;
export function parse(
	opts: Partial<ParseOpts>,
	src: string
): IterableIterator<ParseEvent>;
export function parse(...args: any[]): any {
	const iter = __iter(parse, args, iterator);
	if (iter) {
		return iter;
	}
	return fsm({
		states: PARSER,
		init: () =>
			<ParseState>{
				state: State.WAIT,
				scope: [],
				pos: 0,
				opts: {
					children: true,
					entities: false,
					trim: false,
					...args[0],
				},
			},
		terminate: State.ERROR,
	});
}

const isWS = (x: string) => {
	const c = x.charCodeAt(0);
	return (
		c === 0x20 || // space
		c === 0x09 || // tab
		c === 0x0a || // LF
		c === 0x0d // CR
	);
};

const isTagChar = (x: string) => {
	const c = x.charCodeAt(0);
	return (
		(c >= 0x41 && c <= 0x5a) || // A-Z
		(c >= 0x61 && c <= 0x7a) || // a-z
		(c >= 0x30 && c <= 0x39) || // 0-9
		c == 0x2d || // -
		c == 0x5f || // _
		c == 0x3a // :
	);
};

const error = (s: ParseState, body: string) => {
	s.state = State.ERROR;
	return [{ type: Type.ERROR, body }];
};

const illegalEscape = (s: ParseState, ch: string) =>
	error(s, `illegal escape sequence: \\${ch} @ pos ${s.pos - 1}`);

const unexpected = (s: ParseState, x: string) =>
	error(s, `unexpected char: '${x}' @ pos ${s.pos}`);

const PARSER: FSMStateMap<ParseState, string, ParseEvent[]> = {
	[State.ERROR]: NO_OP,

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
			return beginElementBody(state);
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
			const scope = state.scope;
			const n = scope.length;
			if (n > 0 && state.tag === scope[n - 1].tag) {
				const res = scope.pop();
				if (n > 1 && state.opts.children) {
					scope[n - 2].children.push(res);
				}
				state.state = State.WAIT;
				return [{ type: Type.ELEM_END, ...res }];
			} else {
				return error(
					state,
					`unmatched tag: '${state.tag}' @ pos ${
						state.pos - state.tag!.length - 2
					}`
				);
			}
		}
	},

	[State.ELEM_SINGLE]: (state, ch) => {
		state.pos++;
		if (ch === ">") {
			state.state = State.WAIT;
			const n = state.scope.length;
			const res = { tag: state.tag, attribs: state.attribs };
			if (n > 0 && state.opts.children) {
				state.scope[n - 1].children.push(res);
			}
			return [
				{ type: Type.ELEM_START, ...res },
				{ type: Type.ELEM_END, ...res },
			];
		} else {
			return unexpected(state, ch);
		}
	},

	[State.ELEM_BODY]: (state, ch) => {
		state.pos++;
		let b = state.body!;
		if (ch === "<") {
			let res;
			const t = state.tag;
			state.state = State.MAYBE_ELEM;
			state.tag = "";
			if (b.length > 0) {
				if (state.opts.trim) {
					b = b.trim();
					if (!b.length) {
						return;
					}
				}
				if (state.opts.entities) {
					b = unescapeEntities(b);
				}
				state.scope[state.scope.length - 1].body = b;
				res = [{ type: Type.ELEM_BODY, tag: t, body: b }];
			}
			return res;
		} else {
			if (b.charAt(b.length - 1) === "\\") {
				const e = ESCAPES[ch];
				if (e !== undefined) {
					state.body = b.substring(0, b.length - 1) + e;
					return;
				} else {
					return illegalEscape(state, ch);
				}
			}
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
					return beginElementBody(state);
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
		} else if (state.opts.boolean) {
			if (!state.name || !state.name.length) {
				return error(state, "missing attribute name");
			}
			if (ch === " ") {
				state.attribs[state.name!] = true;
				state.state = State.MAYBE_ATTRIB;
			} else if (ch === "/") {
				state.attribs[state.name!] = true;
				state.state = State.ELEM_SINGLE;
				return;
			} else if (ch === ">") {
				state.attribs[state.name!] = true;
				return beginElementBody(state);
			} else {
				return unexpected(state, ch);
			}
		} else {
			return unexpected(state, ch);
		}
	},

	[State.ATTRIB_VAL_START]: (state, ch) => {
		state.pos++;
		if (ch === '"' || ch === "'") {
			state.state = State.ATTRIB_VALUE;
			state.quote = ch;
		} else {
			return unexpected(state, ch);
		}
	},

	[State.ATTRIB_VALUE]: (state, ch) => {
		state.pos++;
		let v = state.val!;
		if (v.charAt(v.length - 1) == "\\") {
			const e = ESCAPES[ch];
			if (e !== undefined) {
				state.val = v.substring(0, v.length - 1) + e;
				return;
			} else {
				return illegalEscape(state, ch);
			}
		}
		if (ch !== state.quote) {
			state.val += ch;
			return;
		}
		if (state.opts.entities) {
			v = unescapeEntities(v);
		}
		state.attribs[state.name!] = v;
		state.state = State.MAYBE_ATTRIB;
	},

	[State.MAYBE_INSTRUCTION]: (state, ch) => {
		state.pos++;
		if (ch === "-") {
			state.state = State.COMMENT;
		} else if (ch === "D") {
			state.state = State.DOCTYPE;
			state.phase = 1;
			state.body = "";
		} else if (ch === "[") {
			state.state = State.CDATA;
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
			const n = state.body!.length;
			if (state.body!.substring(n - 2) !== "--") {
				return unexpected(state, ch);
			}
			state.state = State.WAIT;
			let b = state.body!.substring(0, n - 2);
			if (state.opts.trim) {
				b = b.trim();
				if (!b.length) {
					return;
				}
			}
			return [{ type: Type.COMMENT, body: b }];
		} else {
			state.body += ch;
		}
	},

	[State.DOCTYPE]: (state, ch) => {
		state.pos++;
		if (state.phase! < 8) {
			if (ch === "DOCTYPE "[state.phase!]) {
				state.phase!++;
			} else {
				return unexpected(state, ch);
			}
		} else if (ch === ">") {
			state.state = State.WAIT;
			return [{ type: Type.DOCTYPE, body: state.body!.trim() }];
		} else {
			state.body += ch;
		}
	},

	[State.CDATA]: (state, ch) => {
		state.pos++;
		if (state.phase! < 7) {
			if (ch === "[CDATA["[state.phase!]) {
				state.phase!++;
			} else {
				return unexpected(state, ch);
			}
		} else if (ch === ">") {
			const n = state.body!.length;
			if (state.body!.substring(n - 2) !== "]]") {
				state.body += ch;
				return;
			}
			state.state = State.WAIT;
			let b = state.body!.substring(0, n - 2);
			if (state.opts.trim) {
				b = b.trim();
				if (!b.length) {
					return;
				}
			}
			return [{ type: Type.CDATA, body: b }];
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
			return [
				{ type: Type.PROC, tag: state.tag, attribs: state.attribs },
			];
		} else {
			return unexpected(state, ch);
		}
	},
};

const beginElementBody = (state: ParseState) => {
	state.state = State.ELEM_BODY;
	state.scope.push({ tag: state.tag, attribs: state.attribs, children: [] });
	state.body = "";
	return [{ type: Type.ELEM_START, tag: state.tag, attribs: state.attribs }];
};
