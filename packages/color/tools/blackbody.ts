import { swatchesH } from "@thi.ng/color";
import { serialize } from "@thi.ng/hiccup";
import { svg } from "@thi.ng/hiccup-svg";
import { mix } from "@thi.ng/math";
import { map, normRange } from "@thi.ng/transducers";
import { writeFileSync } from "fs";
import { kelvinRgb, wavelengthXyz } from "../src/index.js";

writeFileSync(
	"export/blackbody.svg",
	serialize(
		svg(
			{ width: 500, height: 50, convert: true },
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
		)
	)
);

writeFileSync(
	"export/wavelength.svg",
	serialize(
		svg(
			{ width: 500, height: 50, convert: true },
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
		)
	)
);
