/**
 * This function is a "fake variable.
 * It can be written and read similarly to a `let` variable,
 * but under the hood it interacts with the browser's session storage to store the variable.
 * This is necessary because imported variables can't be changed.
 * @type {boolean}
 */
export function uploadShown(state: boolean | null = null): boolean | void {
	if (state === null) {
		// read var
		const boolString = sessionStorage.getItem('uploadShown');
		return boolString == 'true';	// this is here because browser storage can only store strings. We need to convert to boolean.
	} else {
		// write var
		sessionStorage.setItem('uploadShown', state.toString());
	}
};

export function galleryUploadShown(state: boolean | null = null): boolean | void {
	if (state === null) {
		// read var
		const boolString = sessionStorage.getItem('galleryUploadShown');
		return boolString == 'true';	// this is here because browser storage can only store strings. We need to convert to boolean.
	} else {
		// write var
		sessionStorage.setItem('galleryUploadShown', state.toString());
	}
};

