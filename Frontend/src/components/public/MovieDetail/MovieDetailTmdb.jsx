import { tmdbAPI } from '../../../shared/apis/tmdbApi';
import { LoadingSpinner } from '../../common';

import DetailBanner from './components/DetailBanner';
import DetailCasts from './components/DetailCasts';
import DetailHeader from './components/DetailHeader';
import DetailOverview from './components/DetailOverview';
import DetailTrailer from './components/DetailTrailer';

import { enUS } from 'date-fns/locale';
import { Row } from 'react-bootstrap';
import { Datepicker } from '@meinefinsternis/react-horizontal-date-picker';
import { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { scrollTop } from '../../../shared/utils/utils';

const StyledMovieDetailTmdb = styled.section``;

const MovieDetailTmdb = () => {
	const { search } = useLocation();
	const searchParams = useMemo(() => new URLSearchParams(search), [search]);
	const tmdbId = searchParams.get('tmdbId');
	const [loading, setLoading] = useState(true);
	const [detailTmdb, setDetailTmdb] = useState([]);

	const fetchMovieDetailTMDB = async () => {
		setLoading(true);
		try {
			const { data } = await tmdbAPI.getMovieDetail(tmdbId);
			setDetailTmdb(data);
			setLoading(false);
		} catch (err) {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchMovieDetailTMDB();
		scrollTop();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tmdbId]);

	if (loading) return <LoadingSpinner />;
	const { overview, backdrop_path } = detailTmdb;

	return (
		<StyledMovieDetailTmdb>
			<DetailBanner banner={backdrop_path} />
			<div>
				<DetailHeader detailTmdb={detailTmdb} />
				<DetailOverview overview={overview} />
				<DetailCasts />
				<DetailTrailer />
			</div>
			<div className="text-center py-4">
				<p className="text-display-xs-bold">Showtimes and Tickets</p>
				<hr />
				<Row className="justify-content-center">
					<Datepicker
						locale={enUS}
						startValue={new Date()}
						startDate={new Date(new Date().valueOf() - 1000 * 60 * 60 * 24 * 1)}
						endDate={new Date(new Date().valueOf() + 1000 * 60 * 60 * 24 * 8)}
					/>
				</Row>
				<p className="text-md pt-2">There are no showtimes available</p>
			</div>
		</StyledMovieDetailTmdb>
	);
};

export default MovieDetailTmdb;
