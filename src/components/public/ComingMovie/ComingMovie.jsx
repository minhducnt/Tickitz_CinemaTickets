import React, { Component } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import listComingMovie from '../../../shared/constants/data/listComingMovie';
import { getMovieByComing } from '../../../service/actions/movie';
import { ImageResize } from '../../../components/common';
import { MovieTitleCard } from '../../../components/common';
import { path } from '../../../shared/constants/path';
import './styles.css';

class ComingComponent extends Component {
	async componentDidMount() {
		await this.props.getMovieByComing();
	}
	render() {
		const { movie } = this.props;
		return (
			<div>
				<Row>
					<Col>
						<p className="text-display-xs-bold  float-left">Upcoming Movies</p>
					</Col>
					<Col>
						<Link to={path.movies}>
							<p className="text-primary float-right">Explore All</p>
						</Link>
					</Col>
				</Row>
				<div className="scrollmenu text-center">
					{movie.comingSoon.length > 0
						? movie.comingSoon.map((coming) => {
								return (
									<Card key={coming.id} className="scroll card mr-4">
										<Card.Body className="card-body">
											<Link
												to={`/movie-detail/${coming.id}`}
												className="link"
												style={{ textDecoration: 'none' }}
											>
												<ImageResize
													url={coming.image}
													width="200"
													className="img-fluid img-resize"
													alt="image"
												/>
											</Link>
											<MovieTitleCard>{coming.name}</MovieTitleCard>
										</Card.Body>
									</Card>
								);
						  })
						: listComingMovie.map((coming) => {
								return (
									<Card key={coming.id} className="scroll card mr-4">
										<Card.Body className="card-body">
											<Link
												to={`/movie-detail/${coming.id}`}
												className="link"
												style={{ textDecoration: 'none' }}
											>
												<ImageResize
													url={coming.image}
													width="200"
													className="img-fluid img-resize"
													alt="image"
												/>
											</Link>
											<MovieTitleCard>{coming.name}</MovieTitleCard>
										</Card.Body>
									</Card>
								);
						  })}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	movie: state.movie,
});

const mapDispatchToProps = {
	getMovieByComing,
};

export default connect(mapStateToProps, mapDispatchToProps)(ComingComponent);
