import { PropertyCardValues } from "../lib/types";
import Ratings from "./Ratings";

function PropertyCard({
	address,
	cancellationOption,
	offerName,
	rating,
	title,
}: Readonly<PropertyCardValues>) {
	return (
		<div className="flex md:flex-row flex-col">
			<div className="mr-10">
				<p className="text-bold text-xl">{title}</p>
				<p className="text-xs text-gray-600">{address}</p>
				<p className="mt-5 underline text-red-900">{offerName}</p>
				{cancellationOption.cancellationType === "FREE_CANCELLATION" ? (
					<p className="text-green-900 mt-8">Free cancellation</p>
				) : null}
			</div>
			<Ratings type={rating.ratingType} value={rating.ratingValue} />
		</div>
	);
}

export default PropertyCard;
