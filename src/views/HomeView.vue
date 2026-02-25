<script setup>
import EventCard from '@/components/EventCard.vue'
import Footer from '@/components/Footer.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const ouvrages = ref([])

onMounted(() => {
  axios
    .get('http://localhost:3000/ouvrages')
    .then((response) => {
      ouvrages.value = response.data.reverse()
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des ouvrages:', error)
    })
})
</script>

<template>
  <header class="section">
    <div class="Title">
      <h1>Passion Lecture</h1>
      <p>Votre bibliothèque, vos avis, votre passion.</p>
    </div>
  </header>

  <main>
    <h2>Ajouté récemment</h2>
    <p>Derniers ouvrages ajoutés</p>

    <div class="events">
      <EventCard v-for="ouvrage in ouvrages.slice(0, 4)" :key="ouvrage.id" :ouvrage="ouvrage" />
    </div>
  </main>
</template>

<style scoped>
.section {
  height: 50vh;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}
.Title {
  margin-bottom: 10%;
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
