export function handleButtonPress(callBack) {
	window.mouseTimer = setTimeout( () => {
		callBack(true);
	}, 800)
}

export function handleButtonRelease() {
	if (window.mouseTimer){
		clearTimeout(window.mouseTimer);
	}
}
