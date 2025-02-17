import { PreviewImage } from "../../lib/types";

function Image({ caption, url }: Readonly<PreviewImage>) {
	return (
		<div className="md:mr-4">
			<img src={url} alt={caption} className="max-w-full h-auto w-full" />
		</div>
	);
}

export default Image;
