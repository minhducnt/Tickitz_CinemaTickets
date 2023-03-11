import React, { Component } from 'react';
import { TicketComponent } from '../../../components/public';
import './styles.css';

export default class TicketResult extends Component {
	render() {
		return (
			<div>
				<div className="bg-primary">
					<TicketComponent />
				</div>
			</div>
		);
	}
}
