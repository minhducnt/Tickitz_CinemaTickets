import React, { Component } from 'react';
import {
	Container,
	Row,
	Image,
	Button,
	ListGroup,
	Form,
	Spinner,
	Col,
	InputGroup,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LeftRegister, RightRegister } from '../../../components/common';
import tickitz_white from '../../../assets/images/tickitz-white.svg';
import './styles.css';
import { connect } from 'react-redux';
import { register } from '../../../service/actions/auth';
import { Formik } from 'formik';
import { path } from '../../../shared/constants/path';
import { schemaYupSignUp } from '../../../shared/constants/yupSchema';
import { toast } from 'react-toastify';

class SignUp extends Component {
	state = {
		message: '',
		isLoading: false,
	};
	submitData = async (values) => {
		this.setState({ isLoading: true });
		await this.props.register(
			values.firstName,
			values.lastName,
			values.phoneNumber,
			values.email,
			values.password,
			values.gender
		);
		this.setState({ show: true, isLoading: false });
		this.props.auth.message !== ''
			? toast.success(this.props.auth.message)
			: toast.error(this.props.auth.errorMsg);
	};
	componentDidMount() {
		localStorage.clear();
		sessionStorage.clear();
	}
	componentWillUnmount() {
		this.setState = (state, callback) => {
			return;
		};
	}
	componentDidUpdate() {
		if (
			this.state.show === true &&
			this.props.auth.message ===
				'Please go to your email and get verification code to finish sign up a new account'
		) {
			this.props.history.push(path.emailVerifyRegister);
		}
	}
	render() {
		return (
			<Row className="container-fluid">
				<LeftRegister>
					<Container>
						<Image src={tickitz_white} width={250} />
						<p className="text-display-md-bold m-0 text-white pt-5">
							Lets build your account
						</p>
						<p className="text-lg text-white pb-3 opacity-70 ">
							To be a loyal moviegoer and access all of features, your details
							are required.
						</p>
						<ListGroup>
							<li>
								<Button
									variant="outline-light"
									className="btn-sm rounded-circle"
									active
								>
									1<div className="vertical-line"></div>
								</Button>
								<label className="form-check-label text-white pb-3">
									<p className="pl-3">Fill your additional details</p>
								</label>
							</li>
							<li>
								<Button
									variant="outline-light"
									className="btn-sm rounded-circle"
								>
									2<div className="vertical-line"></div>
								</Button>
								<label className="form-check-label text-label-non-active text-white pb-3">
									<p className="pl-3 text-color-placeholder">
										Activate your account
									</p>
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
				<RightRegister>
					<p className="text-link-lg-48 m-0 pt-5 pb-3">Sign Up</p>
					<Formik
						initialValues={{
							firstName: '',
							lastName: '',
							phoneNumber: '',
							email: '',
							password: '',
							confirmPassword: '',
							gender: '',
						}}
						validationSchema={schemaYupSignUp}
						onSubmit={(values) => {
							this.submitData(values);
						}}
					>
						{({
							values,
							errors,
							touched,
							handleChange,
							handleBlur,
							handleSubmit,
						}) => (
							<Form.Group>
								<Form.Group>
									<Row className="mb-3">
										<Col>
											<Form.Label>First Name</Form.Label>
											<Form.Control
												type="text"
												placeholder="Write your first name"
												name="firstName"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.firstName}
												isValid={touched.firstName && !errors.firstName}
											/>
											{errors.firstName && touched.firstName ? (
												<div style={{ color: 'red' }}>{errors.firstName}</div>
											) : null}
										</Col>
										<Col>
											<Form.Label>Last Name</Form.Label>
											<Form.Control
												type="text"
												placeholder="Write your last name"
												name="lastName"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.lastName}
												isValid={touched.lastName && !errors.lastName}
											/>
											{errors.lastName && touched.lastName ? (
												<div style={{ color: 'red' }}>{errors.lastName}</div>
											) : null}
										</Col>
									</Row>
									<Row>
										<Col>
											<Form.Label>Gender</Form.Label>
											<Form.Control
												as="select"
												type="gender"
												name="gender"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.gender}
												isValid={touched.gender && !errors.gender}
											>
												<option>--Gender--</option>
												<option>MALE</option>
												<option>FEMALE</option>
											</Form.Control>
											{errors.gender && touched.gender ? (
												<div style={{ color: 'red' }}>{errors.gender}</div>
											) : null}
										</Col>
										<Col>
											<Form.Label>Phone Number</Form.Label>
											<InputGroup className="mb-3">
												<InputGroup.Text className="contact">
													+84
												</InputGroup.Text>
												<Form.Control
													type="string"
													placeholder="Write your phone number"
													name="phoneNumber"
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.phoneNumber}
													isValid={touched.phoneNumber && !errors.phoneNumber}
												/>
												{errors.phoneNumber && touched.phoneNumber ? (
													<div style={{ color: 'red' }}>
														{errors.phoneNumber}
													</div>
												) : null}
											</InputGroup>
										</Col>
									</Row>
									<Form.Label>Email</Form.Label>
									<Form.Control
										name="email"
										type="email"
										placeholder="Write your email"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.email}
									/>
									{errors.email && touched.email ? (
										<p style={{ color: 'red' }}>{errors.email}</p>
									) : null}
								</Form.Group>
								<Form.Group controlId="formBasicPassword">
									<Form.Label>Password</Form.Label>
									<Form.Control
										name="password"
										type="password"
										placeholder="Write your password"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.password}
									/>
									{errors.password && touched.password ? (
										<p style={{ color: 'red' }}>{errors.password}</p>
									) : null}
								</Form.Group>
								<Form.Group controlId="formConfirmPassword">
									<Form.Label>Confirm Password</Form.Label>
									<Form.Control
										name="confirmPassword"
										type="password"
										placeholder="Confirm your password"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.confirmPassword}
									/>
									{errors.confirmPassword && touched.confirmPassword ? (
										<p style={{ color: 'red' }}>{errors.confirmPassword}</p>
									) : null}
								</Form.Group>
								{this.state.isLoading === false ? (
									<Button
										variant="primary"
										type="submit"
										block
										onClick={handleSubmit}
									>
										Join for free now
									</Button>
								) : (
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
								)}
								<p className="text-center pt-3">
									Do you already have an account?
									<Link style={{ textDecoration: 'none' }} to={path.signIn}>
										{' '}
										Log in
									</Link>
								</p>
							</Form.Group>
						)}
					</Formik>
				</RightRegister>
			</Row>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
});
const mapDispatchToProps = { register };

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
