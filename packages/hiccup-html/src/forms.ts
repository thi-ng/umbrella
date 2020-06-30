import { NumOrString } from "@thi.ng/api";
import { Attribs, AttribVal, RelAttribs } from "./api";
import { defElement } from "./def";

export interface FormAttribs extends Attribs, RelAttribs {
    "accept-charset": AttribVal<string | string[]>;
    action: AttribVal<string>;
    autocomplete: AttribVal<"on" | "off">;
    enctype: AttribVal<string>;
    method: AttribVal<string>;
    novalidate: AttribVal<boolean>;
    target: AttribVal<string>;
}

export const form = defElement<Partial<FormAttribs>>("form");

export interface FieldsetAttribs extends Attribs {
    disabled: AttribVal<boolean>;
    form: AttribVal<string>;
    name: AttribVal<string>;
}

export const fieldset = defElement<Partial<FieldsetAttribs>>("fieldset");

export const legend = defElement("legend");

export interface InputAttribs extends Attribs, FieldsetAttribs {
    // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill
    autocomplete: AttribVal<string>;
    autofocus: AttribVal<boolean>;
    list: AttribVal<string>;
    readonly: AttribVal<boolean>;
    required: AttribVal<boolean>;
    type: AttribVal<string>;
    value: AttribVal<NumOrString>;
}

export interface InputCheckboxAttribs extends InputAttribs {
    checked: AttribVal<boolean>;
    indeterminate: AttribVal<boolean>;
}

export interface InputRadioAttribs extends InputAttribs {
    checked: AttribVal<boolean>;
}

export interface InputFileAttribs extends InputAttribs {
    accept: AttribVal<string | string[]>;
    capture: AttribVal<"user" | "environment">;
    multiple: AttribVal<boolean>;
}

export interface InputTextAttribs extends InputAttribs {
    dirname: AttribVal<string>;
    minlength: AttribVal<number>;
    maxlength: AttribVal<number>;
    pattern: AttribVal<string>;
    placeholder: AttribVal<string>;
    size: AttribVal<number>;
}

export interface TextAreaAttribs extends InputTextAttribs {
    cols: AttribVal<number>;
    rows: AttribVal<number>;
    wrap: AttribVal<"hard" | "soft" | "off">;
}

export interface InputNumericAttribs extends InputAttribs {
    min: AttribVal<number>;
    max: AttribVal<number>;
    step: AttribVal<number>;
    value: AttribVal<number>;
}

export const button = defElement<Partial<InputAttribs>>("button");

export const checkbox = defElement<Partial<InputCheckboxAttribs>, never>(
    "input",
    {
        type: "checkbox",
    }
);

export const radio = defElement<Partial<InputRadioAttribs>, never>("input", {
    type: "radio",
});

export const inputColor = defElement<Partial<InputAttribs>, never>("input", {
    type: "color",
});

export const inputFile = defElement<Partial<InputFileAttribs>, never>("input", {
    type: "file",
});

export const inputPass = defElement<Partial<InputTextAttribs>, never>("input", {
    type: "password",
});

export const inputNumber = defElement<Partial<InputNumericAttribs>, never>(
    "input",
    { type: "number" }
);

export const inputRange = defElement<Partial<InputNumericAttribs>, never>(
    "input",
    { type: "range" }
);

export const inputSearch = defElement<Partial<InputTextAttribs>, never>(
    "input",
    {
        type: "search",
    }
);

export const inputText = defElement<Partial<InputTextAttribs>, never>("input", {
    type: "text",
});

export const textArea = defElement<Partial<TextAreaAttribs>, never>("textarea");

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
    form?: AttribVal<string>;
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

export interface ProgressAttribs extends Attribs {
    max: AttribVal<number>;
    value: AttribVal<number>;
}

export const progress = defElement<Partial<ProgressAttribs>>("progress");
