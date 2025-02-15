import { PreviewImage, PromotionProps } from "../lib/types";
import Image from "./Image";
import Promotion from "./Promotion";

function ListingPreview({
	listingImage,
	listingPromotion,
}: Readonly<{ listingImage: PreviewImage; listingPromotion: PromotionProps }>) {
	return (
		<>
			<Image {...listingImage} />
			<Promotion {...listingPromotion} />
		</>
	);
}

export default ListingPreview;
