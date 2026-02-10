<script setup>
import { RouterLink, RouterView } from 'vue-router'
//import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div id="layout">
    <header>
      <div class="wrapper">
        <nav class="links">
          <RouterLink to="/">Parcourir</RouterLink>
          <RouterLink to="#">Mes Ouvrages</RouterLink>
          <RouterLink to="#">Ajouter</RouterLink>
          <RouterLink to="#">Se connecter</RouterLink>
          <RouterLink to="#">S'inscrire</RouterLink>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<style>
#layout {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

header {
  display: flex;
  justify-content: flex-end;
  /*background-color: DodgerBlue;*/
}

nav {
  padding: 30px;
}
nav a {
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50;
  margin: 0 10px;
}
nav a.router-link-exact-active {
  color: #42b983;
}
h2 {
  font-size: 20px;
}
</style>
