export interface DropDownOption extends Array<any> {
    [0]: string | number;
    [1]: string;
    [2]?: boolean
};

export interface DropDownOptionGroup extends Array<any> {
    [0]: { label?: string, [id: string]: any },
    [1]: DropDownOption[];
}

export const option = ([value, label, disabled]: DropDownOption, sel: string | number) =>
    [
        "option",
        { value, disabled: !!disabled, selected: value === sel },
        label
    ];

export const optgroup = (attribs: any, options: DropDownOption[], sel?: string | number) =>
    [
        "optgroup",
        (attribs.label = attribs.label || "--", attribs),
        ...options.map((o) => option(o, sel))
    ];

export const dropdown = (attribs: any, options: DropDownOption[], sel?: string | number) =>
    [
        "select",
        attribs,
        ...options.map((o) => option(o, sel))
    ];

export const groupedDropdown = (attribs: any, groups: DropDownOptionGroup[], sel?: string | number) =>
    [
        "select",
        attribs,
        ...groups.map((o) => optgroup(o[0], o[1], sel))
    ];
