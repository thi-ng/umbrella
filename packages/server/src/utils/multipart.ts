import { findSequence } from "@thi.ng/arrays";
import { illegalArgs } from "@thi.ng/errors";
import type { IncomingMessage } from "node:http";
import type { Readable } from "node:stream";

export interface MultipartPart {
	headers: Record<string, string>;
	body: string | Uint8Array;
}

const DECODER = new TextDecoder();

export const parseRequestMultipartData = (req: IncomingMessage) => {
	const ctype = req.headers["content-type"];
	if (!ctype) illegalArgs("missing content-type");
	const boundary = /boundary=([a-z0-9-]+)/i.exec(ctype!);
	if (!boundary) illegalArgs("missing boundary");
	return parseMultipartData(req, boundary![1]);
};

export async function* parseMultipartData(req: Readable, boundary: string) {
	const parser = chunkParser(boundary);
	for await (let chunk of req) yield* parser(chunk);
}

export const chunkParser = (boundary: string) => {
	const boundaryBytes = new TextEncoder().encode(boundary);
	let buf = new Uint8Array(0);
	let from = 0;
	return function* (chunk: Buffer) {
		const $buf = new Uint8Array(buf.length + chunk.length);
		$buf.set(buf);
		$buf.set(chunk, buf.length);
		buf = $buf;
		while (buf!.length) {
			const idx = findSequence(buf!, boundaryBytes, from);
			if (idx < 0) {
				from = Math.max(buf.length - boundaryBytes.length + 1, 0);
				return;
			}
			if (idx >= 4) {
				yield parsePart(buf!.slice(2, idx - 4));
			}
			buf = buf!.slice(idx + boundaryBytes.length);
			from = 0;
		}
	};
};

const MPART_SEP = [0xd, 0xa, 0xd, 0xa];

export const parsePart = (buf: Uint8Array): MultipartPart => {
	const idx = findSequence(buf, MPART_SEP);
	if (idx < 0) illegalArgs("invalid multipart data");
	const headers = DECODER.decode(buf.slice(0, idx))
		.split("\r\n")
		.reduce((acc, x) => {
			const idx = x.indexOf(":");
			let key = x.substring(0, idx).toLowerCase();
			let val = x.substring(idx + 1).trim();
			if (key === "content-disposition") {
				const name = /name="([a-z0-9_.-]{1,64})"/i.exec(val);
				if (name) acc["name"] = name[1];
				const filename =
					/filename="([a-z0-9_.+\-~@ ()\[\]]{1,128})"/i.exec(val);
				if (filename) acc["filename"] = filename[1];
			}
			acc[key] = val;
			return acc;
		}, <Record<string, string>>{});
	const body = buf.slice(idx + 4);
	return headers["content-type"]
		? { headers, body }
		: { headers, body: DECODER.decode(body) };
};
