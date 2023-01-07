function glyphs2Coords(glyphs) {
	if (glyphs.length != 12) return '';

	const X_Z_POS_SHIFT = 2049;
	const X_Z_NEG_SHIFT = 2047;
	const Y_POS_SHIFT = 129;
	const Y_NEG_SHIFT = 127;

	const x_glyphs = parseInt(glyphs.substring(9, 12), 16);
	const y_glyphs = parseInt(glyphs.substring(4, 6), 16);
	const z_glyphs = parseInt(glyphs.substring(6, 9), 16);
	const system_idx = glyphs.substring(1, 4);

	let coords_x = 0;
	let coords_y = 0;
	let coords_z = 0;

	if (x_glyphs >= X_Z_POS_SHIFT) {
		coords_x = x_glyphs - X_Z_POS_SHIFT;
	} else {
		coords_x = x_glyphs + X_Z_NEG_SHIFT;
	}

	if (z_glyphs >= X_Z_POS_SHIFT) {
		coords_z = z_glyphs - X_Z_POS_SHIFT;
	} else {
		coords_z = z_glyphs + X_Z_NEG_SHIFT;
	}

	if (y_glyphs >= Y_POS_SHIFT) {
		coords_y = y_glyphs - Y_POS_SHIFT;
	} else {
		coords_y = y_glyphs + Y_NEG_SHIFT;
	}

	const coordinates = new Array(4);

	coordinates[0] = coords_x.toString(16).toUpperCase().padStart(4, '0');
	coordinates[1] = coords_y.toString(16).toUpperCase().padStart(4, '0');
	coordinates[2] = coords_z.toString(16).toUpperCase().padStart(4, '0');
	coordinates[3] = system_idx.padStart(4, '0');

	return coordinates.join(':');
}