import React, { Component } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { ListMovies } from '../../../components/public';
import { login } from '../../../service/actions/auth';
import { connect } from 'react-redux';
import { MovieBanner, ButtonLeft } from '../../../components/common';
import { scrollBanner } from '../../../shared/utils/utils';
import './styles.css';

class HomePage extends Component {
	componentDidMount() {
		sessionStorage.clear();
	}
	render() {
		return (
			<div className="home">
				<div className="container">
					<section>
						<Row>
							<Col
								md={6}
								sm={13}
								className="flex-column justify-content-center d-flex"
							>
								<p className="text-color-placeholder text-display-xs m-0">
									Nearest Cinema, Newest Movie,
								</p>
								<p className="text-display-lg-bold-56 text-primary m-0">
									Never Wait !
								</p>
								<ButtonLeft
									gobuttonleft="#"
									buttontext="Find out now !"
									className="pt-2"
									onClick={() => scrollBanner()}
								/>
							</Col>
							<Col md={6} sm={12}>
								<Row md={3} lg={4}>
									<Col style={{ paddingTop: 120 }}>
										<div className="img-gradient">
											<Image
												src="https://source.unsplash.com/featured/?popcorn"
												className="img-fluid"
											/>
										</div>
									</Col>
									<Col style={{ paddingTop: 80 }}>
										<div className="img-gradient">
											<Image
												src="https://source.unsplash.com/featured/?movies"
												className="img-fluid"
											/>
										</div>
									</Col>
									<Col style={{ paddingTop: 40 }}>
										<div className="img-gradient">
											<Image
												src="https://source.unsplash.com/featured/?cinema"
												className="img-fluid"
											/>
										</div>
									</Col>
									<Col>
										<div className="img-gradient">
											<Image
												src="https://source.unsplash.com/featured/?theater"
												className="img-fluid"
											/>
										</div>
									</Col>
								</Row>
							</Col>
						</Row>
					</section>
					{/* <section>
						<MovieBanner />
					</section> */}
					<ListMovies />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
});
const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
