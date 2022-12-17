import React, { Component } from 'react';
import { Form, InputGroup, Row, Col } from 'react-bootstrap';
import './styles.css';

export default class PersonalInfo extends Component {
	render() {
		const user = JSON.parse(localStorage.getItem('currentUser'));
		return (
			<Form.Group>
				<Form.Group>
					<Row>
						<Col>
							<Form.Label>First Name</Form.Label>
							<Form.Control
								readOnly
								type="text"
								name="firstName"
								value={user.firstName}
							/>
						</Col>
						<Col>
							<Form.Label>Last Name</Form.Label>
							<Form.Control
								readOnly
								type="text"
								name="lastName"
								value={user.lastName}
							/>
						</Col>
					</Row>
				</Form.Group>
				<Form.Group>
					<Form.Label>Email</Form.Label>
					<Form.Control readOnly type="email" name="email" value={user.email} />
				</Form.Group>
				<Form.Group>
					<Form.Label>Phone Number</Form.Label>
					<InputGroup className="mb-3">
						<InputGroup.Prepend className="contact">
							<InputGroup.Text>+84</InputGroup.Text>
						</InputGroup.Prepend>
						<Form.Control
							readOnly
							type="number"
							name="phoneNumber"
							value={user.phoneNumber}
						/>
					</InputGroup>
				</Form.Group>
			</Form.Group>
		);
	}
}
