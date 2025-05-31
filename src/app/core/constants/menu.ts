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
          icon: 'assets/icons/heroicons/outline/download.svg',
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
          icon: 'assets/icons/heroicons/outline/cube.svg',
          label: 'Catégories',
          route: '/categories',
        },
        {
          icon: 'assets/icons/heroicons/outline/cube-transparent.svg',
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
          icon: 'assets/icons/heroicons/outline/shopping-cart.svg',
          label: 'Panier',
          route: '/panier',
        },
        {
          icon: 'assets/icons/heroicons/outline/clipboard-check.svg',
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
          icon: 'assets/icons/heroicons/outline/truck.svg',
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
          icon: 'assets/icons/heroicons/outline/chart-bar.svg',
          label: 'Ventes',
          route: '/stats-ventes',
        },
        {
          icon: 'assets/icons/heroicons/outline/trending-up.svg',
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
          label: 'Ajouter une équipe médicale ',
          route: '/dashboard/equipesMedicales',
        },
        {
          icon: 'assets/icons/heroicons/outline/bell.svg',
          label: 'Liste équipes médicales',
          route: '/dashboard/listeEquipesMedicales',
        },
        {
          icon: 'assets/icons/heroicons/outline/bell.svg',
          label: 'Ajouter consultation',
          route: '/dashboard/consultations',
        },
           {
          icon: 'assets/icons/heroicons/outline/bell.svg',
          label: 'Réserver une consultation',
          route: '/dashboard/reserverConsultation',
        },

         {
          icon: 'assets/icons/heroicons/outline/bell.svg',
          label: 'Liste des réservations',
          route: '/dashboard/listReservationsConsultations',
        },

           {
          icon: 'assets/icons/heroicons/outline/bell.svg',
          label: 'Liste des consultations',
          route: '/dashboard/listConsultations',
        },

     {
          icon: 'assets/icons/heroicons/outline/bell.svg',
          label: 'Calendrier des médecins',
          route: '/dashboard/calendrier-medecin',
        },
         {
          icon: 'assets/icons/heroicons/outline/bell.svg',
          label: 'Calculer votre IMC',
          route: '/dashboard/imcRecord',
        },
        {
          icon: 'assets/icons/heroicons/outline/bell.svg',
          label: 'Analyse des IMCs des patients',
          route: '/dashboard/imcAnalytics',
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