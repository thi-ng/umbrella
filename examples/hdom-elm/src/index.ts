import { setIn, updateIn } from "@thi.ng/paths";
import { Z3 } from "@thi.ng/strings";
import { DEC, DEFER, INC, RANDOM } from "./api";
import { mount } from "./elm";

mount(
    // state / model
    {
        value: 0,
    },
    // update / event processor
    (event, model) => {
        switch (event[0]) {
            case INC:
                return updateIn(model, ["value"], (x) =>
                    Math.min(x + event[1], 100)
                );
            case DEC:
                return updateIn(model, ["value"], (x) =>
                    Math.max(x - event[1], 0)
                );
            case RANDOM:
                return setIn(model, ["value"], (Math.random() * 100) | 0);
            case DEFER:
                setTimeout(() => event[1](), event[2]);
                break;
            default:
        }
        return model;
    },
    // view / root component
    (model, signal) => [
        "div.w4.pa2.br3.tc.bg-red.white",
        ["div", Z3(model.value)],
        [
            "div.mv2",
            ["button", { onclick: () => signal([DEC, 1])() }, "-"],
            ["button", { onclick: () => signal([INC, 1])() }, "+"],
        ],
    ],
    // other event handlers
    (signal) => {
        document.addEventListener("keypress", (e) => {
            switch (e.key) {
                case "-":
                    signal([DEC, 1])();
                    break;
                case "_":
                    signal([DEC, 10])();
                    break;
                case "=":
                    signal([INC, 1])();
                    break;
                case "+":
                    signal([INC, 10])();
                    break;
                case "r":
                    signal([RANDOM])();
                    break;
                case "d":
                    signal([DEFER, signal(["rnd"]), 500])();
                    break;
            }
        });
    }
    // other hdom options (see mount())
);
