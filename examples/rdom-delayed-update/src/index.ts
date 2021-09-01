import { delayed } from "@thi.ng/compose";
import { SYSTEM } from "@thi.ng/random";
import {
    $compile,
    $klist,
    $refresh,
    Component,
    NumOrElement,
} from "@thi.ng/rdom";
import { fromPromise, merge, reactive } from "@thi.ng/rstream";
import { cycle } from "@thi.ng/transducers";

interface UserSummary {
    id: number;
    name: string;
}

const users = reactive<UserSummary[]>([
    { id: 1, name: "alice" },
    { id: 2, name: "bob" },
    { id: 3, name: "charlie" },
    { id: 4, name: "dora" },
    { id: 5, name: "emma" },
    { id: 6, name: "fred" },
    { id: 7, name: "gina" },
]);

const colors = cycle(["f00", "0ff", "f0f", "f90", "00f", "0f0"]);

/**
 * User thumbnail component. Image element w/ reactive `src` attrib.
 *
 * @param srcUrl
 */
const userThumb = (srcUrl: Promise<string>) => [
    "img.db.w-100",
    {
        // src image attribute
        src: merge({
            // stream sources
            src: [
                // preloader image (should be local really)
                reactive(
                    "https://via.placeholder.com/640x360.png?text=wait+for+it..."
                ),
                // final image
                fromPromise(srcUrl),
                ///....
            ],
        }),
    },
];

/**
 * Alternative project thumbnail with custom inner pre-loader component.
 *
 * @param srcUrl
 */
const userThumbAlt = (srcUrl: Promise<string>) => [
    "div.aspect-ratio.aspect-ratio--16x9.tc",
    {},
    $refresh(
        fromPromise(srcUrl),
        async (src) => ["img.w-100", { src }],
        async (x) => ["img.w-100", { src: "broken.png" }],
        async () => ["div", { style: { padding: "25% 0" } }, "loading..."]
    ),
];

class UserComponent extends Component {
    constructor(public user: UserSummary) {
        super();
    }

    async mount(parent: Element, index?: NumOrElement): Promise<Element> {
        this.el = await this.$tree(
            this.$compile([
                "div.bg-black.white",
                {},
                // also try out userThumbAlt...
                userThumb(
                    // intentionally delay
                    delayed(
                        `https://via.placeholder.com/640x360.png/${
                            colors.next().value
                        }/fff?text=${this.user.name}`,
                        SYSTEM.minmax(0.5, 1) * 2000
                    )
                ),
                [
                    "h3.pa2.ma0.f6",
                    {},
                    `Project #${this.user.id}: ${this.user.name}`,
                ],
            ]),
            parent,
            index
        );
        return this.el!;
    }
}

// main root component
$compile(
    $klist(
        users,
        "div",
        {
            style: {
                display: "grid",
                "grid-template-columns": "1fr 1fr 1fr",
                gap: "0.25rem",
            },
        },
        (user) => new UserComponent(user),
        (user) => user.id
    )
).mount(document.getElementById("app")!);
