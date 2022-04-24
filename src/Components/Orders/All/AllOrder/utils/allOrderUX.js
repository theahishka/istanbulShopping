const allOrderUX = {};

// Show/Hide items scrolling logic
allOrderUX.toggleDetailedProfitBreakdown = (
	e,
	detailedProfitBreakdownOpened,
	setDetailedProfitBreakdownOpened
) => {
	if (detailedProfitBreakdownOpened) {
		setDetailedProfitBreakdownOpened(false);

		const detailedProfitBreakdownElement = e.target.previousElementSibling;

		function handleItemsClosing() {
			const updatedDetailedProfitBreakdownElement =
				e.target.previousElementSibling;
			let scrollingAmount =
				-657 +
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
		setDetailedProfitBreakdownOpened(true);

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

// Open order details by clicking on the order
allOrderUX.openOrderDetails = (
	e,
	calculatedMaxHeight,
	orderId,
	setOrderDetails,
	istanbul
) => {
	const loadingSpinner = e.target.previousElementSibling;
	loadingSpinner.style.display = "inline-block";

	const orderOverviewElement = e.target;

	orderOverviewElement.style.opacity = "0";

	orderOverviewElement.addEventListener(
		"transitionend",
		() => {
			istanbul.getSingleOrder(orderId).then((response) => {
				const allOrderElement = e.target.parentElement;
				allOrderElement.style.alignItems = "flex-start";
				allOrderElement.style.maxHeight = `${
					calculatedMaxHeight + 700
				}px`;
				allOrderElement.style.height = "auto";

				loadingSpinner.style.display = "none";
				orderOverviewElement.style.display = "none";

				allOrderElement.addEventListener(
					"transitionend",
					() => {
						const detailedOrderElement =
							e.target.nextElementSibling;
						detailedOrderElement.style.opacity = "1";

						let scrollByAmount =
							allOrderElement.getBoundingClientRect().top - 5;
						window.scrollBy({
							top: scrollByAmount,
							left: 0,
							behavior: "smooth",
						});
					},
					{ once: true }
				);

				setOrderDetails(response);
			});
		},
		{
			once: true,
		}
	);
};

// Close order details by clicking cross icon on the top right corner
allOrderUX.closeOrderDetails = (
	e,
	setDetailedProfitBreakdownOpened,
	setOrderDetails
) => {
	const detailedOrderElement = e.target.parentElement;

	detailedOrderElement.addEventListener(
		"transitionend",
		(event) => {
			event.stopPropagation();
		},
		{ once: true }
	);

	detailedOrderElement.style.opacity = "0";

	const allOrderElement = e.target.parentElement.parentElement;
	allOrderElement.style.maxHeight = "93px";

	const orderOverviewElement =
		e.target.parentElement.parentElement.firstElementChild
			.nextElementSibling;
	orderOverviewElement.style.display = "block";

	allOrderElement.addEventListener(
		"transitionend",
		() => {
			allOrderElement.style.alignItems = "center";

			allOrderElement.style.height = "93px";
			orderOverviewElement.style.opacity = "1";

			setOrderDetails(null);
		},
		{ once: true }
	);

	setDetailedProfitBreakdownOpened(false);
};

export { allOrderUX };
