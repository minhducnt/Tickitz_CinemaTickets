import { useEffect, useState } from 'react';
import styled from 'styled-components';

const BackgroundImage = styled.div`
	background: url(${(props) => props.backgroundImage}) no-repeat center center;
`;

const LoadingLogo = ({ src, children }) => {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const image = new Image();
		image.addEventListener('load', () => setIsLoaded(true));
		image.src = src;
	}, [src]);

	if (!isLoaded) {
		return null;
	}

	return <BackgroundImage backgroundImage={src}>{children}</BackgroundImage>;
};

export default LoadingLogo;
