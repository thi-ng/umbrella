import type { ComponentLike } from "@thi.ng/rdom";

export interface Account {
	id: string;
	username: string;
	name: string;
	url: string;
	bio: ComponentLike[];
	avatar: string;
	header: string;
}

export interface Message {
	id: string;
	url: string;
	date: number;
	tags: string[];
	content: ComponentLike[];
	media: MediaItem[];
	sensitive: boolean;
	reblog: boolean;
	likes: number;
	boosts: number;
	replies: number;
}

export interface MediaItem {
	id: string;
	type: string;
	url: string;
	preview: string;
	description: string;
	width: number;
	height: number;
}

export const LINK_COLOR = "white";
export const TAG_COLOR = "gold";
export const BUTTON_COLOR = "bg-gold.black";
