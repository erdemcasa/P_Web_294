<script setup>
import { RouterLink } from 'vue-router'

const navLinks = [
  { name: 'Accueil', path: '/' },
  { name: 'Parcourir', path: '/browse' },
  { name: 'Mes Ouvrages', path: '/mybooks' }
]
</script>

<template>
  <header>
    <div class="wrapper">
      <div class="logo-container">
        <RouterLink to="/">
          <img src="/logo.png" alt="Logo" class="logo" />
        </RouterLink>
      </div>

      <nav class="links">
        <RouterLink
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
        >
          {{ link.name }}
        </RouterLink>

        <RouterLink to="/login" class="login-route">Se connecter</RouterLink>
        <RouterLink to="/sign" class="signin-route">S'inscrire</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
header {
  background: #ffffff;
  border-bottom: 1px solid #f1f1f1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  flex-shrink: 0;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1350px;
  margin: 0 auto;
  padding: 10px 20px;
}

.logo-container img {
  width: 100px;
  display: block;
}

nav {
  display: flex;
  align-items: center;
}

nav a {
  text-decoration: none;
  color: #666;
  font-size: 15px;
  font-weight: 500;
  padding: 8px 15px;
  margin: 0 5px;
  transition: all 0.3s ease;
  border-radius: 6px;
}

nav a:hover:not(.login-route, .signin-route) {
  color: #000;
  background: #f8f8f8;
}

nav a.router-link-exact-active:not(.login-route, .signin-route) {
  color: #2c3e50;
  font-weight: 700;
}

.login-route {
  margin-left: 40px;
  color: #2c3e50;
  border: 1px solid #dcdcdc;
}

.login-route:hover {
  background: #fdfdfd;
  border-color: #999;
}

.signin-route {
  background-color: #2c3e50;
  color: #ffffff;
  margin-left: 10px;
}

.signin-route:hover {
  background-color: #1a252f;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
