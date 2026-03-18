<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const contacts = ref([
  { id: 0, Name: 'Snehan Gnanassorian', Mail: 'snehan.gnanassorian@mail.com', Tel: '+41 00 000 00 00' },
  { id: 1, Name: 'Zidane Sahraoui', Mail: 'zidane.sahraoui@mail.com', Tel: '+41 00 000 00 00' },
  { id: 2, Name: 'Ökkes Erdem Köse', Mail: 'erdem.kose@mail.com', Tel: '+41 00 000 00 00' },
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
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
}

footer {
  margin-top: auto;
  width: 100%;
  background-color: #f9f9f9;
}

.contacts-container {
  display: flex;
  justify-content: center;
  gap: 30px;
  padding: 40px;
  background-color: #f9f9f9;
}
</style>
