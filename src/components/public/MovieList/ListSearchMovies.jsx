import { useEffect, useState } from 'react';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import { usePagination } from '../../../shared/hooks/usePagination';
import { scrollTop } from '../../../shared/utils/utils';
import axiosClient from '../../../shared/apis/axiosClient';

import SearchInput from '../Search/SearchInput';
import SearchList from '../Search/SearchList';

const ListSearchMovies = () => {
	const [movieList, setMovieList] = useState({ loading: true, data: [] });
	const { pagination, handlePageChange, setPagination } = usePagination(0, 10);
	const [filter, setFilter] = useState('');
	const filterDebounce = useDebounce(filter, 500);

	const fetchMovieList = async () => {
		setMovieList({ ...movieList, loading: true });
		try {
			if (filterDebounce) {
				const { data } = await axiosClient().get(
					`movies/search/${filterDebounce}`
				);
				setMovieList({ data: data, loading: false });
				scrollTop();
			} else {
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
				scrollTop();
			}
		} catch (err) {
			setMovieList({ ...movieList, loading: false });
			console.log(err);
		}
	};

	useEffect(() => {
		fetchMovieList();
	}, [filterDebounce, pagination.page]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className="home">
			<div className="home-main">
				<div className="container">
					<SearchInput
						height="54px"
						placeholder="Search Movie..."
						setSearchValue={setFilter}
					/>
					<SearchList
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

export default ListSearchMovies;
