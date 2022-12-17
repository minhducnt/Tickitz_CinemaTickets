import { path } from '../../../../shared/constants/path';
import React, { Component } from 'react';
import { Navbar, Nav, Image, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../../service/actions/auth';
import tickitz_purple from '../../../../assets/images/tickitz-purple.svg';
import Avatar, { ConfigProvider } from 'react-avatar';
import { toast } from 'react-toastify';
import './styles.css';

class NavbarComponent extends Component {
	state = {
		expired: this.props.auth.expired,
		now: new Date().getTime(),
	};
	componentDidMount() {
		if (this.props.auth.token !== null) {
			if (this.state.now >= this.state.expired) {
				this.handleLogout();
			}
		}
	}
	handleLogout = async () => {
		await this.props.logout();
		toast.success('Successfully Logout');
	};
	render() {
		const { user } = this.props;
		return (
			<Navbar expand="lg">
				<Container>
					<Navbar.Brand href="#home" as={Link} to="/" className="m-0 mr-5">
						<Image src={tickitz_purple} />
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="navbar-list me-auto">
							<Nav.Link className="nav-link" href={path.movies}>
								Movies
							</Nav.Link>
							<Nav.Link className="nav-link" href={path.ticket}>
								Tickets
							</Nav.Link>
							{user?.roles?.map((item) => {
								if (item.name === 'ROLE_ADMIN') {
									return (
										<Nav.Link
											className="nav-link ml-2"
											key={item.id}
											href={path.movieManage}
										>
											Dashboard
										</Nav.Link>
									);
								} else return null;
							})}
						</Nav>
						<Nav className="nav-link justify-content-end" activeKey="/home">
							{this.props.auth.token !== null ? (
								<NavDropdown
									title={
										<ConfigProvider colors={['red', 'green', 'blue']}>
											<Avatar
												name={user?.lastName}
												alt={
													'https://icon-library.com/images/default-user-icon/default-user-icon-4.jpg'
												}
												size="35px"
												className="img-avatar"
											/>
										</ConfigProvider>
									}
									id="responsive-nav-dropdown"
									className="m-0"
								>
									<NavDropdown.Item href={path.home}>Home</NavDropdown.Item>
									<NavDropdown.Item href={path.profile}>
										Your Profile
									</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item
										href={path.home}
										onClick={this.handleLogout}
									>
										Sign out
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<Nav.Item className="pt-1">
									<Link
										to={path.signIn}
										className="btn btn-primary btn-nav mx-0"
									>
										Sign in
									</Link>
								</Nav.Item>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	user: JSON.parse(localStorage.getItem('currentUser')),
});

const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);
