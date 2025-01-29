import {
  MdAdminPanelSettings,
  MdDashboard,
  MdManageAccounts,
} from 'react-icons/md';

export const navItems = [
  {
    title: 'Fiabilité et confiance',
    icon: <MdDashboard />,
    id: 1,
    href: '/dashboard',
    description:
      'Chez Stud-Access, nous tenons nos promesses avec rigueur et engagement, faisant de la fiabilité notre marque de distinction',
  },
  {
    title: 'Procédure Rapide et facile',
    icon: <MdManageAccounts />,
    id: 2,
    href: '/allusers',
    description:
      'Avec Stud-Access, profitez d’une procédure simplifiée et ultra-rapide pour une inscription sans stress !',
  },
  {
    title: 'Sécurité',
    icon: <MdAdminPanelSettings />,
    id: 3,
    href: '/admin',
    description:
      'Notre application garantit une protection optimale et une intégrité absolue de vos données. ',
  },
];
