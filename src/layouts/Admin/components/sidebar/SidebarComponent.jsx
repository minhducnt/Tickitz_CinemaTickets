import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
	withStyles,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@material-ui/core';

import InputIcon from '@material-ui/icons/Input';
import MovieIcon from '@material-ui/icons/Movie';
import TheatersIcon from '@material-ui/icons/Theaters';
import MovieFilterOutlinedIcon from '@material-ui/icons/MovieFilterOutlined';
import TheatersOutlinedIcon from '@material-ui/icons/TheatersOutlined';

import { logout } from '../../../../service/actions/auth';
import { path } from '../../../../shared/constants/path';
import styles from './styles';

class Sidebar extends Component {
	handleSignOut = async () => {
		this.props.logout().then(() => {
			this.props.history.push(path.login);
		});
	};
	render() {
		const { classes } = this.props;
		return (
			<section className={classes.root}>
				<List component="div" disablePadding>
					<ListItem
						activeClassName={classes.activeListItem}
						className={classes.listItem}
						component={NavLink}
						style={{ textDecoration: 'none' }}
						to={path.movieManage}
					>
						<ListItemIcon className={classes.listItemIcon}>
							<MovieIcon />
						</ListItemIcon>
						<ListItemText
							classes={{ primary: classes.listItemText }}
							primary="Movies"
						/>
					</ListItem>
					<ListItem
						activeClassName={classes.activeListItem}
						className={classes.listItem}
						component={NavLink}
						style={{ textDecoration: 'none' }}
						to={path.showtimeManage}
					>
						<ListItemIcon className={classes.listItemIcon}>
							<TheatersOutlinedIcon />
						</ListItemIcon>
						<ListItemText
							classes={{ primary: classes.listItemText }}
							primary="Showtimes"
						/>
					</ListItem>
					<ListItem
						activeClassName={classes.activeListItem}
						className={classes.listItem}
						component={NavLink}
						style={{ textDecoration: 'none' }}
						to={path.cinemaManage}
					>
						<ListItemIcon className={classes.listItemIcon}>
							<TheatersIcon />
						</ListItemIcon>
						<ListItemText
							classes={{ primary: classes.listItemText }}
							primary="Cinemas"
						/>
					</ListItem>
					<ListItem
						activeClassName={classes.activeListItem}
						className={classes.listItem}
						component={NavLink}
						style={{ textDecoration: 'none' }}
						to={path.genreManage}
					>
						<ListItemIcon className={classes.listItemIcon}>
							<MovieFilterOutlinedIcon />
						</ListItemIcon>
						<ListItemText
							classes={{ primary: classes.listItemText }}
							primary="Genres"
						/>
					</ListItem>
				</List>
				<Divider className={classes.listDivider} />
				<List component="div" disablePadding>
					<ListItem
						className={classes.listItem}
						component="a"
						style={{ textDecoration: 'none' }}
						onClick={this.handleSignOut}
						target="_blank"
					>
						<ListItemIcon className={classes.listItemIcon}>
							<InputIcon />
						</ListItemIcon>
						<ListItemText
							classes={{ primary: classes.listItemText }}
							primary="Log out"
						/>
					</ListItem>
				</List>
			</section>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.user,
});

const mapDispatchToProps = { logout };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(Sidebar));
