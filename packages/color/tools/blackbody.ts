import { swatchesH } from "@thi.ng/color";
import { mix } from "@thi.ng/math";
import { map, normRange } from "@thi.ng/transducers";
import { kelvinRgb, wavelengthXyz } from "../src/index.js";
import { writeSVG } from "./write.js";

writeSVG(
	"export/blackbody.svg",
	{ width: 500, height: 50, __convert: true },
	swatchesH(
		[
			...map(
				(t) => kelvinRgb(null, mix(1000, 10000, t)),
				normRange(100, false)
			),
		],
		5,
		50
	)
);

writeSVG(
	"export/wavelength.svg",
	{ width: 500, height: 50, __convert: true },
	swatchesH(
		[
			...map(
				(t) => wavelengthXyz(null, mix(400, 700, t)),
				normRange(100, false)
			),
		],
		5,
		50
	)
);
