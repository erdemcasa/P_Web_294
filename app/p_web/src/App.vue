<script setup>
import { RouterLink, RouterView } from 'vue-router'
//import HelloWorld from './components/HelloWorld.vue'
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
          <RouterLink to="/mybooks">Mes Ouvrages</RouterLink>
          <RouterLink to="/addboook">Ajouter</RouterLink>
          <RouterLink to="/login" class="login-route">Se connecter</RouterLink>
          <RouterLink to="/sign" class="signin-route">S'inscrire</RouterLink>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<style>
#layout {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

header {
  background: #ffffff;
  border-bottom: 1px solid #f1f1f1;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

.logo-container img {
  width: 100px;
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
  margin-left: 40px ;
  color: #2c3e50 ;
  border: 1px solid #dcdcdc ;
}

.login-route:hover {
  background: #fdfdfd;
  border-color: #999 ;
}

.signin-route {
  background-color: #2c3e50 ;
  color: #ffffff ;
  margin-left: 10px ;
}

.signin-route:hover {
  background-color: #1a252f ;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

</style>
