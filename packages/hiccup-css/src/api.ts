export interface Format {
    rules: string;
    ruleSep: string;
    valSep: string;
    decls: string;
    declStart: string;
    declEnd: string;
    indent: string;
}

export interface CSSOpts {
    format: Format;
    autoprefix: string[] | Set<string>;
    vendors: string[];
    depth: number;
}

export const COMPACT: Format = { rules: "", ruleSep: ",", valSep: "", decls: "", declStart: "{", declEnd: "}", indent: "" };
export const PRETTY: Format = { rules: "\n", ruleSep: ", ", valSep: " ", decls: "\n", declStart: " {\n", declEnd: "}\n", indent: "    " };
