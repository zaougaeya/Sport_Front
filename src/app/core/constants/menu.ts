import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'SportSync',
      separator: false,
      items: [
        {
          // icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Dashboard',
          route: '/dashboard',
         
        },
        {
          // icon: 'assets/icons/heroicons/outline/lock-closed.svg',
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
      group: 'Gestion users',
      separator: true,
      items: [
        {
          // icon: 'assets/icons/heroicons/outline/download.svg',
          label: 'users',
          route: '/download',
        },
       
        
      ],
    },

    {
      group: 'Gestion Catalogue',
      separator: true,
      items: [
        {
          // icon: 'assets/icons/heroicons/outline/cube.svg',
          label: 'Catégories',
          route: '/categories',
        },
        {
          // icon: 'assets/icons/heroicons/outline/cube-transparent.svg',
          label: 'Produits',
          route: '/produits',
        },
      ],
    },
  
    {
      group: 'Commandes et Paniers',
      separator: true,
      items: [
        {
          // icon: 'assets/icons/heroicons/outline/shopping-cart.svg',
          label: 'Panier',
          route: '/panier',
        },
        {
          // icon: 'assets/icons/heroicons/outline/clipboard-check.svg',
          label: 'Commandes',
          route: '/commandes',
        },
      ],
    },
  
    {
      group: 'Livraison',
      separator: true,
      items: [
        {
          // icon: 'assets/icons/heroicons/outline/truck.svg',
          label: 'Suivi Livraison',
          route: '/livraison',
        },
      ],
    },
  
    {
      group: 'Statistiques',
      separator: true,
      items: [
        {
          // icon: 'assets/icons/heroicons/outline/chart-bar.svg',
          label: 'Ventes',
          route: '/stats-ventes',
        },
        {
          // icon: 'assets/icons/heroicons/outline/trending-up.svg',
          label: 'Performance Produits',
          route: '/performances',
        },
      ],
    },

   
    {
      group: 'Locaux et Evénements ',
      separator: true,
      items: [
        {
          // icon: 'assets/icons/heroicons/outline/cog.svg',
          label: 'Locaux',
          route: '/local',
        },
        {
          // icon: 'assets/icons/heroicons/outline/bell.svg',
          label: 'Evénements',
          route: '/events',
        },
     
      ],
    },
 
 
    {
      group: 'Équipe Match  ',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/cog.svg',
          label: 'Equipe',
          route: '/dashboard/equipe',
        },
        {
          icon: 'assets/icons/heroicons/outline/bell.svg',
          label: 'Match',
          route: '/dashboard/match',
        },
        {
          icon: 'assets/icons/heroicons/outline/bell.svg',
          label: 'Terrain',
          route: '/dashboard/terrain',
        },
        {
          icon: 'assets/icons/heroicons/outline/bell.svg',
          label: 'Planning',
          route: '/dashboard/planning',
        },
        {
          icon: 'assets/icons/heroicons/outline/bell.svg',
          label: 'Session',
          route: '/dashboard/session',
        },
        {
          icon: 'assets/icons/heroicons/outline/bell.svg',
          label: 'SessionJeu',
          route: '/dashboard/sessionJeu',
        },
      ],
    },

    {
      group: ' Réservation des Matériels ',
      separator: true,
      items: [
        {
          // icon: 'assets/icons/heroicons/outline/cog.svg',
          label: 'Réservation des équipements ',
          route: '/local',
        },
        {
          // icon: 'assets/icons/heroicons/outline/bell.svg',
          label: 'Gestion de l’inventaire ',
          route: '/events',
        },
     
      ],
    },





    {
      group: ' Médical  ',
      separator: true,
      items: [
        {
          // icon: 'assets/icons/heroicons/outline/cog.svg',
          label: 'Suivi médical des joueurs ',
          route: '/local',
        },
        {
          // icon: 'assets/icons/heroicons/outline/bell.svg',
          label: 'Gestion des autorisations médicales  ',
          route: '/events',
        },
     
      ],
    },

    {
      group: 'Blogging',
      separator: true,
      items: [
        {
          // icon: 'assets/icons/heroicons/outline/cog.svg',
          label: 'Blog',
          route: '/settings',
        },
        {
          // icon: 'assets/icons/heroicons/outline/bell.svg',
          label: 'Comments',
          route: '/gift',
        },
       
      ],
    },
   
  ];
}