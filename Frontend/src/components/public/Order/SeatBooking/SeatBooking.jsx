import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetSelectingSeat } from '../../../../service/actions/seat';
import { useCountDownBooking } from '../../../../shared/hooks/useCountDownBooking';
import { formatTimeTwoDigit } from '../../../../shared/utils/formatDate';
import { path } from '../../../../shared/constants/path';
import Swal from 'sweetalert2';
import clsx from 'clsx';
import './styles.css';

const COUNTDOWN_MINUTES = 1;
const COUNTDOWN_SECONDS = 0;
const BookingSeating = ({
	seats,
	orderedSeats,
	isSelecting = [],
	onClickSeat,
}) => {
	const dispatch = useDispatch();
	const navigate = useHistory();
	const checkIsSelecting = (id) => {
		const index = isSelecting.findIndex((item) => id === item.id);
		return index !== -1 ? 'isSelecting' : 'selected';
	};
	const checkIsDisabled = (id) => {
		const index = orderedSeats.findIndex((item) => id === item.id);
		if (index !== -1) {
			return 'disabled';
		} else {
			checkIsSelecting(id);
		}
	};
	const { handleResetCountdown, minutes, seconds } = useCountDownBooking(
		COUNTDOWN_MINUTES,
		COUNTDOWN_SECONDS
	);

	useEffect(() => {
		if (minutes === 0 && seconds === 0) {
			Swal.fire({
				icon: 'warning',
				title: 'Time out',
				text: 'Tickets hold time to expire!',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				cancelButtonText: 'Return home',
				confirmButtonText: 'Continue booking',
			}).then((result) => {
				if (result.isDismissed) {
					navigate(path.home);
				}
				if (result.isConfirmed) {
					Swal.fire(
						'Start counting!',
						`Ticket holding time is ${formatTimeTwoDigit(
							COUNTDOWN_MINUTES,
							COUNTDOWN_SECONDS
						)}`
					);
					dispatch(resetSelectingSeat());
					handleResetCountdown();
				}
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [seconds]);

	return (
		<div className="Cinema">
			<div className="countdown">
				<h3 className="countdown-heading">Seat Holding Time</h3>
				<p className="countdown-number">
					{formatTimeTwoDigit(minutes, seconds)}
				</p>
				<div className="line-screen" />
			</div>
			<div className="screen" />
			<div className="seats">
				{seats.map((seat) => {
					const isSelected = isSelecting.includes(seat);
					const isOccupied = checkIsDisabled(seat.id);
					return (
						<span
							tabIndex="0"
							key={seat.id}
							className={clsx(
								'seat',
								isSelected && 'selected',
								isOccupied && 'occupied'
							)}
							onClick={isOccupied ? null : () => onClickSeat(seat)}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default BookingSeating;
