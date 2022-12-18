import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import noImage from '../../../../assets/images/no-image.png';
import { path } from '../../../../shared/constants/path';

const ImageResize = ({
	to,
	url,
	width,
	height,
	alt,
	className,
	imageError = noImage,
}) => {
	const [fallback, setFallback] = useState('');
	const handleErrorImage = () => {
		setFallback(imageError);
	};
	if (to) {
		return (
			<Link to={to}>
				<LazyLoadImage
					onError={handleErrorImage}
					className={className}
					src={url || fallback || path.resizeImage(url, width, height)}
					effect="opacity"
					alt={alt}
				/>
			</Link>
		);
	}
	return (
		<LazyLoadImage
			onError={handleErrorImage}
			className={className}
			src={url || fallback || path.resizeImage(url, width, height)}
			effect="opacity"
			alt={alt}
		/>
	);
};

ImageResize.defaultProps = {
	to: '',
	height: '',
	width: '',
	alt: '',
	className: '',
};

export default ImageResize;
