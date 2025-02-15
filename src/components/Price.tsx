import { Offer } from "./lib/types";

interface PriceProps {
	readonly displayPrice: Offer["displayPrice"];
}

/**
 * assuming display and savings currency will be the same
 */
function Price({ displayPrice }: PriceProps) {
	const { amount, currency } = displayPrice;
	const currencySign = currency.toLocaleLowerCase() === "aud" ? "$" : currency;
	const formattedPrice = amount.toFixed(2);
	return (
		<div>
			<p>
				<span>1</span> night total {currencySign}
			</p>
			<p>
				{currencySign} ${formattedPrice}
			</p>
		</div>
	);
}

export default Price;
