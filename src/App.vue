<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'
import Footer from '@/components/Footer.vue'

const {
  isLoading,
  isAuthenticated,
  user,
  loginWithRedirect,
  logout: auth0Logout
} = useAuth0()

const signup = () => loginWithRedirect({
  authorizationParams: { screen_hint: 'signup' }
})

const login = () => loginWithRedirect()

const logout = () => auth0Logout({
  logoutParams: { returnTo: window.location.origin }
})

const contacts = ref([
  { id: 0, Name: 'Snehan Gnanassorian', Mail: 'snehan.gnanassorian@mail.com', Tel: '+41 00 000 00 00' },
  { id: 1, Name: 'Zidane Sahraoui', Mail: 'zidane.sahraoui@mail.com', Tel: '+41 00 000 00 00' },
  { id: 2, Name: 'Ökkes Erdem Köse', Mail: 'erdem.kose@mail.com', Tel: '+41 00 000 00 00' },
])
</script>

<template>
  <div id="layout">
    <header>
      <div class="wrapper">
        <div class="logo-container">
          <img src="/logo.png" alt="Logo" class="logo" />
        </div>

        <nav class="links">
          <RouterLink to="/">Accueil</RouterLink>
          <RouterLink to="/browse">Parcourir</RouterLink>

          <template v-if="isAuthenticated">
            <RouterLink to="/mybooks">Mes Ouvrages</RouterLink>
            <RouterLink to="/addboook">Ajouter</RouterLink>
          </template>

          <div v-if="!isLoading" class="auth-buttons">
            <template v-if="!isAuthenticated">
              <button @click="login" class="nav-btn login-route">Se connecter</button>
              <button @click="signup" class="nav-btn signin-route">S'inscrire</button>
            </template>

            <template v-else>
              <span class="user-name">{{ user?.nickname || user?.name }}</span>
              <button @click="logout" class="nav-btn login-route">Déconnexion</button>
            </template>
          </div>
        </nav>
      </div>
    </header>

    <main class="content">
      <div v-if="isLoading" class="loading-screen">Chargement...</div>
      <RouterView v-else />
    </main>

    <footer>
      <div class="contacts-container">
        <Footer v-for="contact in contacts" :key="contact.id" :contact="contact" />
      </div>
    </footer>
  </div>
</template>

<style>
#layout {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  flex-shrink: 0;
  background: #ffffff;
  border-bottom: 1px solid #f1f1f1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

.logo {
  height: 70px;
  width: auto;
  display: block;
}

.content {
  flex: 1;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1350px;
  margin: 0 auto;
  padding: 10px 20px;
}

nav {
  display: flex;
  align-items: center;
}

nav a,
.nav-btn {
  text-decoration: none;
  color: #666;
  font-size: 15px;
  font-weight: 500;
  padding: 8px 15px;
  margin: 0 5px;
  transition: all 0.3s ease;
  border-radius: 6px;
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
}

nav a:hover:not(.login-route, .signin-route) {
  color: #000;
  background: #f8f8f8;
}

.auth-buttons {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  margin-right: 15px;
  color: #42b983;
}

.login-route {
  color: #2c3e50;
  border: 1px solid #dcdcdc !important;
}

.login-route:hover {
  background: #fdfdfd;
  border-color: #999 !important;
}

.signin-route {
  background-color: #2c3e50 !important;
  color: #ffffff !important;
}

.signin-route:hover {
  background-color: #1a252f !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.contacts-container {
  display: flex;
  justify-content: center;
  gap: 30px;
  padding: 40px;
  background-color: #f9f9f9;
}

.loading-screen {
  padding: 100px;
  font-weight: bold;
}
</style>
