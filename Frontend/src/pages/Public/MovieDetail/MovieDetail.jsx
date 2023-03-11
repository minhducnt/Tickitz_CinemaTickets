import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { login } from '../../../service/actions/auth';
import { connect } from 'react-redux';
import { MovieDetailComponent } from '../../../components/public';
import './styles.css';

class MovieDetail extends Component {
	render() {
		return (
			<section>
				<Container>
					<MovieDetailComponent />
					<div className="d-flex py-2">
						<hr className="my-auto flex-grow-1" />
						<div className="px-3 text-primary">
							<Link to="/">View more</Link>
						</div>
						<hr className="my-auto flex-grow-1" />
					</div>
				</Container>
			</section>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
});
const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
