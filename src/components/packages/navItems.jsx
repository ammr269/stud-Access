import {
  MdAdminPanelSettings,
  MdDashboard,
  MdManageAccounts,
} from 'react-icons/md';

export const navItems = [
  {
    title: 'Tableau de bordure ..',
    icon: <MdDashboard />,
    id: 1,
    href: '/dashboard',
    description: "Une vue globale sur l'ensemble du site",
  },
  {
    title: 'Gestion des utilisateurs',
    icon: <MdManageAccounts />,
    id: 2,
    href: '/allusers',
    description: 'Gestion des crises et des imprévus',
  },
  {
    title: 'Information des étudiants',
    icon: <MdAdminPanelSettings />,
    id: 3,
    href: '/allusers',
    description:
      "Adminisitration de l'enrtreprise, en charge de l'ensemble des taches ",
  },
];
