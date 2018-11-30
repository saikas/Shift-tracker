// this is used to generate the various background colours of the page

// TODO:
// [ ]	Add rgba option when generating color

function backgroundLooper(switchInterval) {
	var r=244, g=54, b=54, a=0.4;
	backgroundColourSwitcher(r,g,b,a, switchInterval);
}

function backgroundColourSwitcher(r, g, b, a, interval) {
	var shadeLimit = 244;
	var shadeMin = 54;
	var factor = 1;

	// console.log("in switcher: rgb("+ r +","+ g +","+ b +")");
	setBodyBackgroundColour(genColourStr(r,g,b,a));

	setTimeout(function() {

		if(r>=shadeLimit) {
			if(g>=shadeLimit) {
				return backgroundColourSwitcher(r-factor, g, b, a, interval);
			}
			
			if(b > shadeMin) {
				return backgroundColourSwitcher(r, g, b-factor, a, interval);
			}
			else {
				return backgroundColourSwitcher(r, g+factor, b, a, interval);
			}
		}

		if(g>=shadeLimit) {
			if(b>=shadeLimit) {
				return backgroundColourSwitcher(r, g-factor, b, a, interval);
			}

			if(r > shadeMin) {
				return backgroundColourSwitcher(r-factor, g, b, a, interval);
			}
			else {
				return backgroundColourSwitcher(r, g, b+factor, a, interval);
			}
		}

		if(b>=shadeLimit) {
			if(r>=shadeLimit) {
				return backgroundColourSwitcher(r, g, b-factor, a, interval);
			}
			
			if(g > shadeMin) {
				return backgroundColourSwitcher(r, g-factor, b, a, interval);
			}
			else {
				return backgroundColourSwitcher(r+factor, g, b, a, interval);
			}
		}

		return backgroundColourSwitcher(r+factor, g, b, a, interval);

	}, interval);
}

function setBodyBackgroundColour(colour) {
	document.body.style.backgroundColor = colour;
}

function genColourStr(r, g, b, a) {
	return "rgb("+ r +", "+ g +", "+ b +")";
	// return "rgba("+ r +","+ g +","+ b +","+ a +")";
}
