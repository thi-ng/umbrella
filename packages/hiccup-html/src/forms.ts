import type { NumOrString } from "@thi.ng/api";
import type {
    Attribs,
    AttribVal,
    BooleanAttrib,
    NumericAttrib,
    RelAttribs,
    StringAttrib,
} from "./api";
import { defElement } from "./def";

export interface FormAttribs extends Attribs, RelAttribs {
    "accept-charset": AttribVal<string | string[]>;
    action: StringAttrib;
    autocomplete: AttribVal<"on" | "off">;
    enctype: StringAttrib;
    method: StringAttrib;
    novalidate: BooleanAttrib;
    target: StringAttrib;
}

export const form = defElement<Partial<FormAttribs>>("form");

export interface FieldsetAttribs extends Attribs {
    disabled: BooleanAttrib;
    form: StringAttrib;
    name: StringAttrib;
}

export const fieldset = defElement<Partial<FieldsetAttribs>>("fieldset");

export const legend = defElement("legend");

export interface InputAttribs extends Attribs, FieldsetAttribs {
    // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill
    autocomplete: StringAttrib;
    autofocus: BooleanAttrib;
    list: StringAttrib;
    readonly: BooleanAttrib;
    required: BooleanAttrib;
    type: StringAttrib;
    value: AttribVal<NumOrString>;
}

export interface InputCheckboxAttribs extends InputAttribs {
    checked: BooleanAttrib;
    indeterminate: BooleanAttrib;
}

export interface InputRadioAttribs extends InputAttribs {
    checked: BooleanAttrib;
}

export interface InputFileAttribs extends InputAttribs {
    accept: AttribVal<string | string[]>;
    capture: AttribVal<"user" | "environment">;
    multiple: BooleanAttrib;
}

export interface InputTextAttribs extends InputAttribs {
    dirname: StringAttrib;
    minlength: NumericAttrib;
    maxlength: NumericAttrib;
    pattern: StringAttrib;
    placeholder: StringAttrib;
    size: NumericAttrib;
}

export interface TextAreaAttribs extends InputTextAttribs {
    cols: NumericAttrib;
    rows: NumericAttrib;
    wrap: AttribVal<"hard" | "soft" | "off">;
}

export interface InputNumericAttribs extends InputAttribs {
    min: NumericAttrib;
    max: NumericAttrib;
    step: NumericAttrib;
    value: NumericAttrib;
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
    disabled: BooleanAttrib;
    label: StringAttrib;
    selected: BooleanAttrib;
    value: AttribVal<NumOrString>;
}

export const option = defElement<Partial<OptionAttribs>, string>("option");

export interface OptGroupAttribs {
    disabled: BooleanAttrib;
    label: StringAttrib;
}

export const optGroup = defElement<Partial<OptGroupAttribs>>("optgroup");

export interface SelectAttribs extends InputAttribs {
    multiple: BooleanAttrib;
    size: NumericAttrib;
}

export const select = defElement<Partial<SelectAttribs>>("select");

export interface LabelAttribs extends Partial<Attribs> {
    for: StringAttrib;
    form?: StringAttrib;
}

export const label = defElement<LabelAttribs>("label");

export interface MeterAttribs extends Attribs {
    min: NumericAttrib;
    max: NumericAttrib;
    low: NumericAttrib;
    high: NumericAttrib;
    optimum: NumericAttrib;
    value: NumericAttrib;
    form: StringAttrib;
}

export const meter = defElement<Partial<MeterAttribs>>("meter");

export interface ProgressAttribs extends Attribs {
    max: NumericAttrib;
    value: NumericAttrib;
}

export const progress = defElement<Partial<ProgressAttribs>>("progress");
