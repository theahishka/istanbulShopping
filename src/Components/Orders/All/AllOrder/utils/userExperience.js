const userExperience = {};

// Show/Hide items
userExperience.toggleDetailedProfitBreakdown = (e, state, setState) => {
	if (state) {
		setState(false);

		const detailedProfitBreakdownElement = e.target.previousElementSibling;

		function handleItemsClosing() {
			const updatedDetailedProfitBreakdownElement =
				e.target.previousElementSibling;
			let scrollingAmount =
				-632 +
				updatedDetailedProfitBreakdownElement.getBoundingClientRect()
					.top;
			window.scrollBy({
				top: scrollingAmount,
				left: 0,
				behavior: "smooth",
			});
			detailedProfitBreakdownElement.removeEventListener(
				"transitionstart",
				handleItemsClosing
			);
		}

		detailedProfitBreakdownElement.addEventListener(
			"transitionstart",
			handleItemsClosing
		);
	} else {
		setState(true);

		const detailedProfitBreakdownElement = e.target.previousElementSibling;

		function handleItemsOpening() {
			const updatedDetailedProfitBreakdownElement =
				e.target.previousElementSibling;
			let scrollingAmount =
				updatedDetailedProfitBreakdownElement.getBoundingClientRect()
					.top - 5;
			window.scrollBy({
				top: scrollingAmount,
				left: 0,
				behavior: "smooth",
			});

			detailedProfitBreakdownElement.removeEventListener(
				"transitionend",
				handleItemsOpening
			);
		}
		detailedProfitBreakdownElement.addEventListener(
			"transitionend",
			handleItemsOpening
		);
	}
};

// Close order details by clicking cross icon on the top right corner
userExperience.closeOrderDetails = (e, setState, setOrderDetails, editMode) => {
	if (editMode) {
		const doneEditText = e.target.previousElementSibling.lastElementChild;
		doneEditText.click();
	}
	
	const detailedOrderElement = e.target.parentElement;
	function removeBubblingEffect(event) {
		event.stopPropagation();
		detailedOrderElement.removeEventListener(
			"transitioned",
			removeBubblingEffect
		);
	}
	detailedOrderElement.addEventListener(
		"transitionend",
		removeBubblingEffect
	);
	detailedOrderElement.style.opacity = "0";

	const allOrderElement = e.target.parentElement.parentElement;
	allOrderElement.style.maxHeight = "93px";

	const orderOverviewElement =
		e.target.parentElement.parentElement.firstElementChild
			.nextElementSibling;
	orderOverviewElement.style.display = "block";

	function animateOrderOverviewElement() {
		allOrderElement.style.alignItems = "center";

		allOrderElement.style.height = "93px";
		orderOverviewElement.style.opacity = "1";

		setOrderDetails(null);

		allOrderElement.removeEventListener(
			"transitionend",
			animateOrderOverviewElement
		);
	}
	allOrderElement.addEventListener(
		"transitionend",
		animateOrderOverviewElement
	);

	setState(false);
};

// Open order details by clicking on the order
userExperience.openOrderDetails = (
	e,
	calculatedMaxHeight,
	orderId,
	setState,
	istanbul,
	state
) => {
	const loadingSpinner = e.target.previousElementSibling;
	loadingSpinner.style.display = "inline-block";

	const orderOverviewElement = e.target;
	orderOverviewElement.style.opacity = "0";

	function animateOrderOverviewElement() {
		istanbul.getSingleOrder(orderId).then((response) => {
			const allOrderElement = e.target.parentElement;
			allOrderElement.style.alignItems = "flex-start";
			allOrderElement.style.maxHeight = `${calculatedMaxHeight + 700}px`;
			allOrderElement.style.height = "auto";

			loadingSpinner.style.display = "none";
			orderOverviewElement.style.display = "none";

			function animateDetailedOrderElement() {
				const detailedOrderElement = e.target.nextElementSibling;
				detailedOrderElement.style.opacity = "1";

				let scrollByAmount =
					allOrderElement.getBoundingClientRect().top - 5;
				window.scrollBy({
					top: scrollByAmount,
					left: 0,
					behavior: "smooth",
				});

				allOrderElement.removeEventListener(
					"transitionend",
					animateDetailedOrderElement
				);
			}
			allOrderElement.addEventListener(
				"transitionend",
				animateDetailedOrderElement
			);

			setState(response);
		});

		orderOverviewElement.removeEventListener(
			"transitionend",
			animateOrderOverviewElement
		);
	}

	orderOverviewElement.addEventListener(
		"transitionend",
		animateOrderOverviewElement
	);
};

export { userExperience };
