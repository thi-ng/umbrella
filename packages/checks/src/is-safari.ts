// SPDX-License-Identifier: Apache-2.0
import { isChrome } from "./is-chrome.js";

export const isSafari = () =>
	typeof navigator !== "undefined" &&
	/Safari/.test(navigator.userAgent) &&
	!isChrome();
