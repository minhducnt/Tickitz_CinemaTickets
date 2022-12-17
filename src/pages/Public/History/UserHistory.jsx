import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axiosClient from '../../../shared/apis/axiosClient';
import { sortArrayDescending } from '../../../shared/utils/utils';
import { usePagination } from '../../../shared/hooks/usePagination';
import {
	LoadingSpinner,
	ActionView,
	ActionDelete,
	ActionStatus,
	Table,
	Pagination,
} from '../../../components/common';
import { formatLocaleDateString } from '../../../shared/utils/formatDate';
import { swalDelete } from '../../../shared/utils/swalWarningDelete';
import { deleteOrderById } from '../../../service/actions/order';

const StyledUserHistory = styled.div``;

const UserHistory = () => {
	const { id } = JSON.parse(localStorage.getItem('currentUser'));
	const dispatch = useDispatch();
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
	const openInNewTab = (url) => {
		const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
		if (newWindow) newWindow.opener = null;
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
	const handleDeleteTicket = (idOrder) => {
		swalDelete('ticket', () => dispatch(deleteOrderById(idOrder)));
	};
	useEffect(() => {
		fetchMyBookings();
		window.scrollTo(0, 0);
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
				<Table>
					<table>
						<thead>
							<tr>
								<th>ID</th>
								<th>Booking Date</th>
								<th>Booking Time</th>
								<th>Status</th>

								<th>Total</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{displayBookings.map((booking) => (
								<tr key={booking.id}>
									<td>{booking.id}</td>
									<td>{formatLocaleDateString(booking.date)}</td>
									<td>{booking.time}</td>
									<td>
										{!booking.paid ? (
											<ActionStatus status="cancel">Unpaid</ActionStatus>
										) : (
											<ActionStatus status="success">Paid</ActionStatus>
										)}
									</td>
									<td>{booking.total}</td>
									<td>
										<ActionView
											onClick={() =>
												openInNewTab(`http://localhost:8888/${booking.id}`)
											}
										></ActionView>
										<ActionDelete
											onClick={() => handleDeleteTicket(booking.id)}
										></ActionDelete>
									</td>
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
