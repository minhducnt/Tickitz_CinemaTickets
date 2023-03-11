import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import { AccountProfile } from '../../../components/public';

export default class ProfilePage extends Component {
	render() {
		return (
			<div>
				<div className="bg-gray">
					<Container>
						<Row>
							<AccountProfile />
						</Row>
					</Container>
				</div>
			</div>
		);
	}
}
