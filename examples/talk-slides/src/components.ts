export const link = (ctx: any, href: string, body?: any) => [
	"a",
	{ ...ctx.link, href },
	body || href,
];

export const twitterLink = (_: any, username: string) => [
	link,
	`https://twitter.com/${username}`,
	"@" + username,
];

export const navButton = (ctx: any, step: number) => [
	"a",
	{
		...ctx.navButton[step < 0 ? "prev" : "next"],
		onclick: () => ctx.slide.next(step),
	},
	step < 0 ? "<" : ">",
];

export const footer = (ctx: any, ...body: any[]) => [
	"footer",
	ctx.footer,
	...body,
];

export const codeBlock = (ctx: any, body: string) => [
	"pre",
	ctx.code,
	body.trim(),
];

export const list = (ctx: any, ...items: any[]) => [
	"ul",
	ctx.list,
	...items.map((i) => ["li", i]),
];

export const titlePage = (
	ctx: any,
	clazz: string,
	title: string,
	...body: any[]
) => [
	"div",
	{
		...ctx.titlePage.root,
		class: `${ctx.titlePage.root.class} ${clazz}`,
	},
	[
		"div",
		ctx.titlePage.wrapper,
		[
			"div",
			["h1", ctx.titlePage.title, title],
			["div", ctx.titlePage.body, ...body],
		],
	],
];

export const contentPage = (ctx: any, title: string, ...body: any[]) => [
	"div",
	ctx.contentPage.root,
	["h2", ctx.contentPage.title, title],
	["div", ctx.contentPage.body, ...body],
];

export const quotePage = (ctx: any, quote: any[], author: string) => [
	"div",
	ctx.quotePage.root,
	["div", ctx.quotePage.quote, ...quote.map((x) => ["div", x])],
	["div", ctx.quotePage.author, `— ${author}`],
];

export const bgImagePage = (
	ctx: any,
	clazz: string,
	src: string,
	...extra: any[]
) => [
	"div",
	{
		class: `${ctx.bgImagePage.class} ${clazz}`,
		style: {
			"background-image": `url(${src})`,
			"background-size": "cover",
			"background-position": "center",
		},
	},
	...extra,
];

export const imagePage = (ctx: any, clazz: string, src: string) => [
	"div",
	{ ...ctx.imagePage.root, class: `${ctx.imagePage.root.class} ${clazz}` },
	["div.w-100", ["img", { ...ctx.imagePage.img, src }]],
];

export const ytVideo = (ctx: any, id: string) => [
	"div",
	[
		"iframe",
		{
			...ctx.youtube,
			src: `https://www.youtube.com/embed/${id}?rel=0&amp;showinfo=0`,
			frameborder: 0,
			allowfullscreen: true,
		},
	],
	[navButton, -1],
	[navButton, 1],
];

export const app =
	(slideCount: number, ctx: any) =>
	({ slideID, content, time }: any) =>
		[
			"div",
			ctx.app.root,
			content,
			[
				footer,
				["div.w-33.tl", ctx.app.credits],
				["div.w-34.tc", time],
				["div.w-33.tr", `${slideID} / ${slideCount - 1}`],
			],
		];

export const printApp = (ctx: any, slides: any[]) => [
	"div",
	...slides.map((content) => ["div.slide", ctx.app.root, content]),
];
