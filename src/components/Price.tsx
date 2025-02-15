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
			<p>1 night total {currency}</p>
			<p>
				{currencySign !== currency ? <sup>{currencySign}</sup> : ""}
				{formattedPrice} {currencySign === currency ? currency : ""}
			</p>
		</div>
	);
}

export default Price;
