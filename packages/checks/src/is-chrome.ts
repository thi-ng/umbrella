// SPDX-License-Identifier: Apache-2.0
export const isChrome = () =>
	typeof window !== "undefined" && !!(<any>window)["chrome"];
