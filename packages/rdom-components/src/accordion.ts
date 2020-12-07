import type { Fn, Fn4 } from "@thi.ng/api";
import { Attribs, div, section } from "@thi.ng/hiccup-html";
import { $list, $promise, ComponentLike } from "@thi.ng/rdom";
import type { Subscription } from "@thi.ng/rstream";
import { dedupe, map, range } from "@thi.ng/transducers";

export interface AccordionOpts {
    attribs: {
        wrapper?: Partial<Attribs>;
        sectionOn?: Partial<Attribs>;
        sectionOff?: Partial<Attribs>;
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
    error?: Fn<Error, any>;
}

export const accordion = (
    src: Subscription<number, number>,
    { attribs, head, sections, error }: AccordionOpts
) => {
    return $list(
        src.transform(
            dedupe(),
            map((id) => [
                ...map((i) => <const>[i, i === id], range(sections.length)),
            ])
        ),
        "div",
        attribs.wrapper,
        ([i, sel]) =>
            section(
                sel ? attribs.sectionOn : attribs.sectionOff,
                head(src, sections[i].title, i, sel),
                sel
                    ? div(
                          attribs.content,
                          $promise(sections[i].content(i), error)
                      )
                    : null
            )
    );
};
