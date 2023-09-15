import type { Nullable } from "@thi.ng/api";
import { defFormat } from "@thi.ng/date";
import { anchor, div } from "@thi.ng/hiccup-html";
import type { ISubscriber } from "@thi.ng/rstream";
import { unitless } from "@thi.ng/strings";
import type { MediaItem, Message } from "../api.js";
import { mediaAttachments } from "./media.js";

const fmt = defFormat(["dd", " ", "MMM", " ", "yyyy", " ", "HH", ":", "mm"]);

export const message = (
	{ url, content, media, replies, likes, boosts, date }: Message,
	mediaSel: ISubscriber<Nullable<MediaItem>>
) =>
	div(
		".ma3.pv3.ph4.bg-near-black.ba.br3.bw1.b--white-10.overflow-x-hidden",
		{},
		// message body is a collection of hiccup elements (parsed & cleaned from HTML)
		// see: transformContent() & transformMessage() functions
		...content,
		// media previews
		mediaAttachments(media, mediaSel),
		// message metadata
		div(
			".f7.gray",
			{},
			anchor(".link.gray", {}, `↺ ${unitless(replies)}`),
			anchor(".link.gray.ml3", {}, `❤️ ${unitless(likes)}`),
			anchor(".link.gray.ml3", {}, `🚀 ${unitless(boosts)}`),
			anchor(".link.gray.ml3", { href: url }, fmt(date))
		)
	);
