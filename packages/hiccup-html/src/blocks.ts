import type {
    Attribs,
    AttribVal,
    BooleanAttrib,
    DimensionAttribs,
    ImportanceAttribs,
    LoadingAttribs,
    ReferrerAttribs,
    StringAttrib,
} from "./api";
import { defElement, defElements } from "./def";

export interface BlockquoteAttribs extends Attribs {
    cite: StringAttrib;
}

export const blockquote = defElement<Partial<BlockquoteAttribs>>("blockquote");

export const [div, figure, figcaption, para, pre, template] = defElements([
    "div",
    "figure",
    "figcaption",
    "p",
    "pre",
    "template",
]);

export const hr = defElement<Partial<Attribs>, never>("hr");

export interface IFrameAttribs
    extends Attribs,
        DimensionAttribs,
        ImportanceAttribs,
        LoadingAttribs,
        ReferrerAttribs {
    allow: StringAttrib;
    allowfullscreen: BooleanAttrib;
    allowpaymentrequest: BooleanAttrib;
    csp: StringAttrib;
    name: StringAttrib;
    sandbox: AttribVal<
        | "allow-downloads-without-user-activation"
        | "allow-forms"
        | "allow-modals"
        | "allow-orientation-lock"
        | "allow-pointer-lock"
        | "allow-popups"
        | "allow-popups-to-escape-sandbox"
        | "allow-presentation"
        | "allow-same-origin"
        | "allow-scripts"
        | "allow-storage-access-by-user-activation"
        | "allow-top-navigation"
        | "allow-top-navigation-by-user-activation"
    >;
    src: StringAttrib;
    srcdoc: StringAttrib;
}

export const iframe = defElement<Partial<IFrameAttribs>>("iframe");
