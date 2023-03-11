import React, { useState, useEffect, useCallback } from 'react';
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar';
import { toast } from 'react-toastify';
import axiosClient from '../../../../../shared/apis/axiosClient';

import {
	makeStyles,
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
	ActionDelete,
	ActionUpdate,
} from '../../../../../components/common';
import styles from './styles';

import MaterialTable from '@material-table/core';
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
import Alert from '@material-ui/lab/Alert';

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

const useStyles = makeStyles(styles);

function ShowtimesTable({ showtimes }) {
	const classes = useStyles();
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [iserror, setIserror] = useState(false);
	const [errorMessages, setErrorMessages] = useState([]);

	var columns = [
		{ title: 'id', field: 'id', hidden: true },
		{
			title: 'Poster',
			render: useCallback(
				(rowData) => (
					<Avatar
						maxInitials={1}
						size={50}
						round={true}
						src={rowData.movie.image}
					/>
				),
				[]
			),
		},
		{
			title: 'Movie',
			render: useCallback(
				(rowData) => (
					<Typography key={rowData.id}>{rowData.movie.name}</Typography>
				),
				[]
			),
		},
		{
			title: 'Theater',
			render: useCallback(
				(rowData) => (
					<Typography key={rowData.id}>{rowData.theater.name}</Typography>
				),
				[]
			),
		},
		{
			title: 'Price',
			render: useCallback(
				(rowData) => <Typography key={rowData.id}>{rowData.price}</Typography>,
				[]
			),
		},
		{
			title: 'Time Start',
			render: useCallback(
				(rowData) => (
					<Typography key={rowData.id}>{rowData.timeStart}</Typography>
				),
				[]
			),
		},
		{
			title: 'Duration',
			render: useCallback(
				(rowData) => (
					<Typography key={rowData.id}>{rowData.movie.duration}</Typography>
				),
				[]
			),
		},
		{
			title: 'Show Date',
			render: useCallback(
				(rowData) => (
					<Typography key={rowData.id}>{rowData.showDate}</Typography>
				),
				[]
			),
		},
	];

	const fetchShowtimes = async () => {
		setLoading(true);
		try {
			axiosClient()
				.get(`showtimes`)
				.then((res) => {
					setData(res.data);
				});
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	const handleRowDelete = (oldData, resolve) => {
		try {
			const token = localStorage.getItem('token');
			axiosClient(token)
				.delete(`showtimes/${oldData.id}`)
				.then((res) => {
					if (res.data.success === true) {
						toast.success(res.data.message);
						const dataDelete = [...data];
						const index = oldData.tableData.id;
						dataDelete.splice(index, 1);
						setData([...dataDelete]);
						resolve();
					}
				});
		} catch (error) {
			toast.error(['Delete failed! Server error']);
			setIserror(true);
			resolve();
		}
	};

	useEffect(() => {
		fetchShowtimes();
	}, []);

	return (
		<Portlet className={classes.rootClassName}>
			<PortletContent noPadding>
				<div>
					{iserror && (
						<Alert severity="error">
							{errorMessages.map((msg, i) => {
								return <div key={i}>{msg}</div>;
							})}
						</Alert>
					)}
				</div>
				<MaterialTable
					title="Showtimes"
					columns={columns}
					data={showtimes}
					icons={tableIcons}
					editable={{
						onRowDelete: (oldData) =>
							new Promise((resolve) => {
								handleRowDelete(oldData, resolve);
							}),
					}}
					actions={[
						{
							icon: Edit,
							tooltip: 'Edit showtime',
						},
					]}
				/>
			</PortletContent>
		</Portlet>
	);
}

ShowtimesTable.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object,
	onSelect: PropTypes.func,
	onShowDetails: PropTypes.func,
	showtimes: PropTypes.array.isRequired,
};

ShowtimesTable.defaultProps = {
	showtimes: [],
	onSelect: () => {},
	onShowDetails: () => {},
};

export default ShowtimesTable;
