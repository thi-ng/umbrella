import { IObjectOf } from "@thi.ng/api/api";

export type RuleFn = (acc: string[], opts: CSSOpts) => string[];

export type Conditional = string | IObjectOf<boolean | number | string>;

export interface Format {
    rules: string;
    ruleSep: string;
    valSep: string;
    decls: string;
    declStart: string;
    declEnd: string;
    indent: string;
    comments: boolean;
}

export interface CSSOpts {
    format: Format;
    fns: any;
    autoprefix: string[] | Set<string>;
    vendors: string[];
    depth: number;
}

export const DEFAULT_VENDORS = [
    "-moz-",
    "-ms-",
    "-o-",
    "-webkit-"
];

export const COMPACT: Format = {
    rules: "",
    ruleSep: ",",
    valSep: "",
    decls: "",
    declStart: "{",
    declEnd: "}",
    indent: "",
    comments: false,
};

export const PRETTY: Format = {
    rules: "\n",
    ruleSep: ", ",
    valSep: " ",
    decls: "\n",
    declStart: " {\n",
    declEnd: "}\n",
    indent: "    ",
    comments: true,
};
