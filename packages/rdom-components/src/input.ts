import type { NumericArray } from "@thi.ng/api";
import {
    Attribs,
    div,
    inputNumber,
    InputNumericAttribs,
} from "@thi.ng/hiccup-html";
import type { ISubscription } from "@thi.ng/rstream";
import { pluck, repeatedly } from "@thi.ng/transducers";

export const inputNumeric = (
    dest: ISubscription<number, number>,
    attribs?: Partial<InputNumericAttribs>
) =>
    inputNumber({
        ...attribs,
        value: dest,
        oninput: (e: InputEvent) =>
            dest.next(parseFloat((<HTMLInputElement>e.target).value)),
    });

export const inputVector = (
    dim: number,
    dest: ISubscription<NumericArray, NumericArray>,
    outerAttribs: Partial<Attribs> = {},
    innerAttribs?: Partial<InputNumericAttribs>
) =>
    div(
        outerAttribs,
        ...repeatedly((i) => inputVectorCoord(dim, i, dest, innerAttribs), dim)
    );

export const inputVectorCoord = (
    dim: number,
    i: number,
    dest: ISubscription<NumericArray, NumericArray>,
    attribs?: Partial<InputNumericAttribs>
) =>
    inputNumber({
        ...attribs,
        value: dest.transform(pluck(i)),
        oninput: (e: InputEvent) => {
            const vec = (dest.deref() || new Array(dim).fill(0)).slice();
            vec[i] = parseFloat((<HTMLInputElement>e.target).value);
            dest.next(vec);
        },
    });
