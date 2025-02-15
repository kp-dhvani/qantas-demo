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
	ratingType: string;
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
	cancellationType: string;
}

export interface Offer {
	promotion: Promotion;
	name: string;
	displayPrice: Price;
	savings: Price;
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
