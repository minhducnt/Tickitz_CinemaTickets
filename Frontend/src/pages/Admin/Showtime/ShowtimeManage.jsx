import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { TextClamp } from '../../../assets/styles/mixin';
import { path } from '../../../shared/constants/path';

import { usePagination } from '../../../shared/hooks/usePagination';
import { swalDelete } from '../../../shared/utils/swalWarningDelete';
import { sortArrayDescending } from '../../../shared/utils/utils';
import { formatLocaleDateString } from '../../../shared/utils/formatDate';
import axiosClient from '../../../shared/apis/axiosClient';

import {
	ActionDelete,
	ActionUpdate,
	ActionView,
	Button,
	ImageResize,
	LoadingSpinner,
	Pagination,
	Table,
	ResponsiveDialog,
} from '../../../components/common';

const StyledShowtimeManage = styled.div`
	.poster {
		width: 100px;
		overflow: hidden;
		border-radius: 8px;
	}
	.addNew {
		margin-bottom: 20px;
		margin-left: auto;
	}
	.movie-name {
		width: 100px;
		${TextClamp.multilines(2)}
	}
`;

const ShowtimeManage = () => {
	const [loading, setLoading] = useState(true);
	const [showtimes, setShowtimes] = useState([]);
	const { pagination, handlePageChange, setPagination } = usePagination(0, 10);
	const { page, limit } = pagination;
	const displayVisited = (page + 1) * limit;
	const displayShowtimes = showtimes.slice(
		displayVisited - limit,
		displayVisited
	);

	const fetchShowtimes = async () => {
		setLoading(true);
		try {
			const { data } = await axiosClient().get(`showtimes`);
			const sortShowtimes = sortArrayDescending(data, 'id');
			setShowtimes(data);
			setPagination({
				...pagination,
				totalPages: Math.ceil(sortShowtimes?.length / limit) - 1,
			});
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	const deleteShowtime = async (id) => {
		try {
			const token = localStorage.getItem('token');
			const { data } = await await axiosClient(token).delete(`showtimes/${id}`);
			if (data?.success === true) {
				toast.success('Showtime deleted successfully');
				fetchShowtimes();
			}
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
	};

	const handleDeleteShowtime = (id) => {
		swalDelete('showtime', () => deleteShowtime(id));
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		fetchShowtimes();
	}, [pagination.page]);
	return (
		<StyledShowtimeManage>
			{loading && <LoadingSpinner />}
			{!loading &&
				(displayShowtimes.length > 0 ? (
					<>
						<Table>
							<table>
								<thead>
									<tr>
										<th>ID</th>
										<th>Name</th>
										<th>Poster</th>
										<th>Show Date</th>
										<th>Start Time</th>
										<th>Duration</th>
										<th>Id Cinema</th>
										<th>Price</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{showtimes.map((showtime) => (
										<tr key={showtime.id}>
											<td>{showtime.id}</td>
											<td>
												<p className="movie-name">{showtime.movie.name}</p>
											</td>
											<td>
												<ImageResize
													className="poster"
													url={showtime.movie.image}
													width="100"
													alt="poster"
												/>
											</td>
											<td>{formatLocaleDateString(showtime?.showDate)}</td>
											<td>{showtime?.timeStart}</td>
											<td>{showtime?.movie.duration}</td>
											<td>{showtime?.theater?.name}</td>
											<td>{showtime.price}</td>
											<td>
												<ActionUpdate
													to={`${path.showtimeUpdate}/${showtime.id}`}
												/>
												<ActionView
													to={`${path.showtimeView}/${showtime.id}`}
												/>
												<ActionDelete
													onClick={() => handleDeleteShowtime(showtime.id)}
												/>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</Table>
						<Pagination
							pagination={pagination}
							onPageChange={handlePageChange}
						/>
					</>
				) : (
					<div className="container">
						<h2 style={{ textAlign: 'center', color: 'var(--gray-color)' }}>
							Empty showtimes data
						</h2>
					</div>
				))}
		</StyledShowtimeManage>
	);
};

export default ShowtimeManage;
