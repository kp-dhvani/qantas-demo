import { ListingProps, SORT_OPTIONS, SortOption, SortOrder } from "./types";

export const sortDataByPrice = (
	data: ListingProps[] | undefined,
	sortOrder: SortOrder
): ListingProps[] | undefined => {
	if (!data) return;
	const sortedData = [...data].sort((a, b) => {
		const priceA = a.offer.displayPrice.amount;
		const priceB = b.offer.displayPrice.amount;

		return sortOrder === SortOrder.PRICE_HIGH_LOW
			? priceB - priceA
			: priceA - priceB;
	});

	return sortedData;
};

export const createSortOptions = (): SortOption[] => {
	return Object.values(SortOrder).map((value) => ({
		value,
		label: SORT_OPTIONS[value],
	}));
};
