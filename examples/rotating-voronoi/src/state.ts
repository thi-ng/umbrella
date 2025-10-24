// SPDX-License-Identifier: Apache-2.0
import type { IObjectOf } from "@thi.ng/api";
import {
	fromDOMEvent,
	fromObject,
	fromRAF,
	sidechainToggle,
	StreamSync,
	sync,
	type ISubscription,
} from "@thi.ng/rstream";
import { count, mapcat, scan } from "@thi.ng/transducers";

export interface AppState {
	speed: number;
	inset: number;
	iter: number;
	animate: boolean;
	showCells: boolean;
	frame: number;
	key: string | null;
}

export const appState = fromObject(<AppState>{
	speed: 0.3,
	inset: 3,
	iter: 3,
	frame: 0,
	animate: true,
	showCells: true,
	key: null,
}).streams;

sidechainToggle(fromRAF(), appState.animate)
	.transform(scan(count()))
	.subscribe(appState.frame);

fromDOMEvent(document, "keyup")
	.transform(mapcat((x) => [x.key, null]))
	.subscribe(appState.key);

export const mainStream = sync({ src: appState });
