import {
	FLOAT_GRAY,
	canvas2d,
	floatBufferFromImage,
	imageFromURL,
	normalMap,
} from "@thi.ng/pixel";
import TEX from "./tex.png";

(async () => {
	// load texture image
	const img = await imageFromURL(TEX);
	document.body.appendChild(img);
	// convert image to grayscale float buffer
	const buf = floatBufferFromImage(img, FLOAT_GRAY);
	// compute normalmap w/ given options
	const nmap = normalMap(buf, { scale: 8, step: 2 });
	// create canvas and convert/copy normal map into it
	nmap.blitCanvas(canvas2d(img.width, img.height, document.body).canvas);
	// another normal map with sign of `scale` flipped to "invert" normal direction
	const nmap2 = normalMap(buf, { scale: -8, step: 2 });
	nmap2.blitCanvas(canvas2d(img.width, img.height, document.body).canvas);

	// if a result canvas isn't needed, converting to JS native ImageData
	// might be sufficient (e.g. for WebGL textures):
	// const idata = nmap.toImageData()
})();
