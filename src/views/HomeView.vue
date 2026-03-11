<script setup>
import BookCard from '@/components/BookCard.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const ouvrages = ref([])
const auteurs = ref([])
const users = ref([])

onMounted(() => {
  axios.get('http://localhost:3000/ouvrages')
    .then((res) => {
      ouvrages.value = res.data.reverse()
    })
    .catch((err) => console.error('Erreur ouvrages:', err))

  axios.get('http://localhost:3000/auteurs')
    .then((res) => {
      auteurs.value = res.data
    })
    .catch((err) => console.error('Erreur auteurs:', err))

  axios.get('http://localhost:3000/utilisateurs')
    .then((res) => {
      users.value = res.data
    })
    .catch((err) => {
      console.warn('Note: La route /users n’existe pas encore (404).')
    })
})
</script>

<template>
  <main>
    <div class="events">
      <BookCard
        v-for="ouvrage in ouvrages.slice(0, 5)"
        :key="ouvrage.id"
        :ouvrage="ouvrage"
        :auteurs="auteurs"
        :users="users"
      />
    </div>
  </main>
</template>

<style scoped>
.section {
  height: 30vh;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}
.Title {
  margin-bottom: 20px;
  text-align: center;
}
.events {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
}
h1 {
  font-size: 5rem;
  font-weight: 800;
}
.Title p {
  font-size: 2rem;
}
.contacts {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 30px;
}
h2 {
  text-align: center;
  margin-top: 40px;
}
p {
  text-align: center;
}
</style>
