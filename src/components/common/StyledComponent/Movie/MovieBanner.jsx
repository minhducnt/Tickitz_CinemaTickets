import { useEffect, useState } from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import { useHistory } from 'react-router-dom';
import axiosClient from '../../../../shared/apis/axiosClient';
import { tmdbAPI } from '../../../../shared/apis/tmdbApi';
import styled from 'styled-components';
import { Button, ImageResize } from '../..';
import { capitalizeFirstLowercaseRest } from '../../../../shared/utils/utils';

const StyledHomeBanner = styled.section`
	border-radius: 10px;
	overflow: hidden;
	.banner-item {
		position: relative;
		height: 500px;
		border-radius: 10px;
		overflow: hidden;
	}
	.overlay {
		position: absolute;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 10;
	}
	.banner-loading {
		border-radius: 10px;
		height: 500px;
		background-color: var(--bg-skeleton);
	}
	.banner-img {
		object-fit: cover;
		object-position: center;
		aspect-ratio: 16/9;
	}
	.banner-content {
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: 20;
		padding: 30px;
	}
	.banner-title {
		font-size: 35px;
		font-weight: 700;
		color: var(--white);
	}
	.category {
		display: flex;
		gap: 10px;
		margin-bottom: 20px;
		font-size: 20px;
		color: var(--white);
	}
	.banner-watch {
		font-size: 20px;
		width: 160px;
		height: 45px;
	}
	@media screen and (max-width: 767.98px) {
		.banner-title {
			font-size: 2.6rem;
		}
	}
`;

const MovieBanner = () => {
	const [movieList, setMovieList] = useState({ loading: true, data: [] });

	const fetchMovieList = async () => {
		setMovieList({ ...movieList, loading: true });
		try {
			const { data } = await axiosClient().get(`movies/coming=true`);
			setMovieList({ data: data, loading: false });
		} catch (err) {
			setMovieList({ ...movieList, loading: false });
			console.log(err);
		}
	};

	useEffect(() => {
		fetchMovieList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="container">
			<StyledHomeBanner>
				{movieList.loading && <div className="banner-loading"></div>}
				{!movieList.loading && (
					<Swiper grabCursor="true" slidesPerView={'auto'}>
						{movieList.data.length > 0 &&
							movieList.data.map((item) => (
								<SwiperSlide key={item.id}>
									<HomeBannerItem item={item}></HomeBannerItem>
								</SwiperSlide>
							))}
					</Swiper>
				)}
			</StyledHomeBanner>
		</div>
	);
};

function HomeBannerItem({ item }) {
	const { name, genres, image, id } = item;
	const navigate = useHistory();
	return (
		<div className="banner-item">
			<ImageResize
				width="1440"
				url={image}
				imageError={tmdbAPI.imageOriginal('4gqDdWoTf1wNOiliYWXMMSIlBnK.jpg')}
				className="banner-img"
				alt="banner"
			/>
			<div className="banner-content">
				<h2 className="banner-title">{name}</h2>
				<div className="category">
					{genres?.map((item) => (
						<span key={item.id}>{capitalizeFirstLowercaseRest(item.name)}</span>
					))}
				</div>
				<Button
					className="banner-watch"
					kind="gradient"
					onClick={() => navigate.push(`/movie-detail/${id}`)}
				>
					Watch now
				</Button>
			</div>
			<div className="overlay"></div>
		</div>
	);
}

export default MovieBanner;
