import React, { Component } from 'react';
import { Row, Col, Image, Button, Form, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { login, autoLogin } from '../../../service/actions/auth';
import { getUserDetail } from '../../../service/actions/user';
import { connect } from 'react-redux';
import { LeftRegister, RightRegister } from '../../../components/common';
import tickitz_white from '../../../assets/images/tickitz-white.svg';
import './styles.css';
import { Formik } from 'formik';
import { path } from '../../../shared/constants/path';
import { schemaYupSignIn } from '../../../shared/constants/yupSchema';
import { toast } from 'react-toastify';

class SignIn extends Component {
	state = {
		message: '',
		isLoading: false,
	};
	submitData = async (values) => {
		this.setState({ isLoading: true });
		await this.props.login(values.email, values.password);
		this.setState({ isLoading: false });
		this.props.auth.message !== ''
			? toast.success(this.props.auth.message)
			: toast.error(this.props.auth.errorMsg);
	};
	componentWillUnmount() {
		this.setState = (state, callback) => {
			return;
		};
	}
	componentDidMount() {
		const token = localStorage.getItem('token');
		if (token) {
			this.props.autoLogin(token);
		}
	}
	componentDidUpdate() {
		if (this.props.auth.token) {
			this.props.getUserDetail(this.props.auth.token);
			this.props.history.push('/');
		}
	}
	changeText = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	render() {
		return (
			<Row className="container-fluid">
				<LeftRegister>
					<div className="infinity-form-container infinity-form">
						<Image src={tickitz_white} height={150} />
						<p className="text-display-sm m-0 text-white opacity-70">
							Wait, Watch, Wow!
						</p>
					</div>
				</LeftRegister>
				<RightRegister>
					<p className="text-link-lg-48 m-0 pt-3">Sign In</p>
					<Formik
						initialValues={{
							email: '',
							password: '',
						}}
						validationSchema={schemaYupSignIn}
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
								<Row className="justify-content-md-between">
									<Col lg="auto">
										<p className="pt-0 pl-lg-0">
											<Link
												style={{ textDecoration: 'none' }}
												to={path.forgetPassword}
											>
												Forgot password ?
											</Link>
										</p>
									</Col>
								</Row>
								{this.state.isLoading === false ? (
									<Button
										variant="primary"
										type="submit"
										block
										onClick={handleSubmit}
									>
										Sign In
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
									Don't have an account?
									<Link style={{ textDecoration: 'none' }} to={path.signUp}>
										{' '}
										Sign up
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
	user: state.user,
});
const mapDispatchToProps = {
	login,
	autoLogin,
	getUserDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
