import React, { Component } from 'react';
import {
	Container,
	Row,
	Image,
	Button,
	ListGroup,
	Spinner,
	Col,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import {
	emailVerifyRegister,
	register,
} from '../../../../service/actions/auth';
import { LeftRegister, RightRegister } from '../../../../components/common';
import tickitz_white from '../../../../assets/images/tickitz-white.svg';
import Countdown from 'react-countdown';
import ReactCodeInput from 'react-code-input';
import { path } from '../../../../shared/constants/path';
import { toast } from 'react-toastify';
import '../styles.css';

class EmailVerificationRegister extends Component {
	state = {
		message: '',
		verifyCode: '',
		isLoading: false,
	};
	componentWillUnmount() {
		this.setState = (state, callback) => {
			return;
		};
	}
	componentDidUpdate() {
		if (this.props.auth.message === 'Success') {
			this.props.history.push(path.signIn);
		}
	}
	handleCodeChange = (pinCode) => {
		this.setState({
			verifyCode: pinCode,
		});
	};
	submitData = async () => {
		this.setState({ isLoading: true });
		await this.props.emailVerifyRegister(
			this.state.verifyCode,
			this.props.auth.user.firstName,
			this.props.auth.user.lastName,
			this.props.auth.user.phoneNumber,
			this.props.auth.user.email,
			sessionStorage.getItem('password'),
			this.props.auth.user.gender
		);
		this.setState({ show: true, isLoading: false });
		this.props.auth.message !== ''
			? toast.success(this.props.auth.message)
			: toast.error(this.props.auth.errorMsg);
	};
	resendCode = async () => {
		this.setState({ isLoading: true });
		await this.props.register(
			this.props.auth.user.firstName,
			this.props.auth.user.lastName,
			this.props.auth.user.phoneNumber,
			this.props.auth.user.email,
			sessionStorage.getItem('password'),
			this.props.auth.user.gender
		);
		sessionStorage.setItem('show', this.props.message);
		this.setState({ show: true, isLoading: false });
		this.props.auth.message !== ''
			? toast.success(this.props.auth.message)
			: toast.error(this.props.auth.errorMsg);
	};
	renderer = ({ minutes, seconds, completed }) => {
		if (completed) {
			return (
				<Button
					onClick={() => this.resendCode()}
					variant="outline-primary"
					type="submit"
					block
					className="float-right col-12 col-md-5"
				>
					Resend code
				</Button>
			);
		} else {
			return (
				<Button
					variant="primary"
					type="loading"
					block
					disabled
					className="float-right col-12 col-md-5"
				>
					<Spinner
						as="span"
						animation="border"
						size="sm"
						role="status"
						aria-hidden="true"
					/>
					<span className="visually-hidden">
						{' '}
						{minutes}:{seconds}
					</span>
				</Button>
			);
		}
	};

	render() {
		const { verifyCode } = this.state;
		return (
			<Container fluid>
				<Row>
					{/* Left Side */}
					<LeftRegister>
						<Container>
							<Image src={tickitz_white} width={250} />
							<p className="text-display-md-bold m-0 text-white pt-5">
								Lets verify your new account
							</p>
							<p className="text-lg text-white pb-3 opacity-70 ">
								To be able to use your account, please complete the following
								steps
							</p>
							<ListGroup>
								<li>
									<Button
										variant="outline-light"
										className="btn-sm rounded-circle"
									>
										1<div className="vertical-line"></div>
									</Button>
									<label className="form-check-label text-label-non-active text-white pb-3">
										<p className="pl-3 text-color-placeholder">
											Fill your additional details
										</p>
									</label>
								</li>
								<li>
									<Button
										variant="outline-light"
										className="btn-sm rounded-circle"
										active
									>
										2<div className="vertical-line"></div>
									</Button>
									<label className="form-check-label text-white pb-3">
										<p className="pl-3 ">Activate your account</p>
									</label>
								</li>
								<li>
									<Button
										variant="outline-light"
										className="btn-sm rounded-circle"
									>
										3
									</Button>
									<label className="form-check-label text-label-non-active text-white pb-3">
										<p className="pl-3 text-color-placeholder">Done</p>
									</label>
								</li>
							</ListGroup>
						</Container>
					</LeftRegister>
					{/* Right side */}
					<RightRegister>
						<Container>
							<Row className="justify-content-md-center">
								<p className="text-link-lg-48 m-0 pt-4">Verification</p>
								<p className="text-link-lg-26 pt-1 pb-2 m-0">
									Fill your complete code verification
								</p>
							</Row>
						</Container>
						<Row className="justify-content-md-center">
							<ReactCodeInput
								type="text"
								onChange={(e) => this.handleCodeChange(e)}
								value={verifyCode}
								fields={8}
							/>
						</Row>
						<Row>
							<Col>
								{this.state.isLoading === false ? (
									<Container className="pt-3" fluid>
										<Row className="justify-content-md-center">
											<Button
												onClick={(e) => this.submitData(e)}
												variant="outline-primary"
												type="submit"
												block
												className="float-left col-12 col-md-5"
											>
												Activate now
											</Button>
											<Col lg="auto"></Col>
											<Countdown
												date={Date.now() + 60000}
												intervalDelay={0}
												precision={3}
												renderer={this.renderer}
											/>
										</Row>
									</Container>
								) : (
									<Container className="pt-3" fluid>
										<Button variant="primary" type="loading" block disabled>
											<Spinner
												as="span"
												animation="border"
												size="sm"
												role="status"
												aria-hidden="true"
											/>
											<span className="visually-hidden"> Loading...</span>
										</Button>
									</Container>
								)}
							</Col>
						</Row>
					</RightRegister>
				</Row>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
});
const mapDispatchToProps = { emailVerifyRegister, register };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EmailVerificationRegister);
