import { useEffect, useState } from "react";
import qantasLogo from "./assets/qantas-logo.png";
import { DataResponse, ListingProps } from "./components/lib/types";
import ListingPreview from "./components/Preview";
import Price from "./components/Price";

enum FetchState {
	INIT = "init",
	LOADING = "loading",
	SUCCESS = "success",
	ERROR = "error",
}

function App() {
	const [properties, setProperties] = useState<ListingProps[]>();
	const [dataFetchState, setDataFetchState] = useState(FetchState.INIT);
	useEffect(() => {
		const abortController = new AbortController();
		const fetchProperties = async () => {
			try {
				setDataFetchState(FetchState.LOADING);
				const response = await fetch("/data.json", {
					signal: abortController.signal,
				});
				const data: DataResponse = await response.json();
				setProperties(data.results);
				console.log(data.results);
				setDataFetchState(FetchState.SUCCESS);
			} catch (error) {
				if (error instanceof Error && error.name === "AbortError") {
					return;
				}
				setDataFetchState(FetchState.ERROR);
			}
		};
		fetchProperties();

		return () => {
			abortController.abort();
		};
	}, []);

	const renderListings = () => {
		if (dataFetchState === FetchState.ERROR) {
			return <p>hhhmmmm... something is not right, please try again!</p>;
		}
		return properties?.map((listing) => (
			<div key={listing.id}>
				<ListingPreview
					listingImage={listing.property.previewImage}
					listingPromotion={listing.offer.promotion}
				/>
				<Price displayPrice={listing.offer.displayPrice} />
			</div>
		));
	};
	return (
		<div>
			<header>
				<img src={qantasLogo} className="Qantas logo" alt="Qantas logo" />
			</header>
			<main>
				{dataFetchState === FetchState.LOADING
					? "Loading..."
					: renderListings()}
			</main>
		</div>
	);
}

export default App;
