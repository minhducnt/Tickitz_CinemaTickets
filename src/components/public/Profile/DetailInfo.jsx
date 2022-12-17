import React, { Component } from 'react';
import { Card, Col, InputGroup, Form, Row } from 'react-bootstrap';
import { Formik } from 'formik';

export default class DetailInfo extends Component {
	render() {
		const user = JSON.parse(localStorage.getItem('currentUser'));
		return (
			<div className="pt-4">
				<Formik
					initialValues={{
						firstName: user.firstName,
						lastName: user.lastName,
						phoneNumber: user.phoneNumber,
						email: user.email,
						password: user.password,
						gender: user.gender,
					}}
				>
					{({ values }) => (
						<Form.Group>
							<Card>
								<Card.Body>
									<p>Details Information</p>
									<hr />
									<Form.Group>
										<Row className="mb-3">
											<Col>
												<Form.Label>First Name</Form.Label>
												<Form.Control
													readOnly
													type="text"
													name="firstName"
													value={values.firstName}
												/>
											</Col>
											<Col>
												<Form.Label>Last Name</Form.Label>
												<Form.Control
													readOnly
													type="text"
													name="lastName"
													value={values.lastName}
												/>
											</Col>
										</Row>
										<Row className="mb-3">
											<Col>
												<Form.Label>E-mail</Form.Label>
												<Form.Control
													readOnly
													type="email"
													name="email"
													value={values.email}
												/>
											</Col>
										</Row>
										<Row>
											<Col>
												<Form.Label>Gender</Form.Label>
												<Form.Control
													readOnly
													type="text"
													name="gender"
													value={values.gender}
												></Form.Control>
											</Col>
											<Col>
												<Form.Label>Phone Number</Form.Label>
												<InputGroup className="mb-3">
													<InputGroup.Prepend className="contact">
														<InputGroup.Text>+84</InputGroup.Text>
													</InputGroup.Prepend>
													<Form.Control
														readOnly
														type="number"
														name="phoneNumber"
														value={values.phoneNumber}
													/>
												</InputGroup>
											</Col>
										</Row>
									</Form.Group>
								</Card.Body>
							</Card>
						</Form.Group>
					)}
				</Formik>
			</div>
		);
	}
}
