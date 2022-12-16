import type { Fn3, IObjectOf } from "@thi.ng/api";
import type { ILogger } from "@thi.ng/logger";

/**
 * Template functions receive the current {@link TranscludeCtx} and array of
 * (raw) template arguments and the path of the current file.
 */
export type TemplateFn<T = any> = Fn3<
	TranscludeCtx<T>,
	string[],
	string,
	string
>;

export interface TranscludeCtx<T = any> {
	/**
	 * User provided data of type `T`
	 */
	user: T;
	logger: ILogger;
	/**
	 * Object of all known templates in this context.
	 */
	templates: IObjectOf<TemplateFn<T> | string>;
	/**
	 * Global pre-processing functions, in order of application. Receives entire
	 * file contents as first and only template arg, MUST return entire updated
	 * file contents.
	 */
	pre: TemplateFn<T>[];
	/**
	 * Global post-processing functions, in order of application. Receives
	 * entire file contents as first and only template arg, MUST return entire
	 * updated file contents.
	 */
	post: TemplateFn<T>[];
	/**
	 * Current contents to be processed.
	 */
	src: string;
	/**
	 * Template tag match regexp.
	 */
	match: RegExp;
	/**
	 * Line ending to be used for templates generating lists or other multi-line
	 * content.
	 *
	 * @defaultValue "\n"
	 */
	eol: string;
}
