import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Image, Row, Button } from 'react-bootstrap';
import { Clock } from 'react-bootstrap-icons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import { Datepicker } from '@meinefinsternis/react-horizontal-date-picker';
import { enUS } from 'date-fns/locale';

import axiosClient from '../../../shared/apis/axiosClient';
import { onSelectShowtime } from '../../../service/actions/showtime';
import calendar from '../../../assets/images/calendar.svg';
import { getMovieDetail } from '../../../service/actions/movie';
import { createOrder } from '../../../service/actions/order';
import DetailMyTrailer from './components/DetailMyTrailer';
import { path } from '../../../shared/constants/path';
import {
	formatLocaleDateString,
	formatVNDate,
} from '../../../shared/utils/formatDate';
import './styles.css';

import { ImageResize } from '../../common';

class MovieDetailComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			today: new Date(),
			yesterday: new Date(new Date().valueOf() - 1000 * 60 * 60 * 24 * 1),
			nextWeek: new Date(new Date().valueOf() + 1000 * 60 * 60 * 24 * 8),
			showResults: [],
		};
	}

	componentDidMount() {
		const { id } = this.props.match.params;
		const token = localStorage.getItem('token');
		this.props.getMovieDetail(id);
		let showDate = formatLocaleDateString(this.state.today);
		showDate = formatVNDate(showDate);
		axiosClient(token)
			.post(`showtimes/movies/${id}`, { showDate: showDate })
			.then(async (res) => {
				this.setState({
					showResults: res.data,
				});
			});
	}

	handleChange = async (val) => {
		const [startValue, endValue, rangeDates] = val;
		if (this.state.today === startValue && this.state.today <= endValue) {
			this.setState({
				today: rangeDates[rangeDates.length - 1],
			});
		} else if (this.state.today === endValue) {
			this.setState({
				today: rangeDates[0],
			});
		}
	};

	searchShowtime = (val) => {
		this.handleChange(val).then(() => {
			const { id } = this.props.match.params;
			const token = localStorage.getItem('token');
			let showDate = formatLocaleDateString(this.state.today);
			showDate = formatVNDate(showDate);
			axiosClient(token)
				.post(`showtimes/movies/${id}`, {
					showDate,
				})
				.then(async (res) => {
					this.setState({
						showResults: res.data,
					});
				});
		});
	};

	handleSelectShowtime = (showtime) => {
		this.props.onSelectShowtime(showtime);
		sessionStorage.setItem('selectShowtime', JSON.stringify(showtime));
	};

	render() {
		const { details } = this.props;
		const { showResults, today, nextWeek, yesterday } = this.state;
		return (
			<div className="container">
				<Row>
					<Col md={4} xs={12}>
						<Card className="text-center mx-auto card-img">
							<Card.Body>
								{/* <Image src={details.image} className="img-fluid" /> */}
								<div>
									<ImageResize
										className="img-fluid"
										width="240"
										url={details.image}
										alt="poster"
									/>
								</div>
							</Card.Body>
						</Card>
					</Col>
					<Col xs={12} md={8}>
						<p className="text-display-sm-bold m-0">{details.name}</p>
						{details.genres &&
							details.genres?.map((item) => (
								<Fragment className="tag" key={item.id}>
									<span>{item.name} </span>
								</Fragment>
							))}
						<Row xs={4} className="pt-4">
							<Col xs={6} lg={4}>
								<div className="flex-column justify-content-center d-flex">
									<p className="text-xs text-muted m-0">Release date</p>
									<p className="text-sm pt-1">
										<Moment format="DD MMMM YYYY">{details.release}</Moment>
									</p>
								</div>
							</Col>
							<Col xs={6} lg={4}>
								<div className="flex-column justify-content-center d-flex">
									<p className="text-xs text-muted m-0">Duration</p>
									<p className="text-sm pt-1">{details.duration + ' mins'}</p>
								</div>
							</Col>
						</Row>
						<hr />
						<p className="text-link-lg-20">Overview</p>
						<p className="text-sm">{details.description}</p>
					</Col>
					<Col xs={4} md={12}>
						{details.trailer && isNaN(details.trailer) ? (
							<DetailMyTrailer url={details?.trailer} />
						) : null}
					</Col>
				</Row>
				<div className="text-center py-4">
					<p className="text-display-xs-bold">Showtimes and Tickets</p>
					<hr />
					<Row className="justify-content-center">
						<Datepicker
							startValue={today}
							startDate={yesterday}
							endDate={nextWeek}
							onChange={(e) => this.searchShowtime(e)}
							locale={enUS}
						/>
					</Row>
					{showResults && showResults.length > 0 ? (
						<Row xs={1} md={2} lg={3} className="g-3">
							{showResults.map((item) => (
								<Col key={item.id} className="pt-4 col">
									<Card className="card-movie border-0">
										<Card.Body className="pb-0">
											<Row>
												<Col
													xs={4}
													className="d-flex align-items-center justify-content-center"
												>
													<Image src={calendar} width={100} alt="" />
												</Col>
												<Col xs={8}>
													<p className="text-link-md text-left m-0">
														{item.showDate}
													</p>
													<p className="text-400-12 text-left m-0">
														<Clock size={20} className="pr-1" />
														{item.timeStart} : {item.timeEnd}
													</p>
												</Col>
											</Row>
										</Card.Body>
										<hr />
										<Card.Body className="pt-0 pb-0">
											<h6 className="float-left text-sm">Theater</h6>
											<p className="float-right text-link-sm">
												{item.theater.name}
											</p>
										</Card.Body>
										<Card.Body className="pt-0 pb-0">
											<h6 className="float-left text-sm">Price</h6>
											<p className="float-right text-link-sm">
												${item.price}/ticket
											</p>
										</Card.Body>
										<Card.Body className="pt-0 d-flex justify-content-end">
											<Link to={path.order}>
												<Button
													variant="primary"
													className="btn-nav shadow"
													onClick={() => this.handleSelectShowtime(item)}
												>
													Book now
												</Button>
											</Link>
										</Card.Body>
									</Card>
								</Col>
							))}
						</Row>
					) : (
						<p className="text-md pt-2">There are no showtimes available</p>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	details: state.movie.details,
	showtimes: state.showtime.showtimes,
});

const mapDispatchToProps = {
	getMovieDetail,
	onSelectShowtime,
	createOrder,
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(MovieDetailComponent)
);
