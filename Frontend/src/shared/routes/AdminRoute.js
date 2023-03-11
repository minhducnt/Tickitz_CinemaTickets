import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { autoLogin } from '../../service/actions/auth';
import { path } from '../constants/path';

const AdminRoute = (props) => {
	const {
		layout: Layout,
		component: Component,
		token,
		user,
		auth,
		...rest
	} = props;
	const expired = auth.expired;
	const now = new Date().getTime();
	return (
		<Route
			{...rest}
			render={(props) =>
				token !== null ? (
					now >= expired ? (
						<Redirect
							to={{ pathname: path.home, state: { from: props.location } }}
						/>
					) : user.roles.some((role) => role.name === 'ROLE_ADMIN') ? (
						<Layout {...props}>
							<Component {...props} />
						</Layout>
					) : (
						<Redirect
							to={{ pathname: path.home, state: { from: props.location } }}
						/>
					)
				) : (
					<Redirect
						to={{ pathname: path.signIn, state: { from: props.location } }}
					/>
				)
			}
		/>
	);
};
AdminRoute.propTypes = {
	component: PropTypes.any.isRequired,
	layout: PropTypes.any.isRequired,
};
AdminRoute.defaultProps = {
	token: '',
	user: '',
	auth: '',
};
const mapStateToProps = (state) => ({
	token: state.auth.token,
	auth: state.auth,
	user: JSON.parse(localStorage.getItem('currentUser')),
});
const mapDispatchToProps = { autoLogin };
export default connect(mapStateToProps, mapDispatchToProps)(AdminRoute);
