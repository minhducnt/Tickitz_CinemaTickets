import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTable = styled.div`
	overflow-x: auto;
	table {
		border-collapse: collapse;
		width: 100%;
		border-radius: 15px;
		justify-content: center;
		box-shadow: 0px 6px 8px rgba(25, 50, 47, 0.08),
			0px 3px 4px rgba(18, 71, 52, 0.02), 0px 1px 16px rgba(18, 71, 52, 0.03);
	}
	td,
	th {
		text-align: left;
		padding: 20px;
		vertical-align: middle;
		white-space: nowrap;
	}
	thead {
		background-color: #8a3cff;
	}
	tbody tr {
		background-color: #f6f9fd;
	}
`;

const Table = ({ children }) => {
	return <StyledTable>{children}</StyledTable>;
};

Table.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Table;
