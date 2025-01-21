// SPDX-License-Identifier: Apache-2.0
export const isDataURL = (x: string) => /^data:.+\/(.+);base64,/.test(x);
