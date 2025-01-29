import { NULL_LOGGER } from "@thi.ng/logger";
import { expect, test } from "bun:test";
import { join, resolve } from "node:path";
import {
	cacheControl,
	crossOriginOpenerPolicy,
	crossOriginResourcePolicy,
	etagFileHash,
	injectHeaders,
	logRequest,
	logResponse,
	parseCoookies,
	parseQuerystring,
	referrerPolicy,
	Server,
	serverSession,
	staticFiles,
	strictTransportSecurity,
} from "../src/index.js";

test("server", async (done) => {
	type TestSession = { id: string; user?: string };
	const server = new Server({
		logger: NULL_LOGGER,
		routes: [
			staticFiles({
				rootDir: join(resolve(__dirname), "fixtures"),
				etag: etagFileHash(),
				compress: true,
			}),
			{
				id: "hello",
				match: "/hello/?name",
				handlers: {
					get: async ({ cookies, res, match, query }) => {
						expect(cookies).toBeObject();
						expect(query).toBeObject();
						res.writeHead(200, {
							"content-type": "text/plain",
						}).end(
							`hello, ${match.params?.name} (${
								query.name ?? "n/a"
							})`
						);
					},
				},
			},
		],
		intercept: [
			logRequest(),
			logResponse(),
			referrerPolicy(),
			crossOriginOpenerPolicy(),
			crossOriginResourcePolicy(),
			strictTransportSecurity(3600),
			cacheControl({ maxAge: 3600, mustRevalidate: true }),
			injectHeaders({ "x-foo": "bar" }),
			serverSession<TestSession>({
				factory: (ctx) => ({ id: "1234", user: ctx.cookies?.name }),
			}),
			{
				pre: ({ res }) => {
					expect(res.getHeader("cache-control")).toBe(
						"max-age=3600, must-revalidate"
					);
					expect(res.getHeader("cross-origin-opener-policy")).toBe(
						"same-origin"
					);
					expect(res.getHeader("cross-origin-resource-policy")).toBe(
						"same-origin"
					);
					expect(res.getHeader("referrer-policy")).toBe(
						"no-referrer"
					);

					expect(res.getHeader("strict-transport-security")).toBe(
						"max-age=3600; includeSubDomains"
					);
					return true;
				},
			},
			// test we can read session info and add additional cookie
			{
				pre: ({ res, session }) => {
					res.appendHeader(
						"set-cookie",
						`user=${(<TestSession>session)?.user}`
					);
					return true;
				},
			},
		],
	});
	await server.start();

	let res = await fetch("http://localhost:8080/hello/world?name=test", {
		headers: { "set-cookie": "name=test;" },
	});
	// console.log(res.headers);
	expect(res.status).toBe(200);
	expect(res.headers.get("content-type")).toBe("text/plain");
	expect(res.headers.get("x-foo")).toBe("bar");
	expect(res.headers.get("set-cookie")).toEqual(
		"__sid=1234;Max-Age=3600;Secure;HttpOnly;SameSite=Strict;Path=/, user=test"
	);
	expect(await res.text()).toBe("hello, world (test)");

	res = await fetch("http://localhost:8080/static/foo/bar.json", {
		method: "HEAD",
	});
	expect(res.status).toBe(200);
	expect(res.headers.get("content-type")).toBe("application/json");
	expect(res.headers.get("etag")).toBe("d06f04fccf68d0b228a5923187ce1afd");

	res = await fetch("http://localhost:8080/static/foo/bar.json");
	expect(res.status).toBe(200);
	expect(res.headers.get("content-type")).toBe("application/json");
	expect(res.headers.get("content-encoding")).toBe("br");
	expect(res.headers.get("set-cookie")).toEqual(
		"__sid=1234;Max-Age=3600;Secure;HttpOnly;SameSite=Strict;Path=/, user=undefined"
	);
	expect(await res.json()).toEqual({ status: "ok" });

	res = await fetch("http://localhost:8080/static/../foo/bar.json");
	expect(res.status).toBe(404);

	res = await fetch("http://localhost:8080/static/foo/bar.json_");
	expect(res.status).toBe(404);

	res = await fetch("http://localhost:8080/hello/x?[]=1");
	expect(res.status).toBe(500);

	await server.stop();
	done();
});

test("parseCookies", () => {
	expect(parseCoookies("")).toEqual({});
	expect(parseCoookies(";")).toEqual({});
	expect(parseCoookies("a=b")).toEqual({ a: "b" });
	expect(parseCoookies("a=%62; ")).toEqual({ a: "b" });
	expect(parseCoookies("a=%62 ; ")).toEqual({ a: "b" });
	expect(parseCoookies("a=b;c=d")).toEqual({ a: "b", c: "d" });
	expect(parseCoookies("a=b; c=d")).toEqual({ a: "b", c: "d" });
	expect(parseCoookies("a=b;Path=/;Secure;SameSite=Strict; c=d")).toEqual({
		a: "b",
		c: "d",
	});
	expect(parseCoookies("a=b;Path=/foo")).toEqual({});
	expect(parseCoookies("a=%62;Path=/foo", { path: "/foo/bar" })).toEqual({
		a: "b",
	});
	expect(parseCoookies("a=b;Domain=.")).toEqual({ a: "b" });
	expect(parseCoookies("a=b;Domain=thi.ng")).toEqual({});
	expect(parseCoookies("a=b;Domain=thi.ng;c=d")).toEqual({ c: "d" });
	expect(parseCoookies("a=b;Domain=thi.ng", { domain: "thi.ng" })).toEqual({
		a: "b",
	});
	expect(
		parseCoookies("a=b;Domain=thi.ng", { domain: "test.thi.ng" })
	).toEqual({
		a: "b",
	});
});

test("parseQueryString", () => {
	expect(parseQuerystring("?")).toEqual({});
	expect(parseQuerystring("?a=")).toEqual({ a: "" });
	expect(parseQuerystring("?a=123&b=xyz")).toEqual({ a: "123", b: "xyz" });
	expect(parseQuerystring("/hello?a=123&b=xyz")).toEqual({
		a: "123",
		b: "xyz",
	});
	expect(parseQuerystring("?a[]=1")).toEqual({ a: ["1"] });
	expect(parseQuerystring("?a[b]=1")).toEqual({ a: { b: "1" } });
	expect(parseQuerystring("?a[b][0]=1")).toEqual({ a: { b: { 0: "1" } } });
	expect(parseQuerystring("?a[b][0]=[1]&b[0]=[2]")).toEqual({
		a: { b: { 0: "[1]" } },
		b: { 0: "[2]" },
	});
	expect(parseQuerystring("?a[__proto__]=1")).toEqual({});
	expect(parseQuerystring("?__proto__=1")).toEqual({});
	expect(() => parseQuerystring("?[0]=1")).toThrow();
	expect(() => parseQuerystring("?a[=1")).toThrow();
});
