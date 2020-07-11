export type Status = "ok" | "partial" | "fail" | "err";

export interface State {
    grammar: string;
    input: string;
    rule: string;
}

export interface ParseResult {
    status: Status;
    body: string;
    time?: number;
}

export interface CodeTemplate {
    name: string;
    ext: string;
    code: string;
}
