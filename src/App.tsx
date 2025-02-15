import { useEffect, useState } from "react";
import { DataResponse, FetchState, ListingProps } from "./components/lib/types";
import ListingPreview from "./components/Preview";
import Price from "./components/Price";

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
		const totalListingText = () => {
			const totalLength = properties?.length ?? 0;
			// is the city coming from data?
			return totalLength > 0 ? (
				<p>
					{totalLength} hotel{totalLength > 1 ? `s` : ""} in Sydney
				</p>
			) : (
				""
			);
		};
		return (
			<>
				{totalListingText()}
				{properties?.map((listing) => (
					<div key={listing.id}>
						<ListingPreview
							listingImage={listing.property.previewImage}
							listingPromotion={listing.offer.promotion}
						/>
						<Price displayPrice={listing.offer.displayPrice} />
					</div>
				))}
			</>
		);
	};
	return (
		<div>
			<header>
				<img src="/qantas-logo.png" className="Qantas logo" alt="Qantas logo" />
			</header>
			<main>
				<div>
					{dataFetchState === FetchState.LOADING && (
						<div data-testid="loading-state">Loading...</div>
					)}
					{dataFetchState === FetchState.ERROR && (
						<div data-testid="error-state">Error loading data</div>
					)}
					{dataFetchState === FetchState.SUCCESS && (
						<div data-testid="success-state">{renderListings()}</div>
					)}
				</div>
			</main>
		</div>
	);
}

export default App;
