import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/browse',
      name: 'browse',

      component: () => import('../views/BrowseView.vue'),
    },
    {
      path: '/book/:id',
      name: 'book',
      component: () => import('../views/BookView.vue'),
      props: true,
    },
    {
      path: '/mybooks',
      name: 'mybooks',
      component: () => import('../views/MyBooksView.vue'),
    },
    {
      path: '/add-book',
      name: 'add-book',
      component: () => import('../views/AddBookView.vue'),
    },
    {
      path: '/edit-book/:id',
      name: 'edit-book',
      component: () => import('../views/EditBookView.vue'),
      props: true,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/sign',
      name: 'sign',
      component: () => import('../views/SignView.vue'),
    },
    {
      path: '/auteur/:id',
      name: 'AuthorDetails',
      component: () => import('@/views/AuthorView.vue'),
      props: true,
    },
    // page si l'url est faux ou n'est pas trovée
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/HomeView.vue'),
    }
  ],

  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

export default router
