import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdContacts,
  MdHome,
  MdLock
} from 'react-icons/md';

// Admin Imports
import Contacts from 'views/admin/contacts';
import MainDashboard from 'views/admin/default';
import LeadTables from 'views/admin/leads';

// Auth Imports
import SignInCentered from 'views/auth/signIn';

const routes = [
  {
    name: 'Main Dashboard',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <MainDashboard />,
  },
  {
    name: 'Leads',
    layout: '/admin',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/lead-tables',
    component: <LeadTables />,
  },
  {
    name: 'Contacts',
    layout: '/admin',
    icon: <Icon as={MdContacts} width="20px" height="20px" color="inherit" />,
    path: '/contacts',
    component: <Contacts />,
  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <SignInCentered />,
  },
];

export default routes;
