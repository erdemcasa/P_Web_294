<script setup>
import EventCard from '@/components/EventCard.vue'
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const ouvrages = ref([])
const recherche = ref('')

onMounted(() => {
  axios
    .get('https://my-json-server.typicode.com/erdemcasa/P_Web_294/ouvrages')
    .then((response) => {
      ouvrages.value = response.data.reverse()
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des ouvrages:', error)
    })
})

const filteredOuvrages = computed(() => {
  return ouvrages.value.filter((ouvrage) => {
    return ouvrage.titre.toLowerCase().includes(recherche.value.toLowerCase()) ||
           ouvrage.auteur.toLowerCase().includes(recherche.value.toLowerCase())
  })
})
</script>

<template>
  <div class="browse">
    <h1>Parcourir les livres</h1>
    <div class="search-wrapper">
        <input
          v-model="recherche"
          type="text"
          placeholder="Rechercher un livre ou un auteur..."
          class="search-bar"
        />
      </div>
  </div>
</template>

<style>
/*@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}*/

.search-wrapper {
  max-width: 500px;
  margin: 0 auto;
}

.search-bar {
  width: 100%;
  padding: 15px 25px;
  border-radius: 30px;
  border: 1px solid #ddd;
  font-size: 1.1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  outline: none;
  transition: all 0.3s ease;
}

.search-bar:focus {
  border-color: #2c3e50;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

</style>
