import { defAtom, defView } from "@thi.ng/atom";
import { start } from "@thi.ng/hdom";
import { EventBus, trace } from "@thi.ng/interceptors";
import { state, theme } from "./config";
import { dropdown } from "./dropdown";
import { fuzzyDropdown } from "./fuzzy";
import { cancelableInput } from "./input";

const bus = new EventBus(defAtom(state));
bus.instrumentWith([trace]);

const ctx = {
    bus,
    theme,
    views: {
        countries: defView(bus.state, ["countries"]),
        filter: defView(bus.state, ["countries", "filter"]),
    },
};

const dd = dropdown("theme.dd");
const input = cancelableInput("theme.input");

start(
    (ctx: any) => {
        ctx.bus.processQueue();
        return [
            "div",
            ctx.theme.root,
            [
                "div",
                ctx.theme.column,
                [
                    fuzzyDropdown,
                    {
                        state: ctx.views.countries,
                        filter: ctx.views.filter,
                        placeholder: "Start typing to fuzzy match",
                        hoverLabel: [
                            ["span", "Choose a country..."],
                            ["i.fr.fas.fa-angle-down"],
                        ],
                        dropdown: dd,
                        input,
                    },
                ],
            ],
        ];
    },
    { ctx }
);

// window["ctx"] = ctx;
