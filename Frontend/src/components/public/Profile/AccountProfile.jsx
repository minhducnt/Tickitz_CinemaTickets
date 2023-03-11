import React, { Component } from 'react';
import { Card, Col } from 'react-bootstrap';
import DetailInfo from './DetailInfo';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './styles.css';
import PrivacyInfo from './PrivacyInfo';
import { path } from '../../../shared/constants/path';

export default class AccountProfile extends Component {
	render() {
		return (
			<Router>
				<Col xs={12} md={12}>
					<Card bg="light" variant="light">
						<Card.Body className="d-flex ">
							<Link
								style={{ textDecoration: 'none' }}
								to={path.profile}
								className="pr-4"
							>
								Account Settings
							</Link>
							<Link style={{ textDecoration: 'none' }} to={path.profilePrivacy}>
								Account and Privacy
							</Link>
						</Card.Body>
					</Card>
					<Switch>
						<Route exact path={path.profile}>
							<DetailInfo />
						</Route>
						<Route exact path={path.profilePrivacy}>
							<PrivacyInfo />
						</Route>
					</Switch>
				</Col>
			</Router>
		);
	}
}
