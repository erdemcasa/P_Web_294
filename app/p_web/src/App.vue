<script setup>
import { RouterLink, RouterView } from 'vue-router'
//import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div id="layout">
    <header>
      <div class="wrapper">
        <nav class="links">
          <RouterLink to="/browse">Parcourir</RouterLink>
          <RouterLink to="/mybooks">Mes Ouvrages</RouterLink>
          <RouterLink to="/addboook">Ajouter</RouterLink>
          <RouterLink to="/login">Se connecter</RouterLink>
          <RouterLink to="/sign">S'inscrire</RouterLink>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<style>
#layout {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

header {
  display: flex;
  justify-content: flex-end;
  background: #f5f5f5;
  border-bottom: 1px solid #eaeaea;
}

nav {
  padding: 20px;
}

nav a {
  display: inline-block;
  padding: 10px 20px;
  margin: 0 8px;
  font-size: 15px;
  font-weight: 500;
  color: #333;
  background: white;
  text-decoration: none;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
}

nav a:hover {
  background: #f0f0f0;
  border-color: #ccc;
  transform: translateY(-1px);
}

nav a.router-link-exact-active {
  background: #42b983;
  color: white;
  border-color: #42b983;
}
</style>
