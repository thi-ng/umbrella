// SPDX-License-Identifier: Apache-2.0
import { isString } from "@thi.ng/checks";
import type { Interceptor } from "../api.js";

/**
 * Pre-interceptor to check `User-Agent` header against given regexp. If the
 * regexp matches, triggers a HTTP 403 response and terminates the request.
 *
 * @param patterns
 */
export const rejectUserAgents = (patterns: string | RegExp): Interceptor => {
	const regexp = isString(patterns) ? new RegExp(patterns) : patterns;
	return {
		pre: (ctx) => {
			const ua = ctx.req.headers["user-agent"];
			if (ua && regexp.test(ua)) {
				ctx.res.forbidden();
				return false;
			}
			return true;
		},
	};
};

/**
 * String defining partial regexp of known AI bot names in `User-Agent` header.
 *
 * Source: https://github.com/qwebltd/Useful-scripts/blob/main/Bash%20scripts%20for%20Linux/nginx-badbot-forbids.conf
 */
export const USER_AGENT_AI_BOTS =
	"AI2Bot|Anthropic|BrightBot|ByteDance|ByteSpider|CCBot|ChatGPT|ClaudeBot|Claude-Web|Cohere-AI|Cohere-Training-Data-Crawler|DiffBot|DuckAssistBot|FriendlyCrawler|Friendly_Crawler|Google-CloudVertexBot|GPTBot|ICC-Crawler|Img2Dataset|Kangaroo Bot|MLBot|OAI-SearchBot|PanguBot|Sentibot|VelenPublicWebCrawler|Webzio-Extended";

/**
 * String defining partial regexp of known crawlers & scraper names in `User-Agent` header.
 *
 * Source: https://github.com/qwebltd/Useful-scripts/blob/main/Bash%20scripts%20for%20Linux/nginx-rate-limiting.conf
 */
export const USER_AGENT_SCRAPERS =
	"008|AddSugarSpiderBot|AdsBot|AhrefsBot|AmazonBot|Arachmo|Barkrowler|BimBot|BlexBot|Boitho.com|BTBot|ConveraCrawler|DiamondBot|DotBot|Earthcom.info|EmeraldShield.com|EsperanzaBot|FacebookBot|Fast Enterprise|FindLinks|FurlBot|FyberSpider|GaisBot|GigaBot|GirafaBot|GoogleOther|Go-HTTP-Client|HL_Ftien_Spider|Holmes|HTDig|ICCrawler|Ichiro|IgdeSpyder|ImageSiftBot|IonCrawl|IRLbot|ISSCyberRiskCrawler|IssueCrawler|Jaxified Bot|JyxoBot|KoepaBot|Kototoi.org|Larbin|LDSpider|LinkWalker|LMSpider|Lwp-Trivial|L.Webis|Mabontland|Magpie-Crawler|Mail.RU_Bot|Masscan-NG|Meltwater|Meta-ExternalAgent|Mogimogi|MoreoverBot|Morning Paper|MSRBot|MVAClient|MXBot|NetResearchServer|NetSeer Crawler|NewsGator|NiceBot|NUSearch Spider|Nutch|Nymesis|OmniExplorer_Bot|OrbBot|OozBot|PageBitesHyperBot|Peer39_Crawler|PolyBot|PSBot|PycUrl|Qseero|Radian6|RampyBot|RufusBot|SandCrawler|SBIder|Scrapy|SeekBot|SemanticDiscovery|Semrush|Sensis Web Crawler|SEOChat|Shim-Crawler|SiteBot|Snappy|SurveyBot|Sqworm|SuggyBot|SynooBot|TerrawizBot|TheSuBot|Thumbnail.cz|TimpiBot|TinEye|TruwoGPS|TurnItInBot|TweetedTimes Bot|UrlFileBot|Vagabondo|Vortex|Voyager|VYU2|WebCollage|Wf84|WomlpeFactory|Xaldon_WebSpider|Yacy|YasakliBot";
