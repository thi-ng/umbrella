import { selectThresholdMin } from "@thi.ng/arrays";
import { defBidirIndex, unionR } from "@thi.ng/associative";
import { defBitField } from "@thi.ng/bitfield";
import { pluck, transduce } from "@thi.ng/transducers";
import type { Item } from "./api.js";
import T00 from "./thumb/0000.jpg";
import T01 from "./thumb/0001.jpg";
import T02 from "./thumb/0002.jpg";
import T03 from "./thumb/0003.jpg";
import T04 from "./thumb/0004.jpg";
import T05 from "./thumb/0005.jpg";
import T06 from "./thumb/0006.jpg";
import T07 from "./thumb/0007.jpg";
import T08 from "./thumb/0008.jpg";
import T09 from "./thumb/0009.jpg";
import T10 from "./thumb/0010.jpg";
import T11 from "./thumb/0011.jpg";
import T12 from "./thumb/0012.jpg";
import T13 from "./thumb/0013.jpg";
import T14 from "./thumb/0014.jpg";
import T15 from "./thumb/0015.jpg";
import T16 from "./thumb/0016.jpg";
import T17 from "./thumb/0017.jpg";
import T18 from "./thumb/0018.jpg";
import T19 from "./thumb/0019.jpg";
import T20 from "./thumb/0020.jpg";
import T21 from "./thumb/0021.jpg";
import T22 from "./thumb/0022.jpg";
import T23 from "./thumb/0023.jpg";
import T24 from "./thumb/0024.jpg";

// our "database" is merely an array of image items, each with their URL and
// some tags. later on, in the initDB() function, we will add additional derived
// data points for each item/image
export const DB: Item[] = [
	{
		url: T00,
		tags: [
			"zugspitze",
			"silhouette",
			"mountain",
			"clouds",
			"sky",
			"sunset",
			"trees",
		],
	},
	{
		url: T01,
		tags: ["silhouette", "mountain", "haze", "trees", "autumn"],
	},
	{
		url: T02,
		tags: [
			"mountain",
			"trees",
			"autumn",
			"lake",
			"water",
			"sky",
			"clouds",
			"reflection",
		],
	},
	{
		url: T03,
		tags: ["rock", "house", "wood", "sky", "blue", "trees"],
	},
	{
		url: T04,
		tags: ["rock", "trees", "lake", "water", "reflection"],
	},
	{
		url: T05,
		tags: ["valley", "trees", "sunset", "haze", "sky"],
	},
	{
		url: T06,
		tags: [
			"zugspitze",
			"trees",
			"sunset",
			"silhouette",
			"rock",
			"mountain",
			"sky",
			"blue",
		],
	},
	{
		url: T07,
		tags: [
			"lake",
			"mountain",
			"haze",
			"trees",
			"snow",
			"grass",
			"reflection",
		],
	},
	{
		url: T08,
		tags: ["sunset", "mountain", "snow", "clouds", "silhouette"],
	},
	{
		url: T09,
		tags: ["rock", "mountain", "snow", "valley", "path", "grass"],
	},
	{
		url: T10,
		tags: ["path", "mountain", "sky", "grass", "clouds"],
	},
	{
		url: T11,
		tags: ["path", "mountain", "sky", "snow", "grass"],
	},
	{
		url: T12,
		tags: ["trees", "snow", "sky", "winter", "blue"],
	},
	{
		url: T13,
		tags: ["clouds", "sky"],
	},
	{
		url: T14,
		tags: ["water", "waterfall", "canyon", "moss"],
	},
	{
		url: T15,
		tags: ["water", "canyon", "rock", "blue"],
	},
	{
		url: T16,
		tags: ["castle", "trees", "rock"],
	},
	{
		url: T17,
		tags: ["castle", "trees", "rock", "mountain"],
	},
	{
		url: T18,
		tags: ["mountain", "rock", "haze", "grass"],
	},
	{
		url: T19,
		tags: ["mountain", "path", "sky", "blue", "grass"],
	},
	{
		url: T20,
		tags: ["mountain", "haze", "sky", "silhouette"],
	},
	{
		url: T21,
		tags: ["mountain", "haze", "sky", "silhouette", "rocks"],
	},
	{
		url: T22,
		tags: [
			"mountain",
			"haze",
			"sky",
			"sunset",
			"trees",
			"valley",
			"clouds",
		],
	},
	{
		url: T23,
		tags: ["mountain", "haze", "trees", "valley", "autumn"],
	},
	{
		url: T24,
		tags: ["trees", "snow", "sky", "clouds", "winter"],
	},
];

// initialize database and compute additional data for each item
export const initDB = () => {
	// build a function to transform aspect ratios to tags
	const classifyAspect = selectThresholdMin(
		{ 0.99: "portrait", 1.01: "square" },
		"landscape"
	);
	// add a new tag for each image based on its aspect ratio
	// e.g. for an aspect of 0.66 we will add the "portrait" tag
	DB.forEach((x) => x.tags.push(classifyAspect(x.aspect!)));

	// build an index of all unique tags. this index is actually bidirectional
	// (i.e. here mapping tags to numeric IDs and vice versa), but we're only
	// using the forward direction here...
	// https://docs.thi.ng/umbrella/associative/classes/BidirIndex.html
	const tagIndex = defBidirIndex(
		// build the set union of all tags of all images
		transduce(pluck("tags"), unionR<string>(), DB)
	);

	// now encode each image's list of tags into a bitfield (i.e. we only need a
	// single bit per tag to indicate if that tag is present or not)...

	// a simple example: assuming our unique tags are "a", "b", "c", our
	// `tagIndex` would record: `a => 0, b => 1, c => 2`. since there're only 3
	// unique tags in total, we will create a 3-bit field for each item. if an
	// item has tags "a" & "b" the bitfield will be 110, if "a" & "c" => 101 or
	// if all tags are present 111. if an item is untagged, the bits are 000...

	// we're not encoding the bits here directly but use the BitField class of
	// thi.ng/bitfield to handle the actual bitpacking & storage. we merely
	// supply an array like [1,1,0] and can later use that class to easily
	// compute similarity scores between the various fields...
	DB.forEach((x) => {
		// sort tags for later UI purposes
		x.tags.sort();
		// encode tags as bitfield
		x.encoded = defBitField(
			x.tags.reduce(
				// for each tag used, set bit at corresponding index
				(acc, x) => ((acc[tagIndex.get(x)!] = 1), acc),
				// just an easy way to initialize an array prefilled with zeros
				new Uint8Array(tagIndex.size)
			)
		);
	});
};
