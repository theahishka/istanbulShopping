const generalUX = {};

// Update order outlet
generalUX.changeBooleanState = (outletUpdater, setOutletUpdater) => {
	if (outletUpdater) {
		setOutletUpdater(false);
	} else {
		setOutletUpdater(true);
	}
};

// Format date
generalUX.formatDate = (date) => {
	let splittedDate = date.split("");
	let formattedDate = [];
	for (let i = 0; i < 10; i++) {
		formattedDate.push(splittedDate[i]);
	}
	return formattedDate.join("");
};

// Opening element by changing display to block then changing opacity to 1
generalUX.openElement = (element, after, before) => {
	const observer = new MutationObserver(function (mutation) {
		setTimeout(() => {
			observer.disconnect();

			if (after) {
				return after();
			}

			mutation[0].target.style.opacity = "1";
		}, 150);
	});

	observer.observe(element, {
		attributes: true,
		attributeFilter: ["style"],
	});

	if (before) {
		return before();
	}

	element.style.display = "block";
};

// Closing element by changing opacity to 0 then changing display to none
generalUX.closeElement = (element, after, before) => {
	element.addEventListener(
		"transitionend",
		() => {
			if (after) {
				return after();
			}

			element.style.display = "none";
		},
		{ once: true }
	);

	if (before) {
		return before();
	}

	element.style.opacity = "0";
};

// Close all order details
generalUX.closeAllOrderDetails = () => {
	const allCrossButtons = document.querySelectorAll(
		".order-details-cross-icon"
	);
	allCrossButtons.forEach((element) => {
		element.click();
	});
};

generalUX.showLoader = () => {
	const loadingScreenElement = document.querySelector(".loading-screen");
	loadingScreenElement.style.display = "flex";
}

generalUX.hideLoader = () => {
	const loadingScreenElement = document.querySelector(".loading-screen");
	loadingScreenElement.style.display = "none";
}

export { generalUX };
