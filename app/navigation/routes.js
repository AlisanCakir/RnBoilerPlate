import SignInScreen from '../screens/SignIn/SignInScreen';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import SignUpScreen from '../screens/SignUp/SignUpScreen';

const routes = [
  {
    path: 'dashboard',
    component: DashboardScreen,
    name: 'Dashboard',
    authStack: false,
  },
  {
    path: 'sign-in',
    component: SignInScreen,
    name: 'Sign In',
    authStack: true,
  },
  {
    path: 'register',
    component: SignUpScreen,
    name: 'register',
    authStack: true,
  },
];

export default routes;
