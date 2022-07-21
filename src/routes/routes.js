import Login from '../pages/login';
import Home from '../pages/home';
import Admin from '../pages/admin/index';
import Doctors from '../pages/doctors';

const protectedRoutes = [
  {
    path: '',
    component: <Admin />,
    exact: true
  },
  {
    path: 'doctors',
    component: <Doctors />,
    exact: true
  }
];


const publicRoutes = [
  {
    path: 'login',
    component: <Login />,
    exact: true,
  }
];

export {
  protectedRoutes,
  publicRoutes
};