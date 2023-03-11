import React from 'react';
import { Navbar, Footer } from './components';

function MainLayout(props) {
	const { children, withFooter = true } = props;
	return (
		<div>
			<Navbar />
			{children}
			{withFooter && <Footer />}
		</div>
	);
}

export default MainLayout;
