import { PromotionProps } from "../lib/types";

function Promotion({ title }: Readonly<PromotionProps>) {
	return (
		<div>
			<p className="text-">{title}</p>
		</div>
	);
}

export default Promotion;
