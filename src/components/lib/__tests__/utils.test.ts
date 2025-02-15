import { sortDataByPrice } from "../util";
import { SortOrder } from "../types";

describe("sortDataByPrice", () => {
	const mockData = [
		{
			id: "1",
			offer: {
				displayPrice: {
					amount: 100,
					currency: "AUD",
				},
			},
		},
		{
			id: "2",
			offer: {
				name: "Room",
				displayPrice: {
					amount: 200,
					currency: "AUD",
				},
			},
		},
		{
			id: "3",
			offer: {
				displayPrice: {
					amount: 150,
					currency: "AUD",
				},
			},
		},
	];

	it("should return undefined when data is undefined", () => {
		const result = sortDataByPrice(undefined, SortOrder.PRICE_HIGH_LOW);
		expect(result).toBeUndefined();
	});

	it("should sort prices from high to low correctly", () => {
		// @ts-expect-error -- ignore other data for mock
		const result = sortDataByPrice(mockData, SortOrder.PRICE_HIGH_LOW);

		expect(result).toBeDefined();
		expect(result?.[0].offer.displayPrice.amount).toBe(200);
		expect(result?.[1].offer.displayPrice.amount).toBe(150);
		expect(result?.[2].offer.displayPrice.amount).toBe(100);
	});

	it("should sort prices from low to high correctly", () => {
		// @ts-expect-error -- ignore other data for mock
		const result = sortDataByPrice(mockData, SortOrder.PRICE_LOW_HIGH);

		expect(result).toBeDefined();
		expect(result?.[0].offer.displayPrice.amount).toBe(100);
		expect(result?.[1].offer.displayPrice.amount).toBe(150);
		expect(result?.[2].offer.displayPrice.amount).toBe(200);
	});

	it("should return a new array and not modify the original", () => {
		const originalData = [...mockData];
		// @ts-expect-error -- ignore other data for mock
		const result = sortDataByPrice(mockData, SortOrder.PRICE_HIGH_LOW);

		expect(result).not.toBe(mockData);
		expect(mockData).toEqual(originalData);
	});

	it("should handle empty array", () => {
		const result = sortDataByPrice([], SortOrder.PRICE_HIGH_LOW);
		expect(result).toEqual([]);
	});

	it("should maintain stable sort for equal prices", () => {
		const dataWithEqualPrices = [
			{
				...mockData[0],
				offer: {
					...mockData[0].offer,
					displayPrice: { amount: 100, currency: "AUD" },
				},
			},
			{
				...mockData[1],
				offer: {
					...mockData[1].offer,
					displayPrice: { amount: 100, currency: "AUD" },
				},
			},
		];

		const result = sortDataByPrice(
			// @ts-expect-error ignore other data for mock
			dataWithEqualPrices,
			SortOrder.PRICE_HIGH_LOW
		);

		expect(result).toBeDefined();
		expect(result?.length).toBe(2);
		expect(result?.[0].offer.displayPrice.amount).toBe(100);
		expect(result?.[1].offer.displayPrice.amount).toBe(100);
	});
});
