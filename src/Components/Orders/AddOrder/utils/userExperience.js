const userExperience = {};

userExperience.addAdditionalItem = (setState) => {
	let newItemObject = {
		brand: "",
		name: "",
		type: "",
		color: "",
		size: "",
		sellingPrice: "",
		buyingPrice: "",
	};

	setState((prev) => {
		let newItems = [...prev];
		newItems.push(newItemObject);
		return newItems;
	});
};

userExperience.addAdditionalPayment = (setState) => {
	let newPaymentObject = {
		amount: "",
		date: "",
	};

	setState((prev) => {
		let newPayments = [...prev];
		newPayments.push(newPaymentObject);
		return newPayments;
	});
};

// Close all order details
userExperience.closeAllOrderDetails = () => {
	const allCrossButtons = document.querySelectorAll(
		".order-details-cross-icon"
	);
	allCrossButtons.forEach((element) => {
		element.click();
	});
};

userExperience.openNewOrderForm = () => {
	const newOrderFormElement = document.querySelector(
		".add-order-form-wrapper"
	);
	newOrderFormElement.style.display = "block";
	setTimeout(() => {
		newOrderFormElement.style.opacity = "1";
	}, 200);

	// Remove order elements for blocking scrolling
	window.scrollTo({
		top: 0,
		left: 0,
		behavior: "smooth",
	});

	const ordersElement = document.querySelector(".orders");
	ordersElement.style.opacity = "0";
	function removeOrdersElement() {
		ordersElement.style.display = "none";
		ordersElement.removeEventListener("transitionend", removeOrdersElement);
	}
	ordersElement.addEventListener("transitionend", removeOrdersElement);
};

userExperience.closeNewOrderForm = () => {
	const newOrderFormElement = document.querySelector(
		".add-order-form-wrapper"
	);
	newOrderFormElement.style.opacity = "0";

	function removeNewOrderFormElement() {
		newOrderFormElement.style.display = "none";
		newOrderFormElement.removeEventListener(
			"transitionend",
			removeNewOrderFormElement
		);
	}

	newOrderFormElement.addEventListener(
		"transitionend",
		removeNewOrderFormElement
	);

	// Add back orders element
	const ordersElement = document.querySelector(".orders");
	ordersElement.style.display = "block";
	setTimeout(() => {
		ordersElement.style.opacity = "1";
	}, 200);
};

userExperience.validateCustomerInput = (
	e,
	customers,
	setCustomerChoice,
	setCustomerId,
	setCustomerFullName
) => {
	let value = e.target.value;
	setCustomerChoice(e.target.value);

	let reversed = value.split("").reverse();
	let newReversed = [];
	for (let i = 0; i < reversed.length; i++) {
		if (reversed[i] === "(") {
			break;
		} else {
			newReversed.push(reversed[i]);
		}
	}
	let phoneNumber = newReversed.reverse();
	phoneNumber.pop();
	let phone = phoneNumber.join("");

	const customerChoiceId = document.querySelector(".customer-choice-id");
	const customerChoiceInput = document.querySelector(".customer-choice");

	for (let i = 0; i < customers.length; i++) {
		if (customers[i].phone === phone) {
			customerChoiceId.value = customers[i].customer_id;
			setCustomerId(customers[i].customer_id);
			setCustomerFullName(customers[i].full_name);
			customerChoiceId.style.outline = "2px solid green";
			customerChoiceInput.style.outline = "2px solid green";
			break;
		} else {
			customerChoiceId.value = "";
			customerChoiceId.style.outline = "";
			customerChoiceInput.style.outline = "";
			setCustomerId("");
			setCustomerFullName("");
		}
	}
};

userExperience.validateBoxInput = (e, boxes, setBoxChoice, setBoxId) => {
	let value = e.target.value;
	setBoxChoice(value);

	const boxChoiceElement = document.querySelector(".box-choice");
	for (let i = 0; i < boxes.length; i++) {
		if (boxes[i].box_id === value) {
			boxChoiceElement.style.outline = "2px solid green";
			setBoxId(boxes[i].box_id);
			break;
		} else {
			boxChoiceElement.style.outline = "";
			setBoxId("");
		}
	}
};

userExperience.openQuickNewCustomer = () => {
	const quickNewCustomerWrapperElement = document.querySelector(
		".quick-new-customer-wrapper"
	);
	quickNewCustomerWrapperElement.style.display = "block";
	window.scrollTo({
		top: 0,
		left: 0,
		behavior: "smooth",
	});
	setTimeout(() => {
		quickNewCustomerWrapperElement.style.opacity = "1";
	}, 200);

	// Blur the add order form wrapper and scroll upwards
	const addOrderFormWrapperElement = document.querySelector(
		".add-order-form-wrapper"
	);
	addOrderFormWrapperElement.style.filter = "blur(10px)";
	addOrderFormWrapperElement.style.pointerEvents = "none";

	const body = document.body;
	if (body.getBoundingClientRect().y === 0) {
		body.style.overflow = "hidden";
	} else {
		function hideOverflow() {
			if (window.scrollY === 0) {
				body.style.overflow = "hidden";
				document.removeEventListener("scroll", hideOverflow);
			} else {
				window.scrollTo({
					top: 0,
					left: 0,
					behavior: "smooth",
				});
			}
		}
		document.addEventListener("scroll", hideOverflow);
	}
};

userExperience.closeQuickNewCustomer = () => {
	const quickNewCustomerWrapperElement = document.querySelector(
		".quick-new-customer-wrapper"
	);
	quickNewCustomerWrapperElement.style.opacity = "0";

	function removeQuickNewCustomer() {
		quickNewCustomerWrapperElement.style.display = "none";
		quickNewCustomerWrapperElement.removeEventListener(
			"transitionend",
			removeQuickNewCustomer
		);
	}
	quickNewCustomerWrapperElement.addEventListener(
		"transitionend",
		removeQuickNewCustomer
	);

	// Remove blur on add order form wrapper
	const addOrderFormWrapperElement = document.querySelector(
		".add-order-form-wrapper"
	);
	addOrderFormWrapperElement.style.filter = "";
	addOrderFormWrapperElement.style.pointerEvents = "";

	const body = document.body;
	body.style.overflow = "";
};

userExperience.createNewCustomer = (
	e,
	newCustomer,
	setNewCustomer,
	setLoading,
	updater,
	setUpdater,
	setCustomerChoice,
	istanbul,
	setCustomerId,
	setCustomerFullName
) => {
	if (newCustomer.fullName && newCustomer.address && newCustomer.phone) {
		e.preventDefault();
		setLoading(true);
		const quickNewCustomerForm = document.querySelector(
			".quick-new-customer-form"
		);
		quickNewCustomerForm.style.filter = "blur(10px)";
		quickNewCustomerForm.style.pointerEvents = "none";

		setTimeout(() => {
			istanbul.postNewCustomer(newCustomer).then((response) => {
				quickNewCustomerForm.style.filter = "";
				quickNewCustomerForm.style.pointerEvents = "";
				setLoading(false);

				if (updater) {
					setUpdater(false);
				} else {
					setUpdater(true);
				}

				function closeQuickNewCustomerForm() {
					userExperience.closeQuickNewCustomer();
					quickNewCustomerForm.removeEventListener(
						"transitionend",
						closeQuickNewCustomerForm
					);
				}

				quickNewCustomerForm.addEventListener(
					"transitionend",
					closeQuickNewCustomerForm
				);

				setCustomerChoice(
					`${newCustomer.fullName} (${newCustomer.phone})`
				);

				setCustomerFullName(newCustomer.fullName);

				setNewCustomer({
					fullName: "",
					address: "",
					phone: "",
					comments: "",
				});

				const customerChoiceId = document.querySelector(
					".customer-choice-id"
				);
				const customerChoiceInput =
					document.querySelector(".customer-choice");

				customerChoiceId.value = response;
				customerChoiceId.style.outline = "2px solid green";
				customerChoiceInput.style.outline = "2px solid green";

				setCustomerId(response);
			});
		}, 400);
	}
};

userExperience.openQuickNewBox = () => {
	const quickNewBoxWrapperElement = document.querySelector(
		".quick-new-box-wrapper"
	);
	quickNewBoxWrapperElement.style.display = "block";
	window.scrollTo({
		top: 0,
		left: 0,
		behavior: "smooth",
	});
	setTimeout(() => {
		quickNewBoxWrapperElement.style.opacity = "1";
	}, 200);

	// Blur the add order form wrapper and scroll upwards
	const addOrderFormWrapperElement = document.querySelector(
		".add-order-form-wrapper"
	);
	addOrderFormWrapperElement.style.filter = "blur(10px)";
	addOrderFormWrapperElement.style.pointerEvents = "none";

	const body = document.body;
	if (body.getBoundingClientRect().y === 0) {
		body.style.overflow = "hidden";
	} else {
		function hideOverflow() {
			if (window.scrollY === 0) {
				body.style.overflow = "hidden";
				document.removeEventListener("scroll", hideOverflow);
			} else {
				window.scrollTo({
					top: 0,
					left: 0,
					behavior: "smooth",
				});
			}
		}
		document.addEventListener("scroll", hideOverflow);
	}
};

userExperience.closeQuickNewBox = () => {
	const quickNewBoxWrapperElement = document.querySelector(
		".quick-new-box-wrapper"
	);
	quickNewBoxWrapperElement.style.opacity = "0";

	function removeQuickNewCustomer() {
		quickNewBoxWrapperElement.style.display = "none";
		quickNewBoxWrapperElement.removeEventListener(
			"transitionend",
			removeQuickNewCustomer
		);
	}
	quickNewBoxWrapperElement.addEventListener(
		"transitionend",
		removeQuickNewCustomer
	);

	// Remove blur on add order form wrapper
	const addOrderFormWrapperElement = document.querySelector(
		".add-order-form-wrapper"
	);
	addOrderFormWrapperElement.style.filter = "";
	addOrderFormWrapperElement.style.pointerEvents = "";

	const body = document.body;
	body.style.overflow = "";
};

userExperience.createNewBox = (
	e,
	setLoading,
	istanbul,
	setNotifyCreation,
	setBoxChoice,
	setBoxId,
	updater,
	setUpdater
) => {
	const quickNewBoxInfoWrapper = document.querySelector(
		".quick-new-box-info-wrapper"
	);
	quickNewBoxInfoWrapper.style.filter = "blur(10px)";
	quickNewBoxInfoWrapper.style.pointerEvents = "none";

	setLoading(true);

	setTimeout(() => {
		istanbul.postNewBox().then((response) => {
			setLoading(false);
			setNotifyCreation(true);

			const newlyCreatedBoxIdElement = document.querySelector(
				".newly-created-box-id"
			);
			newlyCreatedBoxIdElement.innerText = response;

			setTimeout(() => {
				setNotifyCreation(false);
				quickNewBoxInfoWrapper.style.filter = "blur(0)";
				quickNewBoxInfoWrapper.style.pointerEvents = "";

				setBoxChoice(response);
				const boxChoiceInput = document.querySelector(".box-choice");
				boxChoiceInput.style.outline = "2px solid green";
				userExperience.closeQuickNewBox();

				setBoxId(response);

				if (updater) {
					setUpdater(false);
				} else {
					setUpdater(true);
				}
			}, 2000);
		});
	}, 400);
};

userExperience.createNewOrder = (
	e,
	items,
	payments,
	customerChoice,
	boxChoice,
	customerId,
	boxId,
	customerFullName,
	istanbul,
	setLoading,
	setNotifyCreation,
	setOutletUpdater,
	outletUpdater,
	setItems,
	setPayments,
	setCustomerId,
	setBoxId,
	setCustomerChoice,
	setBoxChoice,
	setCustomerFullName
) => {
	let validateItems = false;
	for (let i = 0; i < items.length; i++) {
		if (
			items[i].brand &&
			items[i].name &&
			items[i].type &&
			items[i].sellingPrice &&
			items[i].buyingPrice
		) {
			validateItems = true;
		} else {
			validateItems = false;
			break;
		}
	}

	let validatePayments = true;
	if (payments.length > 0) {
		for (let i = 0; i < payments.length; i++) {
			if (payments[i].amount && payments[i].date) {
				validatePayments = true;
			} else {
				validatePayments = false;
				break;
			}
		}
	}

	let initialValidation = false;
	if (validateItems && validatePayments && customerChoice && boxChoice) {
		e.preventDefault();
		initialValidation = true;
	}

	let validateCustomerId = false;
	if (!customerId) {
		const customerChoiceId = document.querySelector(".customer-choice-id");
		const customerChoiceInput = document.querySelector(".customer-choice");
		customerChoiceId.style.outline = "2px solid red";
		customerChoiceInput.style.outline = "2px solid red";
	} else {
		validateCustomerId = true;
	}

	let validateBoxId = false;
	if (!boxId) {
		const boxChoiceElement = document.querySelector(".box-choice");
		boxChoiceElement.style.outline = "2px solid red";
	} else {
		validateBoxId = true;
	}

	if (validateBoxId && validateCustomerId && initialValidation) {
		const newOrder = {
			customerId: customerId,
			boxId: boxId,
			payments: payments,
			items: items,
			customerFullName: customerFullName,
		};

		const addOrderFormWrapper = document.querySelector(
			".add-order-form-wrapper"
		);
		addOrderFormWrapper.style.filter = "blur(10px)";
		addOrderFormWrapper.style.pointerEvents = "none";

		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});

		setLoading(true);

		setTimeout(() => {
			istanbul.postNewOrder(newOrder).then((response) => {
				setNotifyCreation(true);
				setLoading(false);
				const newlyCreatedOrderId = document.querySelector(
					".newly-created-order-id"
				);
				newlyCreatedOrderId.innerText = response;
				setTimeout(() => {
					setNotifyCreation(false);
					addOrderFormWrapper.style.filter = "";
					addOrderFormWrapper.style.pointerEvents = "";

					setItems([
						{
							brand: "",
							name: "",
							type: "",
							color: "",
							size: "",
							sellingPrice: "",
							buyingPrice: "",
						},
					]);
					setPayments([]);
					setCustomerId("");
					setBoxId("");
					setCustomerChoice("");
					setBoxChoice("");
					setCustomerFullName("");

					const customerChoiceId = document.querySelector(
						".customer-choice-id"
					);
					const customerChoiceInput =
						document.querySelector(".customer-choice");

					customerChoiceId.value = "";
					customerChoiceId.style.outline = "";
					customerChoiceInput.style.outline = "";

					const boxChoiceInput =
						document.querySelector(".box-choice");
					boxChoiceInput.style.outline = "";

					userExperience.closeNewOrderForm();

					if (outletUpdater) {
						setOutletUpdater(false);
					} else {
						setOutletUpdater(true);
					}
					setTimeout(() => {
						userExperience.closeAllOrderDetails();
					}, 5000);
				}, 2000);
			});
		}, 400);
	}
};

export { userExperience };
