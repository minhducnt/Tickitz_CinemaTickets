import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles.css';

function ButtonPanel(props) {
	return (
		<div className="pt-3 checkout">
			<Link style={{ textDecoration: 'none' }} to={props.gobuttonleft}>
				<Button
					{...props}
					variant="outline-primary"
					block
					className="float-left col-12 col-md-5"
					onClick={props.onClickLeft}
				>
					{props.buttonleft}
				</Button>
			</Link>
			<Link style={{ textDecoration: 'none' }} to={props.gobuttonright}>
				<Button
					{...props}
					variant="outline-primary"
					block
					className="float-right col-12 col-md-5"
					onClick={props.onClickRight}
				>
					{props.buttonright}
				</Button>
			</Link>
		</div>
	);
}

export default ButtonPanel;
