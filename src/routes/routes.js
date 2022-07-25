import Login from '../pages/login';
import Home from '../pages/home';
import Admin from '../pages/admin/index';
import Doctors from '../pages/doctors';

const protectedRoutes = [
 
];

const admin = [
  {
    path: '',
    component: <Admin />,
    exact: true
  },
]

const doctors = [

  {
    path: 'doctors',
    component: <Doctors />,
    exact: true
  }
]


const publicRoutes = [
  {
    path: 'login',
    component: <Login />,
    exact: true,
  }
];

export {
  protectedRoutes,
  publicRoutes,
  admin,
  doctors
};