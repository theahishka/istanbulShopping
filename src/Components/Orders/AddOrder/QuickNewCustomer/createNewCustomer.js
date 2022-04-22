import { generalUX } from "../../../utils/generalUX";
import { addOrderUX } from "../utils/addOrderUX";

const createNewCustomer = {};

createNewCustomer.updateNewCustomerDetails = (e, setNewCustomer) => {
	let property = e.target.attributes[0].textContent;
	let value = e.target.value;
	setNewCustomer((prev) => {
		let newCustomerInfo = { ...prev };
		newCustomerInfo[property] = value;
		return newCustomerInfo;
	});
	e.target.style.boxShadow = "";
};

// Create new customer
createNewCustomer.createNewCustomer = (
	e,
	newCustomer,
	setNewCustomer,
	setLoading,
	updater,
	setUpdater,
	setCustomerChoice,
	istanbul,
	setCustomerId,
	setCustomerFullName,
	setNotifyCreation
) => {
	if (!newCustomer.fullName) {
		const customerFullName = document.getElementById("customer-full-name");
		customerFullName.style.boxShadow = "0px 0px 0px 2px red";
	}

	if (!newCustomer.address) {
		const customerAddress = document.getElementById("customer-address");
		customerAddress.style.boxShadow = "0px 0px 0px 2px red";
	}

	if (!newCustomer.phone) {
		const customerPhone = document.getElementById("customer-phone-number");
		customerPhone.style.boxShadow = "0px 0px 0px 2px red";
	}

	if (newCustomer.fullName && newCustomer.address && newCustomer.phone) {
		e.preventDefault();

		setLoading(true);

		const quickNewCustomerForm = document.querySelector(
			".quick-new-customer-form"
		);

		quickNewCustomerForm.style.filter = "blur(10px)";
		quickNewCustomerForm.style.pointerEvents = "none";

		istanbul.postNewCustomer(newCustomer).then((response) => {
			setLoading(false);
			setNotifyCreation(true);

			const newlyCreatedCustomerId = document.querySelector(
				".newly-created-customer-id"
			);
			newlyCreatedCustomerId.innerText = response;

			setTimeout(() => {
				setNotifyCreation(false);
				generalUX.changeBooleanState(updater, setUpdater);

				quickNewCustomerForm.addEventListener(
					"transitionend",
					() => {
						addOrderUX.closeQuickNewCustomer();
					},
					{ once: true }
				);

				quickNewCustomerForm.style.filter = "";
				quickNewCustomerForm.style.pointerEvents = "";

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
				customerChoiceId.value = response;
				customerChoiceId.style.boxShadow = "0px 0px 0px 2px green";

				const customerChoiceInput =
					document.querySelector(".customer-choice");
				customerChoiceInput.style.boxShadow = "0px 0px 0px 2px green";

				setCustomerId(response);
			}, 2000);
		});
	}
};

export { createNewCustomer };
