import type { IObjectOf } from "@thi.ng/api";
import { compare } from "@thi.ng/compare";
import {
    dispatchNow,
    EffectDef,
    EventDef,
    FX_DISPATCH_NOW,
    FX_STATE,
    valueSetter,
} from "@thi.ng/interceptors";
import { getIn, setIn } from "@thi.ng/paths";
import type { Triple } from "@thi.ng/rstream-query";
import {
    comp,
    iterator,
    mapIndexed,
    padLast,
    page,
    repeat,
} from "@thi.ng/transducers";
import type { AppInterceptorContext } from "./api";
import * as fx from "./effects";
import * as ev from "./events";

export const PAGE_LEN = 5;

export const EVENTS: IObjectOf<EventDef> = {
    [ev.ADD_COUNTRY]: (_, [__, [id, name, region]]) => ({
        [fx.ADD_TRIPLE]: [
            [id, "type", "country"],
            [id, "name", name],
            [id, "partOf", region],
            [region, "type", "region"],
        ],
    }),

    [ev.ADD_CITY]: (_, [__, [city, countryID]]) => ({
        [fx.ADD_TRIPLE]: [
            [city, "type", "city"],
            [city, "locatedIn", countryID],
        ],
    }),

    [ev.SET_SORT]: (state, [_, i]) => {
        const sort = getIn(state, ["sort"]);
        return {
            [FX_STATE]: setIn(
                state,
                ["sort"],
                [i, sort[0] === i ? !sort[1] : false]
            ),
            [FX_DISPATCH_NOW]: [ev.UPDATE_PAGE],
        };
    },

    [ev.SET_PAGE]: [valueSetter("page"), dispatchNow([ev.UPDATE_PAGE])],

    [ev.UPDATE_PAGE]: (state, _, __, ctx) => {
        const maxPage = Math.floor(
            Math.max(0, ctx.store.triples.length - 1) / PAGE_LEN
        );
        let curr = getIn(state, ["page"]);
        let sort = getIn(state, ["sort"]);
        if (curr > maxPage) {
            state = setIn(state, ["page"], (curr = maxPage));
        }
        return {
            [FX_STATE]: setIn(
                state,
                ["pagedTriples"],
                [
                    ...iterator(
                        comp(
                            page<any>(curr, PAGE_LEN),
                            mapIndexed(
                                (i, x: Triple) => [i + 1, ...x],
                                curr * PAGE_LEN
                            ),
                            padLast(PAGE_LEN, [...repeat("\u00a0", 4)])
                        ),
                        ctx.store.triples
                            .slice()
                            .sort(comparator.apply(null, sort))
                    ),
                ]
            ),
        };
    },
};

export const EFFECTS: IObjectOf<EffectDef> = {
    [fx.ADD_TRIPLE]: (triple: Triple, bus, ctx) => {
        ctx.store.add(triple);
        bus.dispatch([ev.UPDATE_PAGE]);
    },
    [fx.REMOVE_TRIPLE]: (triple: Triple, bus, ctx) => {
        ctx.store.delete(triple);
        bus.dispatch([ev.UPDATE_PAGE]);
    },
};

const comparator = (i: number, rev: boolean) =>
    rev
        ? (a: Triple, b: Triple) => compare(b[i], a[i])
        : (a: Triple, b: Triple) => compare(a[i], b[i]);
