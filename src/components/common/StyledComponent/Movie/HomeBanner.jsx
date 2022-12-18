import useSWR from 'swr';
import { SwiperSlide, Swiper } from 'swiper/react';
import { useHistory } from 'react-router-dom';
import { tmdbAPI, fetcher } from '../../../../shared/apis/tmdbApi';
import styled from 'styled-components';
import { Button, ImageResize } from '../..';
import { path } from '../../../../shared/constants/path';

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

const HomeBanner = () => {
	const { data, error } = useSWR(tmdbAPI.getUpcoming(), fetcher);
	const loading = !data && !error;
	const movies = data?.results || [];
	return (
		<div className="container">
			<StyledHomeBanner>
				{loading && <div className="banner-loading"></div>}
				{!loading && (
					<Swiper grabCursor="true" slidesPerView={'auto'}>
						{movies.length > 0 &&
							movies.map((item) => (
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
	const { title, backdrop_path, id } = item;
	const navigate = useHistory();
	return (
		<div className="banner-item">
			<ImageResize
				width="1440"
				url={tmdbAPI.imageOriginal(backdrop_path)}
				imageError={tmdbAPI.imageOriginal('4gqDdWoTf1wNOiliYWXMMSIlBnK.jpg')}
				className="banner-img"
				alt="banner"
			/>
			<div className="banner-content">
				<h2 className="banner-title">{title}</h2>
				<div className="category">
					<span>Animation</span>
					<span>Adventure</span>
					<span>Action</span>
				</div>
				<Button
					className="banner-watch"
					kind="gradient"
					onClick={() => navigate.push(`${path.detailTmdb}?tmdbId=${id}`)}
				>
					Watch now
				</Button>
			</div>
			<div className="overlay"></div>
		</div>
	);
}

export default HomeBanner;
