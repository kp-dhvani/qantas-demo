interface RatingProps {
	value: number;
	type: "star" | "self";
	maxValue?: number;
}

function Ratings({ value, type, maxValue = 5 }: Readonly<RatingProps>) {
	const roundedValue = Math.round(value * 2) / 2; // Round to nearest 0.5
	const filledItems = Math.floor(roundedValue);
	const hasHalf = roundedValue % 1 !== 0;
	const emptyItems = maxValue - filledItems - (hasHalf ? 1 : 0);

	const renderRatingItem = (
		filled: boolean,
		index: number,
		half: boolean = false
	) => {
		if (type === "star") {
			return (
				<svg
					key={index}
					className="w-5 h-5"
					viewBox="0 0 24 24"
					fill={filled ? "#FFD700" : half ? "url(#halfGradient)" : "none"}
					stroke="#FFD700"
					strokeWidth="1"
				>
					<defs>
						<linearGradient id="halfGradient">
							<stop offset="50%" stopColor="#FFD700" />
							<stop offset="50%" stopColor="white" />
						</linearGradient>
					</defs>
					<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
				</svg>
			);
		} else {
			return (
				<svg key={index} className="w-5 h-5" viewBox="0 0 24 24">
					<circle
						cx="12"
						cy="12"
						r="10"
						fill={filled ? "#FFD700" : half ? "url(#halfGradient)" : "none"}
						stroke="#FFD700"
						strokeWidth="1"
					/>
				</svg>
			);
		}
	};

	return (
		<div className="flex gap-1 mt-5 md:m-1">
			{/* filled items */}
			{[...Array(filledItems)].map((_, i) => renderRatingItem(true, i))}

			{/* half item if needed */}
			{hasHalf && renderRatingItem(false, filledItems, true)}

			{/* empty items */}
			{[...Array(emptyItems)].map((_, i) =>
				renderRatingItem(false, filledItems + (hasHalf ? 1 : 0) + i)
			)}
		</div>
	);
}

export default Ratings;
