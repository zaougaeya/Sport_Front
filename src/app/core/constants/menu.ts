import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'SportSync',
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
      group: 'Gestion users',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/u.jbg',
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
          icon: 'assets/icons/heroicons/outline/checklist.png',
          label: 'Catégories',
          route: '/dashboard/categories',
        },
        {
          icon: 'assets/icons/heroicons/outline/cubes.png',
          label: 'Produits',
          route: '/dashboard/produits',
        },
      ],
    },
  
    {
      group: 'Commandes ',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/list.png',
          label: 'Commandes',
          route: '/dashboard/commandes',
        },
      ],
    },
  
    {
      group: 'Livraison',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/box.png',
          label: 'Gestion Livreur',
          route: '/dashboard/livreurs',
        },
      ],
    },
  
    {
      group: 'Statistiques',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/a.png',
          label: 'Ventes',
          route: '/dashboard/stat-v',
        },
       
      ],
    },

   
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
      group: 'Équipe Match  ',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/cog.svg',
          label: 'Equipe',
          route: '/local',
        },
        {
          icon: 'assets/icons/heroicons/outline/bell.svg',
          label: 'Match',
          route: '/events',
        },
     
      ],
    },

    {
      group: ' Réservation des Matériels ',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/cog.svg',
          label: 'Réservation des équipements ',
          route: '/local',
        },
        {
          icon: 'assets/icons/heroicons/outline/bell.svg',
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
          icon: 'assets/icons/heroicons/outline/cog.svg',
          label: 'Suivi médical des joueurs ',
          route: '/local',
        },
        {
          icon: 'assets/icons/heroicons/outline/bell.svg',
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