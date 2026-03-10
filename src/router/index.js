import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import BrowseView from '@/views/BrowseView.vue'
import BookView from '@/views/BookView.vue'
import MyBooksView from '@/views/MyBooksView.vue'
import AddBookView from '@/views/AddBookView.vue'
import EditBookView from '@/views/EditBookView.vue'
import LoginView from '@/views/LoginView.vue'
import SignView from '@/views/SignView.vue'
import AuthorView from '@/views/AuthorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/parcourir', name: 'browse', component: BrowseView },
    { path: '/ouvrages/:id', name: 'book-details', component: BookView },
    { path: '/mes-ouvrages', name: 'my-books', component: MyBooksView },
    { path: '/ouvrages/nouveau', name: 'add-book', component: AddBookView },
    { path: '/ouvrages/:id/editer', name: 'edit-book', component: EditBookView },
    { path: '/auteurs/:id', name: 'author-details', component: AuthorView },
    { path: '/connexion', name: 'login', component: LoginView },
    { path: '/inscription', name: 'sign', component: SignView },
  ],
})

export default router
