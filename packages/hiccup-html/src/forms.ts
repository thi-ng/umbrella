import { NumOrString } from "@thi.ng/api";
import { Attribs, AttribVal } from "./api";
import { defElement } from "./def";

export interface InputAttribs extends Attribs {
    // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill
    autocomplete: AttribVal<string>;
    autofocus: AttribVal<boolean>;
    disabled: AttribVal<boolean>;
    form: AttribVal<string>;
    list: AttribVal<string>;
    name: AttribVal<string>;
    readonly: AttribVal<boolean>;
    required: AttribVal<boolean>;
    type: AttribVal<string>;
    value: AttribVal<NumOrString>;
}

export interface InputCheckboxAttribs extends InputAttribs {
    checked: AttribVal<boolean>;
    indeterminate: AttribVal<boolean>;
}

export interface InputTextAttribs extends InputAttribs {
    dirname: AttribVal<string>;
    minlength: AttribVal<number>;
    maxlength: AttribVal<number>;
    pattern: AttribVal<string>;
    placeholder: AttribVal<string>;
    size: AttribVal<number>;
}

export interface InputNumericAttribs extends InputAttribs {
    min: AttribVal<number>;
    max: AttribVal<number>;
    step: AttribVal<number>;
    value: AttribVal<number>;
}

export const checkbox = defElement<Partial<InputCheckboxAttribs>, never>(
    "input",
    {
        type: "checkbox",
    }
);

export const radio = defElement<Partial<InputAttribs>, never>("input", {
    type: "radio",
});

export const inputPass = defElement<Partial<InputTextAttribs>, never>("input", {
    type: "password",
});

export const inputNumber = defElement<Partial<InputNumericAttribs>, never>(
    "input",
    { type: "numeric" }
);

export const inputRange = defElement<Partial<InputNumericAttribs>, never>(
    "input",
    { type: "range" }
);

export const inputText = defElement<Partial<InputTextAttribs>, never>("input", {
    type: "text",
});

export interface OptionAttribs {
    disabled: AttribVal<boolean>;
    label: AttribVal<string>;
    selected: AttribVal<boolean>;
    value: AttribVal<NumOrString>;
}

export const option = defElement<Partial<OptionAttribs>, string>("option");

export interface OptGroupAttribs {
    disabled: AttribVal<boolean>;
    label: AttribVal<string>;
}

export const optGroup = defElement<Partial<OptGroupAttribs>>("optgroup");

export interface SelectAttribs extends InputAttribs {
    multiple: AttribVal<boolean>;
    size: AttribVal<number>;
}

export const select = defElement<Partial<SelectAttribs>>("select");

export interface LabelAttribs extends Partial<Attribs> {
    for: AttribVal<string>;
}

export const label = defElement<LabelAttribs>("label");

export interface MeterAttribs extends Attribs {
    min: AttribVal<number>;
    max: AttribVal<number>;
    low: AttribVal<number>;
    high: AttribVal<number>;
    optimum: AttribVal<number>;
    value: AttribVal<number>;
    form: AttribVal<string>;
}

export const meter = defElement<Partial<MeterAttribs>>("meter");
