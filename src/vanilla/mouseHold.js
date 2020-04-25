export function handleButtonPress(callBack, id) {
	window.mouseTimer = setTimeout( () => {
		callBack({status: true, collectionID: id});
	}, 800)
}

export function handleButtonRelease() {
	if (window.mouseTimer){
		clearTimeout(window.mouseTimer);
	}
}
