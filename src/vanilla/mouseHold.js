export function handleButtonPress(callBack, id) {
	window.mouseTimer = setTimeout( () => {
		// alert("On hold!");
		callBack({status: true, id: id});
	}, 800)
}

export function handleButtonRelease() {
	if (window.mouseTimer){
		clearTimeout(window.mouseTimer);
	}
}
