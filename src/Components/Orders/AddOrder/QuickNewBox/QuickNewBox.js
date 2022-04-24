import "./QuickNewBox.scss";
import { addOrderUX } from "../utils/addOrderUX";
import { LoadingSpinner } from "../../../utils/LoadingSpinner";
import { useState, useEffect } from "react";
import { istanbul } from "../../../../utils/istanbul";
import { createNewBox as createNewBoxFile } from "./createNewBox";

function QuickNewBox(props) {
	const [loading, setLoading] = useState(false);
	const [notifyCreation, setNotifyCreation] = useState(false);

	useEffect(() => {
		const letters = Array.from(
			document.querySelectorAll(".element-with-ripple-new-box")
		);

		function handleMouseDown(e, letter, timerId) {
			clearTimeout(timerId);
			const ripple = e.target.querySelector(".ripple-new-box");
			const size = letter.offsetWidth;
			const pos = letter.getBoundingClientRect();
			const x = e.x - pos.left - size;
			const y = e.y - pos.top - size;
			ripple.style =
				"top:" +
				y +
				"px; left:" +
				x +
				"px; width: " +
				size * 2 +
				"px; height: " +
				size * 2 +
				"px;";
			ripple.classList.remove("active");
			ripple.classList.remove("start");
			setTimeout(() => {
				ripple.classList.add("start");
				setTimeout(() => {
					ripple.classList.add("active");
				});
			});
		}

		function handleMouseUp(e, timerId) {
			const ripple = e.target.querySelector(".ripple-new-box");
			clearTimeout(timerId);
			timerId = setTimeout(() => {
				ripple.classList.remove("active");
				ripple.classList.remove("start");
			}, 500);
		}

		letters.forEach((letter) => {
			let timerId;

			letter.addEventListener("mousedown", function mouseDown(e) {
				handleMouseDown(e, letter, timerId);
			});

			letter.addEventListener("mouseup", function mouseUp(e) {
				handleMouseUp(e, timerId);
			});
		});

		return () => {
			const letters = Array.from(
				document.querySelectorAll(".element-with-ripple-new-box")
			);
			letters.forEach((letter) => {
				let timerId;
				letter.removeEventListener("mousedown", function mouseDown(e) {
					handleMouseDown(e, letter, timerId);
				});
				letter.removeEventListener("mouseup", function mouseUp(e) {
					handleMouseUp(e, timerId);
				});
			});
		};
	});

	function createNewBox(e) {
		createNewBoxFile.createNewBox(
			e,
			setLoading,
			istanbul,
			setNotifyCreation,
			props.setBoxChoice,
			props.setBoxId,
			props.updater,
			props.setUpdater,
			props.orderOutletUpdater,
			props.setOrderOutletUpdater
		);
	}

	function closeQuickNewBox() {
		addOrderUX.closeQuickNewBox();
	}

	return (
		<section className="quick-new-box-wrapper">
			<div className="quick-new-box-info-wrapper">
				<h3>Create New Box</h3>
				<div className="new-box-creation-explanation">
					<p>Confirm new box creation by clicking</p>
					<p>"Create Box"</p>
				</div>
				<div
					className="create-box-button element-with-ripple-new-box"
					onClick={createNewBox}
				>
					Create Box
					<div className="ripple-new-box"></div>
				</div>

				<i
					className="far fa-times-circle"
					onClick={closeQuickNewBox}
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
