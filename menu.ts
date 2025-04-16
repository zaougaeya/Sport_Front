import { MenuItem } from '../models/menu.model';
 
export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'ArTyWaves',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Dashboard',
          route: '/dashboard',
         
        },
        {
          icon: 'assets/icons/heroicons/outline/lock-closed.svg',
          label: 'Auth',
          route: '/auth',
          children: [
            { label: 'Sign up', route: '/auth/sign-up' },
            { label: 'Sign in', route: '/auth/sign-in' },
            { label: 'Forgot Password', route: '/auth/forgot-password' },
            { label: 'New Password', route: '/auth/new-password' },
            { label: 'Two Steps', route: '/auth/two-steps' },
          ],
        },
       
      ],
    },
    {
      group: 'Gestion catégorie et produit',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/download.svg',
          label: 'Categorie',
          route: '/download',
        },
        {
          icon: 'assets/icons/heroicons/outline/download.svg',
          label: 'Produit',
          route: '/download',
        },
        {
          icon: 'assets/icons/heroicons/outline/download.svg',
          label: 'Article',
          route: '/download',
        },
      ],
    },
    {
      group: 'Gestion des ventes',
      separator: true,
      items: [
 
        {
          icon: 'assets/icons/heroicons/outline/gift.svg',
          label: 'Panier',
          route: '/gift',
        },
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Commande',
          route: '/users',
        },
      ],}
      ,
   
    {
      group: 'Locaux et Evénements ',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/cog.svg',
          label: 'Locaux',
          route: '/local',
        },
        {
          icon: 'assets/icons/heroicons/outline/bell.svg',
          label: 'Evénements',
          route: '/events',
        },
     
      ],
    },
 
 
    {
      group: 'Blogging',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/cog.svg',
          label: 'Blog',
          route: '/settings',
        },
        {
          icon: 'assets/icons/heroicons/outline/bell.svg',
          label: 'Comments',
          route: '/gift',
        },
       
      ],
    },
   
  ];
}