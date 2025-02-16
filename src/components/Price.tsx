import { Offer } from "../lib/types";

interface PriceProps {
	readonly displayPrice: Offer["displayPrice"];
	readonly savings?: Offer["savings"];
}

/**
 * assuming display and savings currency will be the same
 */
function Price({ displayPrice, savings }: PriceProps) {
	const { amount, currency } = displayPrice;
	const currencySign = currency.toLocaleLowerCase() === "aud" ? "$" : currency;
	const formattedPrice = amount.toFixed(2);

	const renderSavings = () => {
		return (
			<p className="text-red-900">
				Save {currency} {savings?.amount}
				<sup>~</sup>
			</p>
		);
	};
	return (
		<div className="mb-5 mt-5 md:mt-auto ">
			<p className="text-xs text-gray-600">1 night total ({currency})</p>
			<p className="text-bold text-xl">
				{currencySign !== currency ? <sup>{currencySign}</sup> : ""}
				{formattedPrice} {currencySign === currency ? currency : ""}
			</p>
			{savings ? renderSavings() : null}
		</div>
	);
}

export default Price;
