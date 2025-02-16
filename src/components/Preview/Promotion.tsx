import { PromotionProps } from "../lib/types";

function Promotion({ title }: Readonly<PromotionProps>) {
	return (
		<div className="absolute top-[7px] bottom-0 z-10 z-10 text-xs">
			<p className="text-[red] bg-[white] m-0 px-[10px] py-[3px]">{title}</p>
		</div>
	);
}

export default Promotion;
