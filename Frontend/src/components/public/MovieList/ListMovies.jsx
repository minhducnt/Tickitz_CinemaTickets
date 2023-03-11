import { useEffect, useState } from 'react';
import { usePagination } from '../../../shared/hooks/usePagination';
import axiosClient from '../../../shared/apis/axiosClient';
import { MovieList, Tag } from '../../common';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { path } from '../../../shared/constants/path';

const ListMovies = () => {
	const [movieList, setMovieList] = useState({ loading: true, data: [] });
	const { pagination, handlePageChange, setPagination } = usePagination(0, 10);

	const fetchMovieList = async () => {
		setMovieList({ ...movieList, loading: true });
		try {
			const { data } = await axiosClient().get(
				`movies?pageNumber=${pagination.page + 1}`
			);
			setPagination({
				...pagination,
				page: data.pageNumber,
				limit: data.pageSize,
				totalPages: data.totalPages - 1,
			});
			setMovieList({ data: data.content, loading: false });
		} catch (err) {
			setMovieList({ ...movieList, loading: false });
			console.log(err);
		}
	};

	useEffect(() => {
		fetchMovieList();
	}, [pagination.page]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className="home">
			<div className="home-main">
				<div className="container">
					<Row className="pl-3 pt-4">
						<Tag kind="gray">Now Showing</Tag>
						<Col>
							<Link to={path.movies}>
								<h5 className="text-primary pt-3 float-right">Explore All</h5>
							</Link>
						</Col>
					</Row>
					<MovieList
						loading={movieList.loading}
						data={movieList.data}
						pagination={pagination}
						handlePageChange={handlePageChange}
					/>
				</div>
			</div>
		</div>
	);
};

export default ListMovies;
