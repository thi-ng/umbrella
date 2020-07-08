import type { Fn, Fn4 } from "@thi.ng/api";
import { Attribs, div, section } from "@thi.ng/hiccup-html";
import { $list, $switch, ComponentLike } from "@thi.ng/rdom";
import { Subscription } from "@thi.ng/rstream";
import { dedupe, map, range } from "@thi.ng/transducers";

export interface TabOpts {
    attribs: {
        wrapper?: Partial<Attribs>;
        tab?: Partial<Attribs>;
        content?: Partial<Attribs>;
    };
    head: Fn4<
        Subscription<number, number>,
        string,
        number,
        boolean,
        ComponentLike
    >;
    sections: {
        title: string;
        content: Fn<number, Promise<ComponentLike>>;
    }[];
}

export const tabs = (
    src: Subscription<number, number>,
    { attribs, head, sections }: TabOpts
) => {
    src = src.transform(dedupe());
    return div(
        attribs.wrapper,
        $list(
            src.map((id) => [
                ...map((i) => <const>[i, i === id], range(sections.length)),
            ]),
            "div",
            attribs.tab,
            ([i, sel]) => head(src, sections[i].title, i, sel)
        ),
        $switch<number>(
            src,
            (x) => x,
            sections.reduce((acc, { content }, i) => {
                acc[i] = async (i) =>
                    section(attribs.content, await content(i));
                return acc;
            }, <Record<number, Fn<number, Promise<ComponentLike>>>>{})
        )
    );
};
