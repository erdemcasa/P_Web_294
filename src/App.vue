<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import Footer from '@/components/Footer.vue'
import Header from './components/Header.vue'

const contacts = ref([
  {
    id: 0,
    name: 'Snehan Gnanassorian',
    mail: 'snehan.gnanassorian@mail.com',
    tel: '+41 00 000 00 00',
  },
  {
    id: 1,
    name: 'Zidane Sahraoui',
    mail: 'zidane.sahraoui@mail.com',
    tel: '+41 00 000 00 00',
  },
  {
    id: 2,
    name: 'Ökkes Erdem Köse',
    mail: 'erdem.kose@mail.com',
    tel: '+41 00 000 00 00',
  },
])
</script>

<template>
  <div id="layout">
    <Header />
    <main class="content">
      <RouterView />
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
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
}

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
  cursor: pointer;
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

nav a.router-link-active:not(.login-route, .signin-route) {
  color: #2c3e50;
  font-weight: 700;
}

.login-route {
  margin-left: 40px;
  color: #2c3e50;
  border: 1px solid #dcdcdc;
}

.signin-route {
  background-color: #2c3e50;
  color: #ffffff;
  margin-left: 10px;
}

.signin-route:hover {
  background-color: #1a252f;
}

footer {
  background-color: #f9f9f9;
  border-top: 1px solid #eee;
}

.contacts-container {
  display: flex;
  justify-content: center;
  gap: 30px;
  padding: 40px;
}
</style>
