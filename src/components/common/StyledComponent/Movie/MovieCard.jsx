import styled from 'styled-components';
import ImageResize from '../Image/ImageResize';
import MovieTitle from './MovieTitle';

const StyledMovieCard = styled.div`
	.lazy-load-image-loaded {
		width: 100%;
		height: 100%;
	}
	.card-media {
		border-radius: 4px;
		overflow: hidden;
		background-color: var(--bg-skeleton);
		aspect-ratio: 2/3;
		border-radius: 10px;
	}
	.card-poster {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

const MovieCard = ({ movie }) => {
	if (!movie) return null;
	const { image, id, name } = movie;
	return (
		<StyledMovieCard>
			<div className="card-media">
				<ImageResize
					url={image}
					width="200"
					className="card-poster"
					alt="poster"
					to={`/movie-detail/${id}`}
				/>
			</div>
			<MovieTitle to={`/movie-detail/${id}`}>{name}</MovieTitle>
		</StyledMovieCard>
	);
};

export default MovieCard;
