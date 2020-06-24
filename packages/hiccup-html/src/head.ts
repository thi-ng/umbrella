import {
    Attribs,
    AttribVal,
    CORSAttribs,
    ImportanceAttribs,
    ReferrerAttribs,
    RelAttribs,
} from "./api";
import { defElement, defElements } from "./def";

export const [head, title] = defElements(["head", "title"]);

export interface BaseAttribs extends Attribs {
    href: AttribVal<string>;
    target: AttribVal<string>;
}

export const base = defElement<Partial<BaseAttribs>, never>("base");

export interface MetaAttribs extends Attribs {
    charset: AttribVal<string>;
    content: AttribVal<string>;
    "http-equiv": AttribVal<
        | "content-language"
        | "content-security-policy"
        | "content-type"
        | "default-style"
        | "refresh"
        | "set-cookie"
        | "x-ua-compatible"
    >;
    name: AttribVal<string>;
}

export const meta = defElement<Partial<MetaAttribs>, never>("meta");

export interface LinkAttribs
    extends Attribs,
        CORSAttribs,
        ImportanceAttribs,
        ReferrerAttribs,
        RelAttribs {
    as: AttribVal<
        | "audio"
        | "document"
        | "embed"
        | "fetch"
        | "font"
        | "image"
        | "object"
        | "script"
        | "style"
        | "track"
        | "video"
        | "worker"
    >;
    disabled: AttribVal<boolean>;
    href: AttribVal<string>;
    hreflang: AttribVal<string>;
    integrity: AttribVal<string>;
    media: AttribVal<string>;
    sizes: AttribVal<string | string[]>;
    type: AttribVal<string>;
}

export const link = defElement<Partial<LinkAttribs>, never>("link");

export interface StyleAttribs extends Attribs {
    media: AttribVal<string>;
    nonce: AttribVal<string>;
    type: AttribVal<string>;
}

export const style = defElement<Partial<StyleAttribs>, string>("style");
