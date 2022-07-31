export const state = {
	foo: {
		open: false,
		items: [
			"Action",
			"Animation",
			"Comedy",
			"Crime",
			"Documentary",
			"Drama",
			"Fantasy",
			"Horror",
			"Kids",
			"Romance",
			"Sci-Fi",
			"Sport",
			"Thriller",
			"War",
			"Western",
		].map((x, i) => [i, x]),
	},
	bar: {
		open: false,
		items: [
			"Africa",
			"Asia",
			"Caribbean",
			"Central America",
			"Europe",
			"Middle East",
			"North America",
			"Oceania",
			"South America",
		].map((x, i) => [i, x]),
	},
};

export const theme = {
	root: {
		class: "sans-serif",
	},
	column: {
		class: "fl w-100 w-50-ns w-33-l pa2",
	},
	dd: {
		root: { class: "" },
		bodyClosed: {
			style: {
				"max-height": 0,
				"overflow-y": "hidden",
				opacity: 0,
			},
		},
		bodyOpen: {
			style: {
				"max-height": "calc(11 * 1.8rem)",
				"overflow-y": "scroll",
				opacity: 1,
				transition: "all 100ms ease-in",
			},
		},
		item: {
			class: "pointer link db w-100 ph3 pv2 black hover-bg-washed-green bg-animate bb b--moon-gray",
		},
		itemSelected: {
			class: "pointer link db w-100 ph3 pv2 black hover-bg-light-gray bg-animate bb b--moon-gray b",
		},
	},
};
