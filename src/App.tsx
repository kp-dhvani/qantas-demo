import { useEffect, useMemo, useState } from "react";
import { DataResponse, FetchState, ListingProps, SortOrder } from "./lib/types";
import Price from "./components/Price";
import Preview from "./components/Preview";
import { createSortOptions, sortDataByPrice } from "./lib/util";
import Select from "./components/core/Select";
import PropertyCard from "./components/PropertyCard";

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

	const sortedProperties = useMemo(
		() => sortDataByPrice(properties, sortOrder),
		[properties, sortOrder]
	);

	const handleSortOrderChange = (value: string) => {
		// type guard to ensure value is a valid SortOrder
		if (Object.values(SortOrder).includes(value as SortOrder)) {
			setSortOrder(value as SortOrder);
		}
	};

	const renderListings = () => {
		const totalListingText = () => {
			const totalLength = sortedProperties?.length ?? 0;
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
				<div className="flex items-center justify-between mb-5">
					{totalListingText()}
					{renderSortSelect()}
				</div>
				{sortedProperties?.map((listing, index) => (
					<div key={listing.id} className="flex mx-auto md:flex-row flex-col">
						<Preview
							listingImage={listing.property.previewImage}
							listingPromotion={listing.offer.promotion}
						/>
						<div
							className={`flex flex-col md:flex-row justify-between border-b border-y-gray-200 w-full md:py-2 ${
								index === 0 ? "border-t" : ""
							}`}
						>
							<PropertyCard
								address={listing.property.address}
								cancellationOption={listing.offer.cancellationOption}
								offerName={listing.offer.name}
								rating={listing.property.rating}
								title={listing.property.title}
							/>
							<Price
								displayPrice={listing.offer.displayPrice}
								savings={listing.offer.savings}
							/>
						</div>
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
			<main className="flex justify-center mx-5 md:mx-16 rounded-lg">
				<div className="flex p-6 w-full">
					{dataFetchState === FetchState.LOADING && (
						<div data-testid="loading-state">
							<p>Loading...</p>
						</div>
					)}
					{dataFetchState === FetchState.ERROR && (
						<div data-testid="error-state">
							<p>Error loading data</p>
						</div>
					)}
					{dataFetchState === FetchState.SUCCESS && (
						<div data-testid="success-state" className="w-full">
							{renderListings()}
						</div>
					)}
				</div>
			</main>
		</div>
	);
}

export default App;
