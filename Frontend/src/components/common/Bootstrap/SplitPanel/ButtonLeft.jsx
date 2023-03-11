import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles.css';

function ButtonLeft(props) {
	return (
		<div className="pt-3 checkout">
			<Link to={props.gobuttonleft}>
				<Button
					{...props}
					variant="outline-primary"
					block
					className="float-left col-12 col-md-5"
				>
					{props.buttontext}
				</Button>
			</Link>
		</div>
	);
}

export default ButtonLeft;
