import { generalUX } from "../../../utils/generalUX";

const addOrderUX = {};

// Add additional item
addOrderUX.addAdditionalItem = (setState) => {
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

// Add additional payments
addOrderUX.addAdditionalPayment = (setState) => {
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

// Validate Customer Input
addOrderUX.validateCustomerInput = (
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
			customerChoiceId.style.boxShadow = "0px 0px 0px 2px green";
			customerChoiceInput.style.boxShadow = "0px 0px 0px 2px green";
			break;
		} else {
			customerChoiceId.value = "";
			customerChoiceId.style.boxShadow = "";
			customerChoiceInput.style.boxShadow = "";
			setCustomerId("");
			setCustomerFullName("");
		}
	}
};

// Validate box input
addOrderUX.validateBoxInput = (e, boxes, setBoxChoice, setBoxId) => {
	let value = e.target.value;
	setBoxChoice(value);

	const boxChoiceElement = document.querySelector(".box-choice");
	for (let i = 0; i < boxes.length; i++) {
		if (boxes[i].box_id === value) {
			boxChoiceElement.style.boxShadow = "0px 0px 0px 2px green";
			setBoxId(boxes[i].box_id);
			break;
		} else {
			boxChoiceElement.style.boxShadow = "";
			setBoxId("");
		}
	}
};

// Open new order form
addOrderUX.openNewOrderForm = () => {
	const newOrderFormElement = document.querySelector(
		".add-order-form-wrapper"
	);

	generalUX.openElement(newOrderFormElement);

	window.scrollTo({
		top: 0,
		left: 0,
		behavior: "smooth",
	});

	const ordersElement = document.querySelector(".orders");

	generalUX.closeElement(ordersElement, () => {
		ordersElement.style.maxHeight = "100px";
		ordersElement.style.pointerEvents = "none";
		ordersElement.style.overflow = "hidden";
	});
};

// Close new order form
addOrderUX.closeNewOrderForm = () => {
	const newOrderFormElement = document.querySelector(
		".add-order-form-wrapper"
	);

	generalUX.closeElement(newOrderFormElement);

	// Add back order elements
	const ordersElement = document.querySelector(".orders");
	ordersElement.style.maxHeight = "";
	ordersElement.style.pointerEvents = "";
	ordersElement.style.overflow = "";
	ordersElement.style.opacity = "1";
};

// Open quick new customer
addOrderUX.openQuickNewCustomer = () => {
	const quickNewCustomerWrapperElement = document.querySelector(
		".quick-new-customer-wrapper"
	);

	generalUX.openElement(quickNewCustomerWrapperElement);

	window.scrollTo({
		top: 0,
		left: 0,
		behavior: "smooth",
	});

	// Blur the add order form wrapper
	const addOrderFormWrapperElement = document.querySelector(
		".add-order-form-wrapper"
	);
	addOrderFormWrapperElement.style.filter = "blur(10px)";
	addOrderFormWrapperElement.style.pointerEvents = "none";

	// Lock scrolling
	const body = document.body;

	if (body.getBoundingClientRect().y === 0) {
		return (body.style.overflow = "hidden");
	}

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
};

// Close quick new customer
addOrderUX.closeQuickNewCustomer = () => {
	const quickNewCustomerWrapperElement = document.querySelector(
		".quick-new-customer-wrapper"
	);

	generalUX.closeElement(quickNewCustomerWrapperElement);

	// Remove blur on add order form wrapper
	const addOrderFormWrapperElement = document.querySelector(
		".add-order-form-wrapper"
	);

	addOrderFormWrapperElement.style.filter = "";
	addOrderFormWrapperElement.style.pointerEvents = "";

	// Release scrolling
	const body = document.body;

	body.style.overflow = "";
};

// Open quick new box
addOrderUX.openQuickNewBox = () => {
	const quickNewBoxWrapperElement = document.querySelector(
		".quick-new-box-wrapper"
	);

	generalUX.openElement(quickNewBoxWrapperElement);

	window.scrollTo({
		top: 0,
		left: 0,
		behavior: "smooth",
	});

	// Blur the add order form wrapper
	const addOrderFormWrapperElement = document.querySelector(
		".add-order-form-wrapper"
	);

	addOrderFormWrapperElement.style.filter = "blur(10px)";
	addOrderFormWrapperElement.style.pointerEvents = "none";

	// Lock scrolling
	const body = document.body;

	if (body.getBoundingClientRect().y === 0) {
		return (body.style.overflow = "hidden");
	}

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
};

// Close quick new box
addOrderUX.closeQuickNewBox = () => {
	const quickNewBoxWrapperElement = document.querySelector(
		".quick-new-box-wrapper"
	);

	generalUX.closeElement(quickNewBoxWrapperElement);

	// Remove blur on add order form wrapper
	const addOrderFormWrapperElement = document.querySelector(
		".add-order-form-wrapper"
	);

	addOrderFormWrapperElement.style.filter = "";
	addOrderFormWrapperElement.style.pointerEvents = "";

	// Release scrolling
	const body = document.body;
	body.style.overflow = "";
};

export { addOrderUX };
