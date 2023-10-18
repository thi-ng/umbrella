This example demonstrates the [Jaccard
index](https://en.wikipedia.org/wiki/Jaccard_index) being applied to select
related images. Here, similarity is only based on each image's set of tags,
which are being encoded as [bitfields](https://thi.ng/bitfield) at start up...
Once an image has been selected, the similarity is computed for each item and
only those with a higher score than the selected threshold are displayed.
