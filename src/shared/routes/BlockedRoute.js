import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { path } from '../constants/path';

const BlockedRoute = (props) => {
	const { component: Component, isAllowed, ...rest } = props;
	console.log(isAllowed);
	return (
		<Route
			{...rest}
			render={(props) =>
				isAllowed ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{ pathname: path.home, state: { from: props.location } }}
					/>
				)
			}
		/>
	);
};
BlockedRoute.propTypes = {
	component: PropTypes.any.isRequired,
	isAllowed: PropTypes.any,
};
BlockedRoute.defaultProps = {
	isAllowed: false,
};
const mapStateToProps = (state) => ({
	isAllowed: state.auth.isAllowed,
});
export default connect(mapStateToProps)(BlockedRoute);
