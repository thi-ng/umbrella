// SPDX-License-Identifier: Apache-2.0
export const list = (items: string[]) => items.map((x) => `- ${x}`).join("\n");
