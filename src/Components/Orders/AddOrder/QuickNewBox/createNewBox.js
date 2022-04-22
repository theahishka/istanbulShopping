import { generalUX } from "../../../utils/generalUX";
import { addOrderUX } from "../utils/userExperience";

const createNewBox = {};

// Create new box
createNewBox.createNewBox = (
	e,
	setLoading,
	istanbul,
	setNotifyCreation,
	setBoxChoice,
	setBoxId,
	updater,
	setUpdater,
	orderOutletUpdater,
	setOrderOutletUpdater
) => {
	const quickNewBoxInfoWrapper = document.querySelector(
		".quick-new-box-info-wrapper"
	);
	quickNewBoxInfoWrapper.style.filter = "blur(10px)";
	quickNewBoxInfoWrapper.style.pointerEvents = "none";

	setLoading(true);

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
			boxChoiceInput.style.boxShadow = "0px 0px 0px 2px green";

			addOrderUX.closeQuickNewBox();

			setBoxId(response);

			generalUX.changeBooleanState(updater, setUpdater);

			generalUX.changeBooleanState(
				orderOutletUpdater,
				setOrderOutletUpdater
			);
		}, 2000);
	});
};

export { createNewBox };
