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
    name: AttribVal<
        | "application-name"
        | "author"
        | "color-scheme"
        | "creator"
        | "description"
        | "generator"
        | "googlebot"
        | "keywords"
        | "publisher"
        | "referrer"
        | "robots"
        | "theme-color"
        | "viewport"
    >;
}

export const meta = defElement<Partial<MetaAttribs>, never>("meta");

export interface ViewportOpts {
    width: number;
    height: number;
    min: number;
    max: number;
    init: number;
    user: boolean;
    fit: "auto" | "cover" | "contain";
}

export const metaViewport = (opts: Partial<ViewportOpts> = {}) =>
    meta({
        name: "viewport",
        content: [
            opts.width &&
                `width=${opts.width < 0 ? "device-width" : opts.width}`,
            opts.height &&
                `width=${opts.height < 0 ? "device-height" : opts.height}`,
            `initial-scale=${opts.init || 1}`,
            opts.min && `minimum-scale=${opts.min}`,
            opts.max && `maximum-scale=${opts.max}`,
            `user-scalable=${opts.user !== false ? "yes" : "no"}`,
            opts.fit != null && `viewport-fit=${opts.fit}`,
        ]
            .filter((x) => !!x)
            .join(","),
    });

export const metaRobots = (
    type:
        | "index"
        | "noindex"
        | "follow"
        | "nofollow"
        | "none"
        | "noarchive"
        | "nosnippet"
        | "noimageindex"
        | "nocache"
) => meta({ name: "robots", content: type });

export const metaReferrer = (
    type:
        | "no-referrer-when-downgrade"
        | "no-referrer"
        | "origin-when-cross-origin"
        | "origin"
        | "same-origin"
        | "strict-origin-when-cross-origin"
        | "strict-origin"
        | "unsafe-URL"
) => meta({ name: "referrer", content: type });

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

export const linkCSS = (href: string) => link({ href, rel: "stylesheet" });

export interface StyleAttribs extends Attribs {
    media: AttribVal<string>;
    nonce: AttribVal<string>;
    type: AttribVal<string>;
}

export const style = defElement<Partial<StyleAttribs>, string>("style");
