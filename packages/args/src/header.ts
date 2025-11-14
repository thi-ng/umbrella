// SPDX-License-Identifier: Apache-2.0
/**
 * Re-usable logo header for various thi.ng CLI tools.
 *
 * @param name
 * @param version
 * @param desc
 *
 * @internal
 */
export const THING_HEADER = (name: string, version: string, desc: string) => `
 █ █   █           │
██ █               │
 █ █ █ █   █ █ █ █ │ ${name} v${version}
 █ █ █ █ █ █ █ █ █ │ ${desc}
                 █ │
               █ █ │`;
