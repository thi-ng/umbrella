// SPDX-License-Identifier: Apache-2.0
export const isFirefox = () =>
	typeof window !== "undefined" && !!(<any>window)["InstallTrigger"];
