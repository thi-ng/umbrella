import {
    bgImagePage,
    codeBlock,
    contentPage,
    imagePage,
    link,
    list,
    quotePage,
    titlePage,
    twitterLink,
    ytVideo,
} from "./components";

// each item in this array is an hdom tree of a single slide

export const SLIDES: any[] = [
    [
        titlePage,
        "",
        "The Spirit Of Clojure",
        "Karsten Schmidt",
        ["br"],
        [twitterLink, "toxi"],
        ["br"],
        [twitterLink, "thing_umbrella"],
    ],

    [
        titlePage,
        "bg-dark-red white",
        "The Advent Spirit Of Clojure",
        "Karsten Schmidt",
        ["br"],
        [twitterLink, "toxi"],
        ["br"],
        [twitterLink, "thing_umbrella"],
    ],

    [
        titlePage,
        "",
        "In The Spirit Of Clojure",
        "Karsten Schmidt",
        ["br"],
        [twitterLink, "toxi"],
        ["br"],
        [twitterLink, "thing_umbrella"],
    ],

    [
        titlePage,
        "",
        "Clojure without Clojure",
        "Karsten Schmidt",
        ["br"],
        [twitterLink, "toxi"],
        ["br"],
        [twitterLink, "thing_umbrella"],
    ],

    [
        titlePage,
        "",
        "Clojurians Anonymous",
        "Karsten Schmidt",
        ["br"],
        [twitterLink, "toxi"],
        ["br"],
        [twitterLink, "thing_umbrella"],
    ],

    [
        contentPage,
        "What brought you to Clojure?",
        [
            "small",
            "Filling in this pre-meeting questionnaire is mandatory! Answers will be reviewed during session.",
        ],
        [
            list,
            "The Joy of...",
            `"Rich" core API / Sequence abstractions`,
            "Concision / Expressiveness",
            "Immutability by default",
            "Community / Maturity",
            "Hosted / x-platform",
            "Amount & clarity of thought",
            "Transducers, core.async, clojure.spec",
            "Gateway to various awesome tools / concepts",
        ],
    ],

    [
        contentPage,
        "What brought you to Clojure?",
        "...also",
        [
            list,
            "Rich Hickey (obviously!)",
            "Paul Graham",
            "Chris Houser",
            "Fogus",
            "James Reeves",
            "Chris Granger",
            "Anthony Grimes (R.I.P.)",
            "Christophe Grand",
            ["strong", "...all of you!"],
        ],
    ],

    [
        contentPage,
        "Patient file: KS",
        "Pre-meeting notes from therapy session: 2018-12-03",
        [
            list,
            "1988 - 1994 : Z80 / 6502 assembly, Forth",
            "1995 - 2011 : C89, Java, JavaScript, Lingo, ActionScript, Processing",
            "1995 - 1997 : Scheme, Common Lisp",
            "2011 - 2017 : Clojure/script, C11, Forth, ARM",
            "2016 - ...  : TypeScript, C11, Go, Clojurescript",
        ],
    ],

    [
        contentPage,
        "Most formative periods",
        "To help frame discussion during the therapy session...",
        [
            "ul",
            ["li.transition.red", "1988 - 1994 : Z80 / 6502 assembly, Forth"],
            [
                "li",
                "1995 - 2011 : C89, Java, JavaScript, Lingo, ActionScript, Processing",
            ],
            ["li", "1995 - 1997 : Scheme, Common Lisp"],
            [
                "li.transition.red",
                "2011 - 2017 : Clojure/script, C11, Forth, ARM",
            ],
            ["li", "2016 - ...  : TypeScript, C11, Go, Clojurescript"],
        ],
    ],

    [
        contentPage,
        "Most formative periods",
        "To help frame discussion during the therapy session...",
        [
            "ul",
            ["li.transition", "1988 - 1994 : Z80 / 6502 assembly, Forth"],
            [
                "li.transition.red",
                "1995 - 2011 : C89, Java, JavaScript, Lingo, ActionScript, Processing",
            ],
            ["li", "1995 - 1997 : Scheme, Common Lisp"],
            ["li.transition", "2011 - 2017 : Clojure/script, C11, Forth, ARM"],
            ["li", "2016 - ...  : TypeScript, C11, Go, Clojurescript"],
        ],
    ],

    [contentPage, "And so it begins..."],

    [imagePage, "bg-black", "./assets/logo-1280.jpg"],

    [imagePage, "bg-black", "./assets/timeline.svg"],

    [
        contentPage,
        "clojure.thi.ng",
        [
            list,
            "Started as successor of toxiclibs.org (in 2011)",
            "Grew into collection of ~20 libraries (largely CLJC)",
            "Mostly written in LP-style (org-mode)",
            "2D/3D geometry generation / transformation",
            "nD-matrix data types (prior to core.matrix)",
            "Data visualization (SVG / WebGL / rendered)",
            "Declarative WebGL, OpenGL & GPGPU/OpenCL wrappers",
            "Linked data / graph tools, query engines, SPARQL-like DSLs",
            "Monthly workshops (2015 - 2016)",
        ],
    ],

    [titlePage, "bg-black white", "Exponential Growth"],

    [imagePage, "bg-black", "./assets/svo/grapher.jpg"],
    [imagePage, "bg-black", "./assets/svo/grapher2.jpg"],
    [imagePage, "bg-black", "./assets/svo/grapher3.jpg"],

    [
        contentPage,
        "Gyroid formula",
        [codeBlock, `g(x, y, z) = abs(dot(cos([x y z]), sin([z x y])))`],
    ],

    [
        contentPage,
        "Gyroid formula",
        [
            codeBlock,
            `g(x, y, z) = abs(cosx * sinz + cosy * sinx + cosz * siny)`,
        ],
    ],

    [
        contentPage,
        "Gyroid formula",
        [
            codeBlock,
            `
(defn cossin
    [a b]
    (* (Math/cos a) (Math/sin b)))

(defn abs-gyroid-sum
    [x y z]
    (Math/abs (+ (cossin x z) (cossin y x) (cossin z y))))

(defn gyroid
    [[x y z] t]
    "Evaluates gyroid function at point p and subtracts iso threshold t."
    (- (abs-gyroid-sum x y z) t))`,
        ],
    ],

    [
        contentPage,
        "Gyroid formula",
        [
            codeBlock,
            `
(defn gyroid
    [[x y z] t]
    "Evaluates gyroid function at point p and subtracts iso threshold t."
    (- (Math/abs
        (+ (* (Math/cos x) (Math/sin z))
           (* (Math/cos y) (Math/sin x))
           (* (Math/cos z) (Math/sin y))))
        t))`,
        ],
        "Now evaluate for each XYZ cell in a volumetric grid...",
    ],

    [
        bgImagePage,
        "bg-black",
        "./assets/svo/0000.jpg",
        ["div.f1.gray", "2", ["sup", "3", ["sup", 3]], ["br"], "8 x 8 x 8"],
    ],
    [
        bgImagePage,
        "bg-black",
        "./assets/svo/0001.jpg",
        ["div.f1.gray", "2", ["sup", "4", ["sup", 3]], ["br"], "16 x 16 x 16"],
    ],
    [
        bgImagePage,
        "bg-black",
        "./assets/svo/0002.jpg",
        ["div.f1.gray", "2", ["sup", "5", ["sup", 3]], ["br"], "32 x 32 x 32"],
    ],
    [
        bgImagePage,
        "bg-black",
        "./assets/svo/0003.jpg",
        ["div.f1.gray", "2", ["sup", "6", ["sup", 3]], ["br"], "64 x 64 x 64"],
    ],
    [
        bgImagePage,
        "bg-black",
        "./assets/svo/0004.jpg",
        [
            "div.f1.gray",
            "2",
            ["sup", "7", ["sup", 3]],
            ["br"],
            "128 x 128 x 128",
        ],
    ],
    [
        bgImagePage,
        "bg-black",
        "./assets/svo/0005.jpg",
        [
            "div.f1.gray",
            "2",
            ["sup", "8", ["sup", 3]],
            ["br"],
            "256 x 256 x 256",
        ],
    ],
    [
        bgImagePage,
        "bg-black",
        "./assets/svo/0006.jpg",
        [
            "div.f1.gray",
            "2",
            ["sup", "9", ["sup", 3]],
            ["br"],
            "512 x 512 x 512",
        ],
    ],
    [
        bgImagePage,
        "bg-black",
        "./assets/svo/0007.jpg",
        [
            "div.f1.gray",
            "2",
            ["sup", "10", ["sup", 3]],
            ["br"],
            "(1+ billion samples!)",
        ],
    ],
    [bgImagePage, "bg-black", "./assets/svo/0008.jpg"],
    [bgImagePage, "bg-black", "./assets/svo/0009.jpg"],
    [bgImagePage, "bg-black", "./assets/svo/0010.jpg"],

    [bgImagePage, "bg-black", "./assets/raymarch/raymarch-cl-01.jpg"],
    [bgImagePage, "bg-black", "./assets/raymarch/gyroid-metal75.jpg"],
    [bgImagePage, "bg-black", "./assets/raymarch/raymarch-cl-08.jpg"],
    [bgImagePage, "bg-black", "./assets/raymarch/raymarch-cl-13.jpg"],

    // [titlePage, "", [link, "http://thi.ng/raymarchcl", "thi.ng/raymarchcl"]],

    [imagePage, "bg-black", "./assets/holo/0004.jpg"],

    [titlePage, "bg-black white", "Evolutionary Programming"],

    [imagePage, "bg-black", "./assets/holo/0002.jpg"],
    [imagePage, "bg-black", "./assets/holo/0003.jpg"],

    [bgImagePage, "bg-black", "./assets/holo/0005.jpg"],
    [bgImagePage, "bg-black", "./assets/holo/0006.jpg"],
    [bgImagePage, "bg-black", "./assets/holo/0007.jpg"],
    [bgImagePage, "bg-black", "./assets/holo/0008.jpg"],
    [bgImagePage, "bg-black", "./assets/holo/0009.jpg"],
    [bgImagePage, "bg-black", "./assets/holo/bismut.jpg"],
    [bgImagePage, "bg-black", "./assets/holo/0010.jpg"],

    [imagePage, "bg-black", "./assets/holo/barricelli.jpg"],

    [
        contentPage,
        "Barricellian reproduction",
        [
            link,
            "http://www.chilton-computing.org.uk/acl/literature/books/gamesplaying/p004.htm",
            "chilton-computing.org.uk/acl/literature/books/gamesplaying/",
        ],
        [
            codeBlock,
            `
integer array this generation, next generation [1 :512];
begin
    loop: for i : = 1 step 1 until 512 do
        begin
        n := j := this generation[i];
    reproduce: if j = 0 then goto next i;
        k := modulo 512 of (i) plus: (j);
        if next generation[k] > 0 then goto mutation
        else next generation[k] := n;
        j := this generation[k];
        goto reproduce;
    mutation:
    next i: end;
    copy next generation into this generation;
    goto loop;
end;`,
        ],
    ],

    [imagePage, "bg-black", "./assets/holo/0001.jpg"],
    [imagePage, "bg-black", "./assets/holo/0013.jpg"],

    [titlePage, "bg-black white", "Iterative Systems"],

    [
        contentPage,
        "Iterative Systems",
        "DeJong strange attractor",
        [
            codeBlock,
            `
(defn compute-dejong
    "Computes a single DeJong 2d point vector for given params and XY pos"
    [a b c d x y]
    [
        (+ (Math/sin (* a y)) (Math/cos (* (* b x) x)))
        (+ (Math/sin (* (* c x) x)) (Math/cos (* d y)))
    ])`,
        ],
    ],

    [imagePage, "bg-black", "./assets/lcom/0000.jpg"],
    [imagePage, "bg-black", "./assets/lcom/0001.jpg"],
    [bgImagePage, "bg-black", "./assets/lcom/0005.jpg"],
    [bgImagePage, "bg-black", "./assets/lcom/0007.jpg"],

    [ytVideo, "WyVI5vnp570"],

    [imagePage, "bg-white", "./assets/bot/03.jpg"],
    [imagePage, "bg-white", "./assets/bot/00.jpg"],
    [imagePage, "bg-white", "./assets/bot/01.jpg"],
    [imagePage, "bg-white", "./assets/bot/02.jpg"],

    [
        contentPage,
        "L-Systems",
        "Exponential growth through rule re-writing:",
        [codeBlock, "S = f-f-f-fs"],
        "Defines a rule named S which is iteratively expanded into:",
        [
            list,
            ["code", "f-f-f-fs"],
            ["code", "f-f-f-ff-f-f-fs"],
            ["code", "f-f-f-ff-f-f-ff-f-f-fs"],
            " etc.",
        ],
    ],

    [
        contentPage,
        "L-Systems",
        "Exponential growth through rule re-writing",
        [
            codeBlock,
            `
(def valid-syms
    {
        \\s :start, \\f :fwd, \\+ :right, \\- :left,
        \\x :x, \\y :y, \\z :z,
        \\[ :push, \\] :pop
    })

(def default-rules
    {
        :fwd [:fwd], :left [:left], :right [:right]
        :push [:push], :pop [:pop]
    })`,
        ],
    ],

    [
        contentPage,
        "L-Systems",
        "Exponential growth through rule re-writing",
        [
            codeBlock,
            `
(defn parse
    [src]
    (replace valid-syms src))

(parse "-yf+xfx+fy-")
; (:left :y :fwd :right :x :fwd :x :right :fwd :y :left)`,
        ],
    ],

    [
        contentPage,
        "L-Systems",
        "Exponential growth through rule re-writing",
        [
            codeBlock,
            `
(defn rewrite-symbols
    [rules syms]
    (mapcat (merge default-rules rules) syms))

(defn expand-with
    [rules n]
    (->> [:start]
         (iterate (partial rewrite-symbols rules))
         (take n)
         last))

(def rules
    {:x (parse "-yf+xfx+fy-") :y (parse "+xf-yfy-fx+") :start [:x]})`,
        ],
    ],

    [
        contentPage,
        "L-Systems",
        "Exponential growth through rule re-writing",
        [
            codeBlock,
            `
(expand-with rules 2)
; (:x)

(expand-with rules 3)
; (:left :y :fwd :right :x :fwd :x :right :fwd :y :left)

(expand-with rules 4)
; (:left :right :x :fwd :left :y :fwd :y :left :fwd :x :right :fwd :right :left
;  :y :fwd :right :x :fwd :x :right :fwd :y :left :fwd :left :y :fwd :right :x
;  :fwd :x :right :fwd :y :left :right :fwd :right :x :fwd :left :y :fwd :y :left
;  :fwd :x :right :left)

(count (expand-with rules 10))
; 218451`,
        ],
    ],

    [bgImagePage, "bg-black", "./assets/morphogen/20140925-desertrose.jpg"],
    [imagePage, "bg-white", "./assets/morphogen/morphogen-flower-graph.jpg"],
    [bgImagePage, "bg-black", "./assets/morphogen/morphogen-flower.gif"],
    [bgImagePage, "bg-black", "./assets/morphogen/morphogen-virus.jpg"],
    [bgImagePage, "bg-black", "./assets/morphogen/morphogen-virus.gif"],

    [titlePage, "bg-black white", "Linked Data / Visualizations"],

    [bgImagePage, "bg-black", "./assets/odi/20131011-white-agfa-optima200.jpg"],
    [bgImagePage, "bg-black", "./assets/odi/frame-0800-690spp-1280x960.jpg"],
    [imagePage, "bg-black", "./assets/odi/datagrid-women.jpg"],
    [imagePage, "bg-black", "./assets/odi/datagrid-knife.jpg"],
    [imagePage, "bg-black", "./assets/odi/datagrid-binge.jpg"],
    [imagePage, "bg-white", "./assets/ws2/query-example01.jpg"],
    [imagePage, "bg-white", "./assets/ws2/query-example02.jpg"],

    [imagePage, "bg-white", "./assets/ws2/edit.jpg"],
    [imagePage, "bg-white", "./assets/ws2/avgprice.jpg"],
    [imagePage, "bg-white", "./assets/ws2/chelsea.jpg"],
    [imagePage, "bg-white", "./assets/ws2/kingston.jpg"],
    [imagePage, "bg-white", "./assets/ws2/dotgraph.jpg"],
    [imagePage, "bg-white", "./assets/ws2/linegraph.jpg"],
    [imagePage, "bg-white", "./assets/ws2/airports.jpg"],
    [imagePage, "bg-white", "./assets/ws2/gradients.jpg"],
    [imagePage, "bg-white", "./assets/ws2/cosine.jpg"],

    [titlePage, "bg-black white", "Realtime"],

    [bgImagePage, "bg-black", "./assets/sjo2.jpg"],

    [titlePage, "bg-black white", "Personal Experience Report"],

    [
        quotePage,
        [
            `“I still believe in abstraction, but now I know that one ends with
    abstraction, not starts with it. I learned that one has to adapt
    abstractions to reality and not the other way around.”`,
        ],
        " Alexander Stepanov",
    ],

    [
        quotePage,
        [
            `"I'm never bored by simplicity. Show me a simpler way to do anything
    that I'm doing. I will jump on it."`,
        ],
        "Charles Moore",
    ],

    [
        contentPage,
        "The Joy of Clojure",
        [
            list,
            "Concision / Expressiveness",
            "Rich core API",
            "Sequence abstractions",
            "Immutability by default",
            "Hosted / x-platform",
            "Threading macros",
            "Transducers, core.async, clojure.spec",
            "Amount & quality of innovation",
            "Maturity / Community",
            "Gateway to various awesome tools / concepts",
        ],
    ],

    [
        contentPage,
        "(Unnecessary) uphill battle(s)",
        [
            "ul",
            ["li", "Concision / Expressiveness"],
            ["li.transition.o-0", "Rich core API"],
            ["li.transition.o-0", "Sequence abstractions"],
            ["li", "Immutability by default"],
            ["li", "Hosted / x-platform"],
            ["li.transition.o-0", "Threading macros"],
            ["li.transition.o-0", "Transducers, core.async, clojure.spec"],
            ["li.transition.o-0", "Amount & quality of innovation"],
            ["li", "Maturity / Community"],
            [
                "li.transition.o-0",
                "Gateway to various awesome tools / concepts",
            ],
        ],
    ],

    [
        quotePage,
        [`"Weeks of coding can save you`, `hours of planning."`],
        "Unknown",
    ],

    [
        quotePage,
        [`"Weeks of planning can save you`, `hours of coding."`],
        "Unknown",
    ],

    [
        contentPage,
        "(Unnecessary) uphill battle(s)",
        [
            list,
            "Immutability by default",
            "Almost zero docs about core internals",
            `Hard to optimize / "swimming against the stream"`,
            "Non-idiomatic, verbose syntax (when optimized)",
            "Implementation effort of custom datatypes",
            "Have to resort to macros to work around quirks / achieve DRY",
            `Effort vs. gain unpredictable/unacceptable (IMHO)`,
            `Protocol discrepancies between CLJ/CLJS`,
        ],
    ],

    [
        contentPage,
        "Immutability by default",
        "Areas where undesired / cumbersome:",
        [
            list,
            "Graphics",
            "DSP",
            "ML",
            "Tree editing (GA/GP, spatial accel etc.)",
            "Media processing",
            "Web workers (e.g. w/ SharedArrayBuffer)",
            "GPU / hardware / low-level interop (e.g. WASM)",
        ],
        ["div.f4", ["sup", "*"], "realtime"],
    ],

    [
        quotePage,
        [
            `"I would guess that most computers don't compute, they move bytes around."`,
        ],
        "Charles Moore",
    ],

    [titlePage, "bg-black white", "CLJ(S) vs ES6"],

    [
        contentPage,
        "Multi-methods (CLJS)",
        "Vector addition",
        [codeBlock, `(defmulti vadd (fn [a b] (count a)))`],
    ],

    [
        contentPage,
        "Multi-methods (CLJS)",
        "Vector addition",
        [
            codeBlock,
            `
(defmethod vadd 2
    [a b]
    [(+ (a 0) (b 0)) (+ (a 1) (b 1))])

(time (dotimes [i 1e7] (vadd [1 2] [10 20])))
; "Elapsed time: 3362.786341 msecs"`,
        ],
    ],

    [
        contentPage,
        "Multi-methods (CLJS)",
        "Vector addition",
        [
            codeBlock,
            `
(defmethod vadd 3
    [a b]
    [(+ (a 0) (b 0)) (+ (a 1) (b 1)) (+ (a 2) (b 2))])

(time (dotimes [i 1e7] (vadd [1 2 3] [10 20 30])))
; "Elapsed time: 3942.254367 msecs"`,
        ],
    ],

    [
        contentPage,
        "Multi-methods (CLJS)",
        "Using native JS arrays...",
        [
            codeBlock,
            `
(defmethod vadd 2
    [a b]
    #js [(+ (aget a 0) (aget b 0)) (+ (aget a 1) (aget b 1))])

(time (dotimes [i 1e7] (vadd #js [1 2] #js [10 20])))
; "Elapsed time: 1905.684968 msecs"`,
        ],
        "~1.8x faster, but brittle solution",
    ],

    [
        contentPage,
        "Multi-methods (CLJS)",
        "Vector addition (arbitrary length)",
        [
            codeBlock,
            `
(defmethod vadd :default
    [a b]
    (mapv (fn [aa bb] (+ aa bb)) a b))

(time (dotimes [i 1e7] (add [1 2 3 4 5 6 7 8] [1 2 3 4 5 6 7 8])))
; "Elapsed time: 36108.277508 msecs"`,
        ],
    ],

    [
        contentPage,
        "Multi-methods (CLJS)",
        "Using manual loop & transients",
        [
            codeBlock,
            `
(defmethod add :default
    [a b]
    (loop [acc (transient[]), i 0, n (count a)]
        (if (< i n)
            (recur (assoc! acc i (+ (a i) (b i))) (inc i) n)
            (persistent! acc))))

(time (dotimes [i 1e7] (add [1 2 3 4 5 6 7 8] [1 2 3 4 5 6 7 8])))
; "Elapsed time: 15168.490184 msecs"`,
        ],
        "2.4x faster, but hardly idiomatic",
    ],

    [
        contentPage,
        "Multi-methods (ES6)",
        "Vector addition",
        [
            codeBlock,
            `

vadd = defmulti((a, b) => a.length);

vadd.add(2, (a, b) => [a[0] + b[0], a[1] + b[1]]);

b.bench(() => vadd([1, 2], [10, 20]), 1e7);
// 544ms`,
        ],
    ],

    [
        contentPage,
        "Multi-methods (ES6)",
        "Vector addition",
        [
            codeBlock,
            `
vadd.add(3, (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]])

bench(() => vadd([1, 2, 3], [10, 20, 30]), 1e7)
// 584ms`,
        ],
        "6x faster",
    ],

    [
        contentPage,
        "Multi-methods (ES6)",
        "Vector addition (arbitrary length)",
        [
            codeBlock,
            `
vadd.add(DEFAULT, (a, b) => a.map((a, i) => a + b[i]))

bench(() => add([1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3, 4, 5, 6, 7, 8]), 1e7)
// 698ms`,
        ],
        ["div", "only ~100ms more than Vec3"],
        ["div", "50x faster than idiomatic CLJS"],
    ],

    [titlePage, "", [link, "http://thi.ng/umbrella", "thi.ng/umbrella"]],

    [
        quotePage,
        [
            `"Society created institutions in order to serve society.
[...] these institutions have all become counterproductive
to their original intent because they now exist to benefit
themselves rather than the betterment of society."`,
        ],
        "Ivan Illich",
    ],

    [
        titlePage,
        "bg-black white",
        "Thanks :)",
        [twitterLink, "toxi"],
        ["br"],
        [twitterLink, "thing_umbrella"],
        ["br"],
        [link, "https://medium.com/@thi.ng", "medium.com/@thi.ng"],
        ["br"],
        ["p.blue", "media.thi.ng/2018/talks/clojurex/"],
    ],
];
