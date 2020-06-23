import { MaybeDeref, NumOrString } from "@thi.ng/api";
import { Attribs } from "./api";
import { defElement } from "./def";

export interface InputAttribs extends Attribs {
    // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill
    autocomplete: MaybeDeref<string>;
    autofocus: MaybeDeref<boolean>;
    disabled: MaybeDeref<boolean>;
    form: MaybeDeref<string>;
    list: MaybeDeref<string>;
    name: MaybeDeref<string>;
    readonly: MaybeDeref<boolean>;
    required: MaybeDeref<boolean>;
    type: MaybeDeref<string>;
    value: MaybeDeref<NumOrString>;
}

export interface InputCheckboxAttribs extends InputAttribs {
    checked: MaybeDeref<boolean>;
    indeterminate: MaybeDeref<boolean>;
}

export interface InputTextAttribs extends InputAttribs {
    dirname: MaybeDeref<string>;
    minlength: MaybeDeref<number>;
    maxlength: MaybeDeref<number>;
    pattern: MaybeDeref<string>;
    placeholder: MaybeDeref<string>;
    size: MaybeDeref<number>;
}

export interface InputNumericAttribs extends InputAttribs {
    min: MaybeDeref<number>;
    max: MaybeDeref<number>;
    step: MaybeDeref<number>;
    value: MaybeDeref<number>;
}

export const inputCheck = defElement<Partial<InputCheckboxAttribs>, never>(
    "input",
    {
        type: "checkbox",
    }
);

export const inputPass = defElement<Partial<InputTextAttribs>, never>("input", {
    type: "password",
});

export const inputNumber = defElement<Partial<InputNumericAttribs>, never>(
    "input",
    { type: "numeric" }
);

export const inputRadio = defElement<Partial<InputAttribs>, never>("input", {
    type: "radio",
});

export const inputRange = defElement<Partial<InputNumericAttribs>, never>(
    "input",
    { type: "range" }
);

export const inputText = defElement<Partial<InputTextAttribs>, never>("input", {
    type: "text",
});

export interface OptionAttribs {
    disabled: MaybeDeref<boolean>;
    label: MaybeDeref<string>;
    selected: MaybeDeref<boolean>;
    value: MaybeDeref<NumOrString>;
}

export const option = defElement<Partial<OptionAttribs>, string>("option");

export interface OptGroupAttribs {
    disabled: MaybeDeref<boolean>;
    label: MaybeDeref<string>;
}

export const optGroup = defElement<Partial<OptGroupAttribs>>("optgroup");

export interface SelectAttribs extends InputAttribs {
    multiple: MaybeDeref<boolean>;
    size: MaybeDeref<number>;
}

export const select = defElement<Partial<SelectAttribs>>("select");

export interface LabelAttribs extends Partial<Attribs> {
    for: MaybeDeref<string>;
}

export const label = defElement<LabelAttribs>("label");

export interface MeterAttribs extends Attribs {
    min: MaybeDeref<number>;
    max: MaybeDeref<number>;
    low: MaybeDeref<number>;
    high: MaybeDeref<number>;
    optimum: MaybeDeref<number>;
    value: MaybeDeref<number>;
    form: MaybeDeref<string>;
}

export const meter = defElement<Partial<MeterAttribs>>("meter");
