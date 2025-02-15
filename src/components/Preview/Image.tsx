import { PreviewImage } from "../lib/types";

function Image({ caption, url }: Readonly<PreviewImage>) {
	return (
		<div className="flex justify-center my-10">
			<img
				src={url}
				alt={caption}
				className="max-w-full h-auto"
				loading="lazy"
			/>
		</div>
	);
}

export default Image;
