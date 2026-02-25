<script setup>
import EventCard from '@/components/EventCard.vue'
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const ouvrages = ref([])
const recherche = ref('')

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

const filteredOuvrages = computed(() => {
  return ouvrages.value.filter((ouvrage) => {
    const titre = ouvrage.titre ? ouvrage.titre.toLowerCase() : ''
    const auteur = ouvrage.auteur ? ouvrage.auteur.toLowerCase() : ''
    const terme = recherche.value.toLowerCase()

    return titre.includes(terme) || auteur.includes(terme)
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

    <div class="results-container">
      <div v-if="filteredOuvrages.length > 0" class="events">
        <EventCard
          v-for="ouvrage in filteredOuvrages"
          :key="ouvrage.id"
          :ouvrage="ouvrage"
        />
      </div>

      <div v-else-if="ouvrages.length > 0" class="no-results">
        <p>Aucun livre ne correspond à "<strong>{{ recherche }}</strong>"</p>
      </div>

      <div v-else class="loading">
        Chargement des ouvrages...
      </div>
    </div>
  </div>
</template>

<style scoped>
.browse {
  padding: 20px;
  text-align: center;
}

h1 {
  margin-bottom: 30px;
  color: #2c3e50;
}

.search-wrapper {
  max-width: 500px;
  margin: 0 auto 40px auto;
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

.events {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
}

.no-results, .loading {
  margin-top: 50px;
  font-size: 1.2rem;
  color: #828282;
}

.no-results strong {
  color: #2c3e50;
}
</style>
