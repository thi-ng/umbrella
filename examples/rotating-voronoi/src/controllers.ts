export const slider = (
    value: number,
    onChange: (n: number) => void,
    min: number,
    max: number,
    step: number,
    label: string
) => {
    return [
        "div.pv2",
        ["div", label],
        [
            "input.w-100",
            {
                type: "range",
                value,
                min,
                max,
                step,
                oninput: (e: Event) => {
                    const target = e.target as HTMLInputElement;
                    const value = target && target.value;
                    onChange(parseFloat(value));
                },
            },
        ],
    ];
};

export const checkbox = (
    value: boolean,
    onChange: (n: boolean) => void,
    label: string
) => {
    return [
        "div.pv2",
        [
            "input.mr1",
            {
                id: label,
                type: "checkbox",
                checked: value,
                oninput: (e: Event) => {
                    const target = e.target as HTMLInputElement;
                    const checked = target && target.checked;
                    onChange(checked);
                },
            },
        ],
        ["label", { for: label }, label],
    ];
};
