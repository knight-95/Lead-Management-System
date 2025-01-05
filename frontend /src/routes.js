import { Icon } from '@chakra-ui/react';
import { FaHandsHelping } from 'react-icons/fa';
import { MdBarChart, MdContacts, MdHome } from 'react-icons/md';

// Admin Imports
import Contacts from 'views/admin/contacts';
import MainDashboard from 'views/admin/default';
import Interactions from 'views/admin/interactions';
import LeadTables from 'views/admin/leads';
import NotFound from 'views/admin/NotFound';

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
    name: 'Interactions',
    layout: '/admin',
    icon: (
      <Icon as={FaHandsHelping} width="20px" height="20px" color="inherit" />
    ),
    path: '/interactions',
    component: <Interactions />,
  },
  // {
  //   name: '404 Not Found',
  //   layout: '/admin',
  //   path: '*', // Wildcard path for catch-all
  //   component: <NotFound />, // Render the 404 page (this won't be shown in the sidebar)
  // },
];

export default routes;