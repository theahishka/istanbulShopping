import "./QuickNewBox.scss";
import { userExperience } from "../utils/userExperience";
import { LoadingSpinner } from "../../../utils/LoadingSpinner";
import { useState } from "react";
import { istanbul } from "../../../../utils/istanbul";

function QuickNewBox(props) {
	const [loading, setLoading] = useState(false);
	const [notifyCreation, setNotifyCreation] = useState(false);

	function createNewBox(e) {
		userExperience.createNewBox(
			e,
			setLoading,
			istanbul,
			setNotifyCreation,
			props.setBoxChoice,
			props.setBoxId,
			props.updater,
			props.setUpdater
		);
	}

	return (
		<section className="quick-new-box-wrapper">
			<div className="quick-new-box-info-wrapper">
				<h3>Create New Box</h3>
				<div className="new-box-creation-explanation">
					<p>Confirm new box creation by clicking</p>
					<p>"Create Box"</p>
				</div>
				<div className="create-box-button" onClick={createNewBox}>
					Create Box
				</div>

				<i
					className="far fa-times-circle"
					onClick={userExperience.closeQuickNewBox}
				></i>
			</div>
			{!loading ? null : (
				<div className="quick-new-box-spinner-wrapper">
					<LoadingSpinner />
				</div>
			)}
			{!notifyCreation ? null : (
				<div className="quick-new-box-notify-creation">
					<p>New Box Id:</p> <p className="newly-created-box-id"></p>
				</div>
			)}
		</section>
	);
}

export { QuickNewBox };
