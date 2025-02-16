export type PromotionProps = {
	title: string;
	type?: string;
};

export interface PreviewImage {
	url: string;
	caption: string;
	imageType?: string;
}

export interface Rating {
	ratingValue: number;
	ratingType: "star" | "self";
}

export interface Property {
	propertyId: string;
	title: string;
	address: string[];
	previewImage: PreviewImage;
	rating: Rating;
}

export interface Price {
	amount: number;
	currency: string;
}

export interface Promotion {
	title: string;
	type: string;
}

export interface CancellationOption {
	cancellationType: "NOT_REFUNDABLE" | "FREE_CANCELLATION";
}

export interface Offer {
	promotion: Promotion;
	name: string;
	displayPrice: Price;
	savings: Price | null;
	cancellationOption: CancellationOption;
}

export interface ListingProps {
	id: string;
	property: Property;
	offer: Offer;
}

export interface DataResponse {
	results: ListingProps[];
}

export enum FetchState {
	INIT = "init",
	LOADING = "loading",
	SUCCESS = "success",
	ERROR = "error",
}

export enum SortOrder {
	PRICE_HIGH_LOW = "price-high-low",
	PRICE_LOW_HIGH = "price-low-high",
}

export const SORT_OPTIONS = {
	[SortOrder.PRICE_HIGH_LOW]: "Price high-low",
	[SortOrder.PRICE_LOW_HIGH]: "Price low-high",
} as const;

export interface SortOption {
	value: SortOrder;
	label: string;
}

export interface PropertyCardValues {
	rating: Property["rating"];
	title: Property["title"];
	address: Property["address"];
	offerName: Offer["name"];
	cancellationOption: Offer["cancellationOption"];
}
