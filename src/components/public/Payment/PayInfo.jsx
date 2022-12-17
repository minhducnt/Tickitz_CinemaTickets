import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class MovieDesc extends Component {
	state = {
		selectShowtime: JSON.parse(sessionStorage.getItem('selectShowtime')),
	};
	render() {
		const { selectShowtime } = this.state;
		const { ticket } = this.props;
		return (
			<div>
				<ListGroup variant="flush">
					<ListGroup.Item className="pb-0">
						<p className="float-left text-lg-20 text-color-label">
							Date & time
						</p>
						<p className="float-right text-lg-20">
							{selectShowtime.showDate} at {selectShowtime.timeStart}
						</p>
					</ListGroup.Item>
					<ListGroup.Item className="pb-0">
						<p className="float-left text-lg-20 text-color-label">
							Movie title
						</p>
						<p className="float-right text-lg-20">
							{selectShowtime.movie.name}
						</p>
					</ListGroup.Item>
					<ListGroup.Item className="pb-0">
						<p className="float-left text-lg-20 text-color-label">
							Cinema name
						</p>
						<p className="float-right text-lg-20">
							{selectShowtime.theater.name}
						</p>
					</ListGroup.Item>
					<ListGroup.Item className="pb-0">
						<p className="float-left text-lg-20 text-color-label">
							Number of tickets
						</p>
						<p className="float-right text-lg-20">{ticket.length} pieces</p>
					</ListGroup.Item>
					<ListGroup.Item className="pb-0">
						<p className="float-left text-lg-20 text-color-label">
							Total payment
						</p>
						<p className="float-right text-link-lg">
							${selectShowtime.price * ticket.length}
						</p>
					</ListGroup.Item>
				</ListGroup>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	ticket: JSON.parse(sessionStorage.getItem('ticket')),
	showtime: state.showtime.selectShowtime,
});

export default withRouter(connect(mapStateToProps)(MovieDesc));
