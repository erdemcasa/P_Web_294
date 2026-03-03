import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BrowseView from '../views/BrowseView.vue'
import BookView from '../views/BookView.vue'
import MyBooksView from '../views/MyBooksView.vue'
import AddBookView from '../views/AddBookView.vue'
import EditBookView from '../views/EditBookView.vue'
import LoginView from '../views/LoginView.vue'
import SignView from '../views/SignView.vue'
import AuthorView from '@/views/AuthorView.vue'

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
      component: BrowseView,
    },
    {
      path: '/book/:id',
      name: 'book',
      component: BookView,
    },
    {
      path: '/mybooks',
      name: 'mybooks',
      component: MyBooksView,
    },
    {
      path: '/add-book',
      name: 'add-book',
      component: AddBookView,
    },
    {
      path: '/edit-book/:id',
      name: 'edit-book',
      component: EditBookView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/sign',
      name: 'sign',
      component: SignView,
    },
    {
      path: '/auteur/:id',
      name: 'AuthorDetails',
      component: AuthorView,
    }
  ],
})

export default router
