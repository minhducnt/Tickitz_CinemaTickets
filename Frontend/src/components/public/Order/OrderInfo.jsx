import React, { Component } from 'react';
import { Card, Col } from 'react-bootstrap';
import { Ticket } from 'react-bootstrap-icons';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class OrderInfo extends Component {
	state = {
		selectShowtime: JSON.parse(sessionStorage.getItem('selectShowtime')),
	};

	render() {
		const { selectShowtime } = this.state;
		const { selectedSeats } = this.props;
		const isHaveSelecting = selectedSeats.length > 0;
		return (
			<Col xs={12} lg={4}>
				<p className="text-display-xs-bold">Order Info</p>
				<Card className="border-0 shadow order-seat">
					<Card.Body className="pb-0">
						<div className="text-center">
							<Ticket size={50} />
							<p className="text-link-lg pt-2">{selectShowtime.theater.name}</p>
						</div>
						<div className="d-flex justify-content-between">
							<p className="text-xs text-color-label">Movie selected</p>
							<p className="text-right text-link-xs text-color-title">
								{selectShowtime.movie.name}
							</p>
						</div>
						<div className="d-flex justify-content-between">
							<p className="text-xs text-color-label">
								<Moment format="DD MMMM YYYY">{selectShowtime.release}</Moment>
							</p>
							<p className="text-right text-link-xs text-color-title">
								{selectShowtime.timeStart}
							</p>
						</div>
						<div className="d-flex justify-content-between">
							<p className="text-xs text-color-label">One ticket price</p>
							<p className="text-right text-link-xs text-color-title">
								${selectShowtime.price}
							</p>
						</div>
						<div className="d-flex justify-content-between">
							<p className="text-xs text-color-label">Seat chosen</p>
							<div className="d-flex justify-content-end">
								{isHaveSelecting ? (
									selectedSeats
										.map((seat) => (
											<p
												key={seat.id}
												className="text-right text-link-xs text-color-title"
											>
												<span>{seat.name}</span>
											</p>
										))
										.reduce(
											(prev, curr) =>
												prev === null ? [curr] : [prev, ', ', curr],
											null
										)
								) : (
									<p className="text-right text-link-xs text-color-title">
										No thing
									</p>
								)}
							</div>
						</div>
					</Card.Body>
					<hr />
					<Card.Body className="pt-0">
						<p className="float-left text-link-md">Total Payment</p>
						<p className="float-end text-display-xs-bold text-primary text-right">
							${selectShowtime.price * selectedSeats.length}
						</p>
					</Card.Body>
				</Card>
			</Col>
		);
	}
}

const mapStateToProps = (state) => ({
	seat: state.seat,
	selectedSeats: state.seat.selectedSeats,
});

export default withRouter(connect(mapStateToProps)(OrderInfo));
