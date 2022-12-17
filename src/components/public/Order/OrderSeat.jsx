import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Row, Col, Spinner } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import SeatBooking from './SeatBooking/SeatBooking';
import { TagSmall } from '../../common';
import {
	selectSeat,
	resetSelectingSeat,
	getAllSeatsAvailableByShowtime,
	getAllSeatsOrderedByShowtime,
} from '../../../service/actions/seat';
import {
	addManyTickets,
	getTicketsByShowtime,
} from '../../../service/actions/ticket';
import { createOrder } from '../../../service/actions/order';
import { path } from '../../../shared/constants/path';
import './styles.css';

class OrderSeat extends Component {
	state = {
		isLoading: false,
		selectShowtime: JSON.parse(sessionStorage.getItem('selectShowtime')),
	};
	async componentDidMount() {
		const {
			seat,
			ticket,
			getAllSeatsAvailableByShowtime,
			getAllSeatsOrderedByShowtime,
			getTicketsByShowtime,
		} = this.props;
		const { selectShowtime } = this.state;
		if (!seat.seats.length)
			await getAllSeatsAvailableByShowtime(selectShowtime.id);
		if (!seat.orderedSeats.length)
			await getAllSeatsOrderedByShowtime(selectShowtime.id);
		if (!ticket.length) await getTicketsByShowtime(selectShowtime.id);
	}
	handleClickSeat = (seat) => {
		const { selectSeat } = this.props;
		selectSeat(seat);
	};
	handleCheckOut = async () => {
		const { history } = this.props;
		const { selectShowtime } = this.state;
		this.setState({ isLoading: true });
		await this.props
			.addManyTickets(selectShowtime.id, this.props.selectedSeats)
			.then(() => {
				let orderedTickets = this.props.ticket.map((ticket) => {
					return { ticket: ticket };
				});
				//this.props.createOrder(orderedTickets);
				sessionStorage.setItem('ticket', JSON.stringify(orderedTickets));
				//toast.success(this.props.order.message);
			})
			.catch(function (error) {
				let errorMsg = error.message;
				toast.error(errorMsg);
			});
		this.setState({ isLoading: false });
		this.props.resetSelectingSeat();
		history.push(path.payment);
	};
	render() {
		const { selectShowtime } = this.state;
		const { seat, selectedSeats } = this.props;
		const isHaveSelecting = selectedSeats.length > 0;
		return (
			<Col xs={12} lg="8">
				<p className="text-display-xs-bold">Choose Your Seat</p>
				<Card className="border-0 p-5 order-seat">
					<Card.Body>
						<SeatBooking
							seats={seat.seats}
							orderedSeats={seat.orderedSeats}
							isSelecting={selectedSeats}
							onClickSeat={this.handleClickSeat}
						/>
						<p className="text-link-lg pt-4">Seating key</p>
						<Row lg="auto">
							<Col>
								<div className="availableBox float-left mr-3"></div>
								<TagSmall kind="normal">Seats normal</TagSmall>
							</Col>
							<Col>
								<div className="selectBox float-left mr-3"></div>
								<TagSmall kind="normal">Seats are booking</TagSmall>
							</Col>
							<Col>
								<div className="soldBox float-left mr-3"></div>
								<TagSmall kind="normal">Seats are booked</TagSmall>
							</Col>
						</Row>
					</Card.Body>
				</Card>
				<div className="pt-4 checkout">
					<Link to={`/movie-detail/${selectShowtime.movie.id}`}>
						<Button
							variant="outline-primary"
							className="float-left col-12 col-md-5"
						>
							Change showtimes
						</Button>
					</Link>
					{this.state.isLoading === false ? (
						<Button
							disabled={!isHaveSelecting}
							variant="primary shadow"
							className="float-right col-12 col-md-5"
							onClick={this.handleCheckOut}
						>
							Checkout now
						</Button>
					) : (
						<Button
							variant="primary shadow"
							className="float-right col-12 col-md-5"
							type="loading"
							block
							disabled
						>
							<Spinner
								as="span"
								animation="border"
								size="sm"
								role="status"
								aria-hidden="true"
							/>
							<span className="visually-hidden"> Loading...</span>
						</Button>
					)}
				</div>
			</Col>
		);
	}
}

const mapStateToProps = (state) => ({
	order: state.order,
	seat: state.seat,
	ticket: state.ticket.tickets,
	selectedSeats: state.seat.selectedSeats,
});

const mapDispatchToProps = {
	selectSeat,
	resetSelectingSeat,
	createOrder,
	getAllSeatsAvailableByShowtime,
	getAllSeatsOrderedByShowtime,
	getTicketsByShowtime,
	addManyTickets,
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(OrderSeat)
);
