import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { ListSearchMovies } from '../../../components/public';

export default class MoviePage extends Component {
	render() {
		return (
			<div>
				<div>
					<Container>
						<ListSearchMovies />
					</Container>
				</div>
			</div>
		);
	}
}
