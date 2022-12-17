import styled from 'styled-components';
import PropTypes from 'prop-types';
import { TextClamp } from '../../../../assets/styles/mixin';
import { Link } from 'react-router-dom';

const StyledMovieTitle = styled.h3`
	margin: 10px 0 10px;
	font-weight: 700;
	font-size: 18px;
	text-transform: capitalize;
	${TextClamp.multilines(2)};
	a {
		font-weight: 500;
		color: var(--black);
		transition: all 0.25s linear;
		text-decoration: none;
	}
	&:hover a {
		color: #8a3cff;
	}
`;

const MovieTitleCard = ({ to, children }) => {
	if (to)
		return (
			<StyledMovieTitle>
				<Link to={to}>{children}</Link>
			</StyledMovieTitle>
		);
	return <StyledMovieTitle>{children}</StyledMovieTitle>;
};

MovieTitleCard.propTypes = {
	to: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default MovieTitleCard;
