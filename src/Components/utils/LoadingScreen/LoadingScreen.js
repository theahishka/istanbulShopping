import { LoadingSpinner } from "../LoadingSpinner";
import "./LoadingScreen.scss";

function LoadingScreen() {
	return (
		<section className="loading-screen">
			<LoadingSpinner />
		</section>
	);
}

export { LoadingScreen };
