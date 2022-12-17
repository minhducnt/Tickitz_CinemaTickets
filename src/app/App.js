import { path } from '../shared/constants/path';
import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@material-ui/core/styles';
import persistedStore from '../service/store';

//Register
import SignUp from '../pages/Public/RegisterPage/SignUp';
import SignIn from '../pages/Public/RegisterPage/SignIn';
import ForgetPassword from '../pages/Public/RegisterPage/ForgetPassword';
import EmailVerificationRegister from '../pages/Public/RegisterPage/EmailVerify/EmailVerificationRegister';
import EmailVerificationForgot from '../pages/Public/RegisterPage/EmailVerify/EmailVerificationForgot';

//Public
import HomePage from '../pages/Public/HomePage/HomePage';
import MoviePage from '../pages/Public/MoviePage/MoviePage';
import MovieDetail from '../pages/Public/MovieDetail/MovieDetail';
import OrderPage from '../pages/Public/OrderPage/OrderPage';
import PaymentPage from '../pages/Public/PaymentPage/PaymentPage';
import TicketResult from '../pages/Public/TicketResult/TicketResult';
import ProfilePage from '../pages/Public/ProfilePage/ProfilePage';
import Error from '../pages/Public/NotFound/NotFound';
import UserHistory from '../pages/Public/History/UserHistory';

//Admin
import MoviePanel from '../pages/Admin/MoviePanel/MoviePanel';
import CinemaPanel from '../pages/Admin/CinemaPanel/CinemaPanel';
import ShowtimePanel from '../pages/Admin/ShowtimePanel/ShowtimePanel';
import GenrePanel from '../pages/Admin/GenrePanel/GenrePanel';

//Components
import { MainLayout, AdminLayout } from '../layouts';
import {
	WithLayoutRoute,
	ProtectedRoute,
	AdminRoute,
	BlockedRoute,
} from '../shared/routes';
import ScrollToTop from '../shared/utils/utils';

//Styles
import Theme from '../shared/theme';

export default class App extends Component {
	render() {
		const { store, persistor } = persistedStore();
		return (
			<Provider store={store}>
				<ThemeProvider theme={Theme}>
					<PersistGate persistor={persistor}>
						<Suspense fallback={<></>}>
							<Router>
								<ScrollToTop />
								<Switch>
									<Route path={path.signUp} component={SignUp} />
									<Route path={path.signIn} component={SignIn} />
									<Route
										path={path.forgetPassword}
										component={ForgetPassword}
									/>

									<BlockedRoute
										path={path.emailVerifyRegister}
										component={EmailVerificationRegister}
									/>
									<BlockedRoute
										path={path.emailVerifyForgot}
										component={EmailVerificationForgot}
									/>

									<WithLayoutRoute
										exact
										path={path.home}
										layout={MainLayout}
										component={HomePage}
									/>
									<WithLayoutRoute
										path={path.movies}
										layout={MainLayout}
										component={MoviePage}
									/>
									<WithLayoutRoute
										path={path.detail}
										layout={MainLayout}
										component={MovieDetail}
									/>

									<ProtectedRoute
										path={path.profile}
										layout={MainLayout}
										component={ProfilePage}
									/>
									<ProtectedRoute
										path={path.order}
										layout={MainLayout}
										component={OrderPage}
									/>
									<ProtectedRoute
										path={path.history}
										layout={MainLayout}
										component={UserHistory}
									/>
									<ProtectedRoute
										path={path.payment}
										layout={MainLayout}
										component={PaymentPage}
									/>
									<ProtectedRoute
										path={path.ticketResult}
										layout={MainLayout}
										component={TicketResult}
									/>

									<AdminRoute
										exact
										path={path.movieManage}
										layout={AdminLayout}
										component={MoviePanel}
									/>
									<AdminRoute
										exact
										path={path.showtimeManage}
										layout={AdminLayout}
										component={ShowtimePanel}
									/>
									<AdminRoute
										exact
										path={path.cinemaManage}
										layout={AdminLayout}
										component={CinemaPanel}
									/>
									<AdminRoute
										exact
										path={path.genreManage}
										layout={AdminLayout}
										component={GenrePanel}
									/>

									<Route path={path.notFound} component={Error} />
								</Switch>
							</Router>
						</Suspense>
					</PersistGate>
				</ThemeProvider>
			</Provider>
		);
	}
}
