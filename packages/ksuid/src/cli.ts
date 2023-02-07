import { defKSUID32 } from "./ksuid32.js";

const bytes = parseInt(process.argv[3] || "16");

process.stdout.write(defKSUID32({ bytes }).next() + "\n");
