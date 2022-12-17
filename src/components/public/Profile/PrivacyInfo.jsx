import React, { Component } from 'react';
import { Card, Col, Form, Row, Spinner, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { changePassword } from '../../../service/actions/user';
import { schemaYupChangePassword } from '../../../shared/constants/yupSchema';
import { toast } from 'react-toastify';

class PrivacyInfo extends Component {
	state = {
		show: false,
		message: '',
		isLoading: false,
	};
	submitData = async (values) => {
		const user = JSON.parse(localStorage.getItem('currentUser'));
		this.setState({ show: true, isLoading: true });
		await this.props.changePassword(user.id, {
			oldPassword: values.oldPassword,
			newPassword: values.newPassword,
			confirmPassword: values.confirmPassword,
		});
		this.setState({ show: true, isLoading: false });
		this.props.user.message !== ''
			? toast.success(this.props.user.message)
			: toast.error(this.props.user.errorMsg);
	};
	render() {
		return (
			<div>
				<Formik
					initialValues={{
						oldPassword: '',
						newPassword: '',
						confirmPassword: '',
					}}
					validationSchema={schemaYupChangePassword}
					onSubmit={(values, actions) => {
						this.submitData(values).then(() => {
							actions.resetForm(
								values.oldPassword,
								values.newPassword,
								values.confirmPassword
							);
						});
					}}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						isSubmitting,
					}) => (
						<Form.Group>
							<div className="pt-4">
								<Card>
									<Card.Body>
										<p>Account and Privacy</p>
										<hr />
										<Form.Group>
											<Row>
												<Col>
													<Form.Label>Old Password</Form.Label>
													<Form.Control
														type="password"
														placeholder="Write your old password"
														name="oldPassword"
														onChange={handleChange}
														onBlur={handleBlur}
														value={values.oldPassword}
													/>
													{errors.oldPassword && touched.oldPassword ? (
														<p style={{ color: 'red' }}>{errors.oldPassword}</p>
													) : null}
												</Col>
												<Col>
													<Form.Label>New Password</Form.Label>
													<Form.Control
														type="password"
														placeholder="Write your new password"
														name="newPassword"
														onChange={handleChange}
														onBlur={handleBlur}
														value={values.newPassword}
													/>
													{errors.newPassword && touched.newPassword ? (
														<p style={{ color: 'red' }}>{errors.newPassword}</p>
													) : null}
												</Col>
												<Col>
													<Form.Label>Confirm Password</Form.Label>
													<Form.Control
														type="password"
														placeholder="Confirm your password"
														name="confirmPassword"
														onChange={handleChange}
														onBlur={handleBlur}
														value={values.confirmPassword}
													/>
													{errors.confirmPassword && touched.confirmPassword ? (
														<p style={{ color: 'red' }}>
															{errors.confirmPassword}
														</p>
													) : null}
												</Col>
											</Row>
										</Form.Group>
									</Card.Body>
								</Card>
								{this.state.isLoading === false ? (
									<Button
										className="mt-3"
										variant="outline-primary"
										type="submit"
										block
										onClick={handleSubmit}
										disabled={isSubmitting}
									>
										Change password
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
							</div>
						</Form.Group>
					)}
				</Formik>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.user,
});

const mapDispatchToProps = { changePassword };

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyInfo);
