import React, { Component, forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import Avatar from 'react-avatar';
import MaterialTable from '@material-table/core';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import axiosClient from '../../../../../shared/apis/axiosClient';

import {
	Checkbox,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from '@material-ui/core';
import {
	Portlet,
	PortletContent,
	ResponsiveDialog,
} from '../../../../../components/common';
import AddShowtime from '../AddShowtime/AddShowtime';
import styles from './styles';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
	Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
	Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
	Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
	DetailPanel: forwardRef((props, ref) => (
		<ChevronRight {...props} ref={ref} />
	)),
	Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
	Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
	Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => (
		<ChevronLeft {...props} ref={ref} />
	)),
	ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
	SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
	ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
	ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

class ShowtimesTable extends Component {
	static propTypes = {
		className: PropTypes.string,
		classes: PropTypes.object.isRequired,
		onSelect: PropTypes.func,
		onShowDetails: PropTypes.func,
		toggleDialog: PropTypes.func,
		showtimes: PropTypes.array.isRequired,
	};

	static defaultProps = {
		showtimes: [],
		onSelect: () => {},
		onShowDetails: () => {},
	};

	handleRowDelete = (oldData, resolve) => {
		try {
			const token = localStorage.getItem('token');
			axiosClient(token)
				.delete(`showtimes/${oldData.id}`)
				.then((res) => {
					if (res.data.success === true) {
						toast.success(res.data.message);
						resolve();
					}
				});
		} catch (error) {
			toast.error(['Delete failed! Server error']);
			resolve();
		}
	};

	handleRowUpdate = (rowData, toggleDialog, openDialog) => {
		const { onSelectShowtime, showtime } = this.props;
		try {
			onSelectShowtime(rowData);
			console.log(showtime.selectShowtime);
			toggleDialog();
			<ResponsiveDialog
				id="Add-showtime"
				open={openDialog}
				handleClose={() => toggleDialog()}
			>
				<AddShowtime selectedShowtime={showtime.selectedShowtime} />
			</ResponsiveDialog>;
		} catch (error) {
			toast.error(['Update failed! Server error']);
		}
	};

	render() {
		const {
			classes,
			className,
			toggleDialog,
			openDialog,
			showtimes,
			onSelectShowtime,
			selectShowtime,
			selectedShowtimes,
		} = this.props;
		const rootClassName = classNames(classes.root, className);
		const columns = [
			{ title: 'id', field: 'id', hidden: true },
			{
				title: 'Poster',
				render: (rowData) => (
					<Avatar
						maxInitials={1}
						size={50}
						round={true}
						src={rowData.movie.image}
					/>
				),
			},
			{
				title: 'Movie',
				render: (rowData) => (
					<Typography className={classes.nameText}>
						{rowData.movie.name}
					</Typography>
				),
			},
			{
				title: 'Theater',
				render: (rowData) => (
					<Typography className={classes.nameText}>
						{rowData.theater.name}
					</Typography>
				),
			},
			{
				title: 'Price',
				render: (rowData) => (
					<Typography className={classes.nameText}>{rowData.price}</Typography>
				),
			},
			{
				title: 'Time Start',
				render: (rowData) => (
					<Typography className={classes.nameText}>
						{rowData.timeStart}
					</Typography>
				),
			},
			{
				title: 'Duration',
				render: (rowData) => (
					<Typography className={classes.nameText}>
						{rowData.movie.duration}
					</Typography>
				),
			},
			{
				title: 'Show Date',
				render: (rowData) => (
					<Typography className={classes.nameText}>
						{rowData.showDate}
					</Typography>
				),
			},
		];
		return (
			<Portlet className={rootClassName}>
				<PortletContent noPadding>
					<MaterialTable
						title="Showtimes"
						columns={columns}
						data={showtimes ?? []}
						icons={tableIcons}
						options={{
							headerStyle: {
								height: '64px',
								backgroundColor: '#7d58ff',
								fontSize: '20px',
								whiteSpace: 'nowrap',
							},
						}}
						editable={{
							onRowDelete: (oldData) =>
								new Promise((resolve) => {
									this.handleRowDelete(oldData, resolve);
								}),
						}}
						actions={[
							{
								icon: Edit,
								tooltip: 'Edit Showtime',
								onClick: async (event, rowData) =>
									this.handleRowUpdate(rowData, toggleDialog, openDialog),
							},
						]}
					/>
				</PortletContent>
			</Portlet>
		);
	}
}

const mapStateToProps = (state) => ({
	showtime: state.showtime,
});

export default connect(mapStateToProps)(withStyles(styles)(ShowtimesTable));
