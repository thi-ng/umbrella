import type { NumericArray } from "@thi.ng/api";

export interface IFD {
	[key: number]: IFDEntry;
}

export type IFDEntry = NumericArray | Rational[] | string | IFD[];

export type Rational = [number, number];

/**
 * Common TIFF IFD tags
 *
 * Reference: https://exiftool.org/TagNames/EXIF.html
 */
export const Tag = {
	NewSubfileType: 0xfe,
	SubfileType: 0xff,

	ImageWidth: 0x100,
	ImageLength: 0x101,
	BitsPerSample: 0x102,
	Compression: 0x103,
	PhotometricInterpretation: 0x106,
	FillOrder: 0x10a,
	DocumentName: 0x10d,
	StripOffsets: 0x111,
	Orientation: 0x112,
	SamplesPerPixel: 0x115,
	RowsPerStrip: 0x116,
	StripByteCounts: 0x117,
	XResolution: 0x11a,
	YResolution: 0x11b,
	PlanarConfiguration: 0x11c,
	ResolutionUnit: 0x128,

	Software: 0x131,
	DateTime: 0x132,
	Predictor: 0x13d,

	TileWidth: 0x142,
	TileLength: 0x143,
	TileOffsets: 0x144,
	TileByteCounts: 0x145,
	SubIFDs: 0x14a,

	SampleFormat: 0x153,
	SMinSampleValue: 0x154,
	SMaxSampleValue: 0x155,

	XMP: 0x2bc,

	/**
	 * Use {@link Exif} enums to access sub-fields in this IFD entry.
	 */
	Exif: 0x8769,
	ExifVersion: 0x9000,

	ICC: 0x8773,
	/**
	 * Use {@link GPS} enums to access sub-fields in this IFD entry.
	 */
	GPSInfo: 0x8825,
};

/**
 * Common EXIF tags
 *
 * Reference: https://exiftool.org/TagNames/EXIF.html
 */
export const Exif = {
	ExposureTime: 0x829a,
	FNumber: 0x829d,
	Version: 0x9000,
	DateTimeOriginal: 0x9003,
	DateTimeDigitized: 0x9004,
	ShutterSpeedValue: 0x9201,
	ApertureValue: 0x9202,
	ExposureCompensation: 0x9204,
	MeteringMode: 0x9207,
	LightSource: 0x9208,
	Flash: 0x9209,
	FocalLength: 0x920a,
	MakerNote: 0x927c,
	UserComment: 0x9286,
	ColorSpace: 0xa001,
	ExposureMode: 0xa402,
	WhiteBalance: 0xa403,
	DigitalZoomRatio: 0xa404,
	FocalLengthIn35mmFormat: 0xa405,
	SceneCaptureType: 0xa406,
	OwnerName: 0xa430,
	SerialNumber: 0xa431,
	LensInfo: 0xa432,
	LensMake: 0xa433,
	LensModel: 0xa434,
	LensSerialNumber: 0xa435,
};

/**
 * Common GPS tags
 *
 * Reference: https://exiftool.org/TagNames/GPS.html
 */
export const GPS = {
	VersionID: 0,
	LatitudeRef: 1,
	Latitude: 2,
	LongitudeRef: 3,
	Longitude: 4,
	AltitudeRef: 5,
	Altitude: 6,
	TimeStamp: 7,
	Satellites: 8,
	Status: 9,
	MeasureMode: 10,
	DOP: 11,
	SpeedRef: 12,
	Speed: 13,
	TrackRef: 14,
	Track: 15,
	ImgDirectionRef: 16,
	ImgDirection: 17,
	MapDatum: 18,
	DestLatitudeRef: 19,
	DestLatitude: 20,
	DestLongitudeRef: 21,
	DestLongitude: 22,
	DestBearingRef: 23,
	DestBearing: 24,
	DestDistanceRef: 25,
	DestDistance: 26,
	ProcessingMethod: 27,
	AreaInformation: 28,
	DateStamp: 29,
	Differential: 30,
	HPositioningError: 31,
};

export const Compression = {
	Uncompressed: 1,
	// LZW: 5, // TODO
	Deflate: 8,
};

export const SampleFormat = {
	Uint: 1,
	Int: 2,
	Float: 3,
};

export const PhotoMode = {
	WhiteIsZero: 0,
	BlackIsZero: 1,
	RGB: 2,
};

export interface IFDOpts {
	/**
	 * If true (default), converts {@link Rational} values to JS numbers.
	 */
	float: boolean;
	/**
	 * If true (default), parses sub-IFDs for certain tags (e.g. for Exif, GPS).
	 * If false, only the unparsed byte array will be used as tag value.
	 */
	subIFD: boolean;
	/**
	 * If true (default), reads all IFDs in the file. Otherwise, only the first
	 * one is read.
	 */
	all: boolean;
}
