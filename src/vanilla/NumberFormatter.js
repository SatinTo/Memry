export function formatNumber(x) {
	if(isNaN(x)) return x;

	if(x < 1000) {
		return x;
	}

	if(x < 1000000) {
		return Math.abs(x) > 999 ? Math.sign(x)*((Math.abs(x)/1000).toFixed(1)) + 'k' : Math.sign(x)*Math.abs(x)
	}

	if( x < 10000000) {
		return (x/1000000).toFixed(2) + "M";
	}

	if(x < 1000000000) {
		return Math.round((x/1000000)) + "M";
	}

	if(x < 1000000000000) {
		return Math.round((x/1000000000)) + "B";
	}

	return "1T+";
}