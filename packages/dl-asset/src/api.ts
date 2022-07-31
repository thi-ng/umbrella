export interface DownloadOpts {
	/**
	 * MIME type. If not given, attempts to derive MIME type from given
	 * filename extension (e.g. `.svg`) and if that fails, falls back to
	 * default value.
	 *
	 * @defaultValue application/octet-stream
	 */
	mime: string;
	/**
	 * If true, converts source string to UTF-8. Only used if input is a
	 * string.
	 *
	 * @defaultValue false
	 */
	utf8: boolean;
	/**
	 * Expiry time for generated object URL. Use value < 0 to disable.
	 *
	 * @defaultValue 10000
	 */
	expire: number;
}

/**
 * User options for {@link canvasRecorder}.
 */
export interface CanvasRecorderOpts
	extends Pick<
		MediaRecorderOptions,
		"mimeType" | "bitsPerSecond" | "videoBitsPerSecond"
	> {
	/**
	 * Recording frame rate (fps)
	 *
	 * @defaultValue 60
	 */
	fps: number;
}
