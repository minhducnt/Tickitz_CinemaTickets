import React from 'react';
import { Card, Col, Form, Button } from 'react-bootstrap';
import './styles.css';
import bg from '../../../assets/images/footer-bg.jpg';

function SubscribeComponent() {
	return (
		<Form.Group>
			<Card
				className="card-mail align-items-center text-center border-0 shadow"
				style={{ backgroundImage: `url(${bg})` }}
			>
				<Card.Body>
					<p className="text-display-xs text-color-body m-0">
						Be the vanguard of the
					</p>
					<p className="text-primary text-link-lg-48 ">Moviegoers</p>
					<Form.Row>
						<Col md={8} xs={12}>
							<Form.Control
								type="email"
								placeholder="Type your email"
								className="subMail "
							/>
						</Col>
						<Col md={4} xs={12}>
							<Button className="subMail" variant="primary" type="submit" block>
								Join now
							</Button>
						</Col>
					</Form.Row>
					<p className="text-muted pt-3">
						By joining you as a Tickitz member, <br />
						we will always send you the latest updates via email .
					</p>
				</Card.Body>
			</Card>
		</Form.Group>
	);
}

export default SubscribeComponent;
