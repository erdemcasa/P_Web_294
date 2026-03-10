<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '@/services/api'
import BookCard from '@/components/BookCard.vue'

const ouvrages = ref([])
const auteurs = ref([])
const recherche = ref('')
const loading = ref(true)

onMounted(async () => {
  try {
    const [resOuvrages, resAuteurs] = await Promise.all([api.get('/ouvrages'), api.get('/auteurs')])
    ouvrages.value = resOuvrages.data.reverse()
    auteurs.value = resAuteurs.data
  } catch (error) {
    console.error('Erreur :', error)
  } finally {
    loading.value = false
  }
})

const ouvragesEnrichis = computed(() => {
  return ouvrages.value.map((ouvrage) => {
    const auteur = auteurs.value.find((a) => a.id === ouvrage.auteur_id)
    return {
      ...ouvrage,
      auteurNom: auteur ? `${auteur.prenom} ${auteur.nom}` : 'Auteur inconnu',
    }
  })
})

const filteredOuvrages = computed(() => {
  if (!recherche.value) return ouvragesEnrichis.value

  const terme = recherche.value.toLowerCase()
  return ouvragesEnrichis.value.filter(
    (ouvrage) =>
      (ouvrage.titre && ouvrage.titre.toLowerCase().includes(terme)) ||
      (ouvrage.auteurNom && ouvrage.auteurNom.toLowerCase().includes(terme)),
  )
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

    <div v-if="loading" class="loading">Chargement des ouvrages...</div>

    <div v-else class="results-container">
      <div v-if="filteredOuvrages.length > 0" class="events">
        <BookCard
          v-for="ouvrage in filteredOuvrages"
          :key="ouvrage.id"
          :ouvrage="ouvrage"
          :auteurNom="ouvrage.auteurNom"
        />
      </div>
      <div v-else class="no-results">
        <p>
          Aucun livre ne correspond à "<strong>{{ recherche }}</strong
          >"
        </p>
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

.no-results,
.loading {
  margin-top: 50px;
  font-size: 1.2rem;
  color: #828282;
}

.no-results strong {
  color: #2c3e50;
}
</style>
