import { generalUX } from "../../utils/generalUX";
import { addOrderUX } from "./utils/addOrderUX";

const createNewOrder = {};

createNewOrder.createNewOrder = (
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
		if (!items[i].brand) {
			const brandInput = document.querySelector(
				`.new-item-brand-input-${i + 1}`
			);
			brandInput.style.boxShadow = "0px 0px 0px 2px red";
		}
		if (!items[i].name) {
			const nameInput = document.querySelector(
				`.new-item-name-input-${i + 1}`
			);
			nameInput.style.boxShadow = "0px 0px 0px 2px red";
		}
		if (!items[i].type) {
			const typeInput = document.querySelector(
				`.new-item-type-input-${i + 1}`
			);
			typeInput.style.boxShadow = "0px 0px 0px 2px red";
		}
		if (!items[i].sellingPrice) {
			const sellingPriceInput = document.querySelector(
				`.new-item-sellingPrice-input-${i + 1}`
			);
			sellingPriceInput.style.boxShadow = "0px 0px 0px 2px red";
		}
		if (!items[i].buyingPrice) {
			const buyingPriceInput = document.querySelector(
				`.new-item-buyingPrice-input-${i + 1}`
			);
			buyingPriceInput.style.boxShadow = "0px 0px 0px 2px red";
		}
	}
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
			if (!payments[i].amount || Number(payments[i].amount) === 0) {
				const amountInput = document.querySelector(
					`.new-payment-amount-input-${i + 1}`
				);
				amountInput.style.boxShadow = "0px 0px 0px 2px red";
			}
			if (!payments[i].date) {
				const dateInput = document.querySelector(
					`.new-payment-date-input-${i + 1}`
				);
				dateInput.style.boxShadow = "0px 0px 0px 2px red";
			}
		}
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
		customerChoiceId.style.boxShadow = "0px 0px 0px 2px red";
		customerChoiceInput.style.boxShadow = "0px 0px 0px 2px red";
	} else {
		validateCustomerId = true;
	}

	let validateBoxId = false;
	if (!boxId) {
		const boxChoiceElement = document.querySelector(".box-choice");
		boxChoiceElement.style.boxShadow = "0px 0px 0px 2px red";
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

		istanbul.postNewOrder(newOrder).then((response) => {
			generalUX.closeAllOrderDetails();
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
				customerChoiceId.value = "";
				customerChoiceId.style.boxShadow = "";

				const customerChoiceInput =
					document.querySelector(".customer-choice");
				customerChoiceInput.style.boxShadow = "";

				const boxChoiceInput = document.querySelector(".box-choice");
				boxChoiceInput.style.boxShadow = "";

				addOrderUX.closeNewOrderForm();

				generalUX.changeBooleanState(outletUpdater, setOutletUpdater);
			}, 2000);
		});
	}
};

export { createNewOrder };
