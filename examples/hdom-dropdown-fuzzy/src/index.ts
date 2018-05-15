import { Atom } from "@thi.ng/atom/atom";
import { start } from "@thi.ng/hdom/start";
import { EventBus } from "@thi.ng/interceptors/event-bus";
import { trace } from "@thi.ng/interceptors/interceptors";

import { state, theme } from "./config";
import { dropdown } from "./dropdown";
import { fuzzyDropdown } from "./fuzzy";
import { cancelableInput } from "./input";

const bus = new EventBus(new Atom(state));
bus.instrumentWith([trace]);

const ctx = {
    bus,
    theme,
    views: {
        countries: bus.state.addView("countries"),
        filter: bus.state.addView("countries.filter"),
    }
};

const dd = dropdown("theme.dd");
const input = cancelableInput("theme.input");

start("app",
    (ctx) => {
        ctx.bus.processQueue();
        return ["div", ctx.theme.root,
            ["div", ctx.theme.column,
                [fuzzyDropdown, {
                    state: ctx.views.countries,
                    filter: ctx.views.filter,
                    placeholder: "Start typing to fuzzy match",
                    hoverLabel: [["span", "Choose a country..."], ["i.fr.fas.fa-angle-down"]],
                    dropdown: dd,
                    input,
                }]
            ],
        ];
    },
    ctx);

// window["ctx"] = ctx;
