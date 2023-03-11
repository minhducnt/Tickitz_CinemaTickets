import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axiosClient from '../../../shared/apis/axiosClient';
import { sortArrayDescending } from '../../../shared/utils/utils';
import { usePagination } from '../../../shared/hooks/usePagination';
import {
	LoadingSpinner,
	ActionStatus,
	Table,
	Pagination,
} from '../../../components/common';
import { scrollTop } from '../../../shared/utils/utils';

const StyledUserHistory = styled.div``;

const UserHistory = () => {
	const { id } = JSON.parse(localStorage.getItem('currentUser'));
	const [bookings, setBookings] = useState([]);
	const [loading, setLoading] = useState(true);
	const { pagination, setPagination } = usePagination(0, 10);
	const { page, limit } = pagination;
	const displayVisited = (page + 1) * limit;
	const displayBookings = bookings.slice(
		displayVisited - limit,
		displayVisited
	);
	const handlePageChange = (newPage) => {
		setPagination({ ...pagination, page: newPage });
	};

	const fetchMyBookings = async () => {
		setLoading(true);
		try {
			const { data } = await axiosClient().get(`orders/users/${id}`);
			const sortBooking = sortArrayDescending(data, 'id');
			setBookings(sortBooking);
			setPagination({
				...pagination,
				totalPages: Math.ceil(sortBooking?.length / limit) - 1,
			});
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchMyBookings();
		scrollTop();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loading) return <LoadingSpinner />;
	if (displayBookings.length === 0)
		return (
			<div className="container">
				<h2 style={{ textAlign: 'center', color: 'var(--gray-color)' }}>
					Empty ticket history
				</h2>
			</div>
		);
	return (
		<StyledUserHistory>
			<div className="container">
				<h1 className="text-display-lg-bold-56 text-primary text-center">
					Tickets
				</h1>
				<Table>
					<table>
						<thead>
							<tr>
								<th>Booking Date</th>
								<th>Booking Time</th>
								<th>Status</th>
								<th>Total</th>
							</tr>
						</thead>
						<tbody>
							{displayBookings.map((booking) => (
								<tr key={booking.id}>
									<td>{booking.date}</td>
									<td>{booking.time}</td>
									<td>
										{!booking.paid ? (
											<ActionStatus status="cancel">Unpaid</ActionStatus>
										) : (
											<ActionStatus status="success">Paid</ActionStatus>
										)}
									</td>
									<td>{booking.total}</td>
								</tr>
							))}
						</tbody>
					</table>
				</Table>
				<Pagination pagination={pagination} onPageChange={handlePageChange} />
			</div>
		</StyledUserHistory>
	);
};

export default UserHistory;
