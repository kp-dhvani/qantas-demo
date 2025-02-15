import { useEffect, useState } from "react";
import {
	DataResponse,
	FetchState,
	ListingProps,
	SortOrder,
} from "./components/lib/types";
import Price from "./components/Price";
import Preview from "./components/Preview";
import { createSortOptions, sortDataByPrice } from "./components/lib/util";
import Select from "./components/core/Select";

function App() {
	const [properties, setProperties] = useState<ListingProps[]>();
	const [dataFetchState, setDataFetchState] = useState(FetchState.INIT);
	const [sortOrder, setSortOrder] = useState<SortOrder>(
		SortOrder.PRICE_HIGH_LOW
	);

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

	useEffect(() => {
		setProperties(sortDataByPrice(properties, sortOrder));
	}, [properties, sortOrder]);

	const handleSortOrderChange = (value: string) => {
		// type guard to ensure value is a valid SortOrder
		if (Object.values(SortOrder).includes(value as SortOrder)) {
			setSortOrder(value as SortOrder);
		}
	};

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
		const renderSortSelect = () => {
			return (
				<Select
					options={createSortOptions()}
					value={sortOrder}
					onChange={handleSortOrderChange}
				/>
			);
		};
		return (
			<>
				{totalListingText()}
				{renderSortSelect()}
				{properties?.map((listing) => (
					<div key={listing.id}>
						<Preview
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
				<div className="flex md:mx-16">
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
