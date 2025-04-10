// SPDX-License-Identifier: Apache-2.0
declare var SharedArrayBuffer: any;

export const isTransferable = (x: any) =>
	x instanceof ArrayBuffer ||
	(typeof SharedArrayBuffer !== "undefined" &&
		x instanceof SharedArrayBuffer) ||
	(typeof MessagePort !== "undefined" && x instanceof MessagePort);
