// SPDX-License-Identifier: Apache-2.0
import { channel } from "@thi.ng/csp";

// app logger component is a simple CSP channel
export const initLogger = async () => channel<string>();
