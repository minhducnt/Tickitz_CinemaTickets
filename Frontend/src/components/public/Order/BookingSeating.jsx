import styled from 'styled-components';
import { STATUS_SEAT } from '../../../shared/constants/styles';

const StyledBookingSeating = styled.div`
	flex: 1;
	display: grid;
	gap: 5px;
	grid-template-columns: repeat(10, 1fr);
	@media screen and (max-width: 767.98px) {
		grid-template-columns: repeat(8, 1fr);
	}
`;
export const StyledSeat = styled.button`
	width: 100%;
	aspect-ratio: 1/1;
	margin: 0 auto;
	text-align: center;
	border-radius: 6px;
	cursor: pointer;
	overflow: hidden;
	color: var(--white);
	border: 0;
	outline: 0;
	${(props) => props.status && STATUS_SEAT[props.status]}
	&:disabled {
		${STATUS_SEAT['bought']};
	}
`;

const BookingSeating = ({ seats, isSelecting = [], onClickSeat }) => {
	const checkIsSelecting = (id) => {
		const index = isSelecting.findIndex((item) => id === item.id);
		return index !== -1 ? 'isSelecting' : 'normal';
	};
	return (
		<StyledBookingSeating>
			{seats.map((seat) => (
				<StyledSeat
					disabled={seat.status}
					key={seat.id}
					onClick={() => onClickSeat(seat)}
					status={checkIsSelecting(seat.id)}
				>
					{seat.name}
				</StyledSeat>
			))}
		</StyledBookingSeating>
	);
};

export default BookingSeating;
