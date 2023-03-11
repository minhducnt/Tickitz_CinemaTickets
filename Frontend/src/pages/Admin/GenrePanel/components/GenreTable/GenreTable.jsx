import React, { Component, forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Avatar from 'react-avatar';
import { withStyles } from '@material-ui/core';
import MaterialTable from '@material-table/core';
import { Portlet, PortletContent } from '../../../../../components/common';
import { Typography } from '@material-ui/core';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Search from '@material-ui/icons/Search';
import styles from './styles';

const tableIcons = {
	Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => (
		<ChevronLeft {...props} ref={ref} />
	)),
	ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
	SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
};

class GenreTable extends Component {
	static propTypes = {
		className: PropTypes.string,
		classes: PropTypes.object.isRequired,
		genres: PropTypes.array.isRequired,
	};

	static defaultProps = {
		genres: [],
	};

	render() {
		const { classes, className, genres } = this.props;
		const rootClassName = classNames(classes.root, className);
		const columns = [
			{
				title: 'Avatar',
				readonly: true,

				render: (rowData) => (
					<Avatar
						maxInitials={1}
						size={50}
						round={true}
						src={`https://source.unsplash.com/featured/?${rowData.name}`}
					/>
				),
			},
			{
				title: 'Genre',
				field: 'name',
				readonly: true,

				render: (rowData) => (
					<Typography className={classes.nameText} variant="body1">
						{rowData.name}
					</Typography>
				),
			},
		];
		return (
			<Portlet className={rootClassName}>
				<PortletContent noPadding>
					<MaterialTable
						title="Genres"
						columns={columns}
						data={genres}
						icons={tableIcons}
						options={{
							headerStyle: {
								height: '64px',
								backgroundColor: '#7d58ff',
								fontSize: '20px',
								whiteSpace: 'nowrap',
							},
							maxColumnSort: 2,
							droppable: false,
						}}
					/>
				</PortletContent>
			</Portlet>
		);
	}
}

export default withStyles(styles)(GenreTable);
