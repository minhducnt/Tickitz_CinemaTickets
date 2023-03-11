import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PayInfo, PersonalInfo } from '../../../components/public';
import { Button, Spinner } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { PanelLeft, PanelRight } from '../../../components/common';
import { path } from '../../../shared/constants/path';
import { toast } from 'react-toastify';
import {
	requestPayment,
	createPayment,
} from '../../../service/actions/payment';
import { createOrder, updateOrder } from '../../../service/actions/order';

class PaymentPage extends Component {
	constructor(props) {
		super(props);
		this.popOut = this.popOut.bind(this);
		this.popOutClosed = this.popOutClosed.bind(this);
		this.state = {
			isPoppedOut: false,
			isLoading: false,
			selectShowtime: JSON.parse(sessionStorage.getItem('selectShowtime')),
		};
	}

	componentDidMount() {
		const { payment, requestPayment } = this.props;
		if (!payment.length) {
			requestPayment();
		}
	}

	openLink = (url) => window.location.assign(url)?.focus();

	popOut() {
		this.setState({ isPoppedOut: true });
	}

	popOutClosed() {
		this.setState({ isPoppedOut: false });
	}

	handlePayment = async () => {
		const { createPayment } = this.props;
		this.setState({ isLoading: true });
		console.log(this.props);
		await this.props.createOrder(sessionStorage.getItem('ticket')).then(() => {
			createPayment(
				this.props.payment.accessToken,
				this.props.order.details.total
			)
				.then(() => {
					console.log(this.props.payment.payment[1].href);
					this.openLink(this.props.payment.payment[1].href);
				})
				.then(() => {
					toast.success(this.props.order.message);
					this.props.updateOrder(this.props.order.details.id);
				});
		});
		this.setState({ isLoading: false });
	};

	render() {
		return (
			<div>
				<PanelLeft
					title="Payment Info"
					body={<PayInfo />}
					panel={
						<div className="pt-4 checkout">
							<Link to={path.order}>
								<Button
									variant="outline-primary"
									className="float-left col-12 col-md-5"
								>
									Previous page
								</Button>
							</Link>
							{this.state.isLoading === false ? (
								<Button
									variant="outline-primary"
									block
									className="float-right col-12 col-md-5"
									onClick={this.handlePayment}
								>
									Pay your order
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
					}
				>
					<PanelRight title="Personal Info" body={<PersonalInfo />} />
				</PanelLeft>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	payment: state.payment,
	order: state.order,
	ticket: JSON.parse(sessionStorage.getItem('ticket')),
});

const mapDispatchToProps = {
	requestPayment,
	createPayment,
	createOrder,
	updateOrder,
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(PaymentPage)
);
