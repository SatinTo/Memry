export function handleButtonPress(callBack, id, value) {
	window.mouseTimer = setTimeout( () => {
		// alert("On hold!");
		callBack({status: true, id, value});
	}, 800)
}

export function handleButtonRelease() {
	if (window.mouseTimer){
		clearTimeout(window.mouseTimer);
	}
}
