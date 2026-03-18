<script setup>
import BookCard from '@/components/BookCard.vue'
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const ouvrages = ref([])
const recherche = ref('')
const categorieSelectionnee = ref('')

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

    const terme = recherche.value.toLowerCase().trim()
    const titre = (ouvrage.titre || '').toLowerCase()


    const matchTexte = terme === '' || titre.includes(terme)


    const matchCategorie = categorieSelectionnee.value === '' ||
                           ouvrage.categorie === categorieSelectionnee.value

    return matchTexte && matchCategorie
  })
})
</script>

<template>
  <div class="browse">
    <h1>Parcourir la bibliothèque</h1>

    <div class="filter-toolbar">
      <div class="search-box">
        <input
          v-model="recherche"
          type="text"
          placeholder="Titre du livre..."
          class="search-input"
        />
      </div>

      <div class="category-box">
        <select v-model="categorieSelectionnee" class="category-select">
          <option value="">Toutes les catégories</option>
          <option value="bande dessinée">Bande dessinée</option>
          <option value="manga">Manga</option>
          <option value="roman">Roman</option>
          <option value="livre">Livre</option>
        </select>
      </div>
    </div>

    <div class="results-area">
      <div v-if="filteredOuvrages.length > 0" class="books-grid">
        <BookCard
          v-for="ouvrage in filteredOuvrages"
          :key="ouvrage.id"
          :ouvrage="ouvrage"
        />
      </div>

      <div v-else-if="ouvrages.length > 0" class="empty-state">
        <p>Aucun livre ne correspond à vos critères de recherche.</p>
        <button @click="recherche = ''; categorieSelectionnee = ''" class="btn-clear">
          Effacer les filtres
        </button>
      </div>

      <div v-else class="loading-state">
        Chargement des livres en cours...
      </div>
    </div>
  </div>
</template>

<style scoped>
.browse { padding: 30px; max-width: 1200px; margin: 0 auto; }
h1 { color: #2c3e50; margin-bottom: 40px; text-align: center; }

.filter-toolbar {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 50px;
  flex-wrap: wrap;
}

.search-input, .category-select {
  padding: 12px 20px;
  border: 1px solid #ddd;
  border-radius: 50px;
  font-size: 1rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  outline: none;
  transition: border-color 0.3s;
}

.search-input { width: 350px; }
.search-input:focus, .category-select:focus { border-color: #42b983; }

.category-select { cursor: pointer; background-color: white; }

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 30px;
  justify-items: center;
}

.empty-state {
  text-align: center;
  padding: 50px;
  color: #7f8c8d;
  background: #f9f9f9;
  border-radius: 12px;
}

.btn-clear {
  margin-top: 20px;
  background: #42b983;
  color: white;
  border: none;
  padding: 10px 25px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
}

.loading-state { text-align: center; font-style: italic; color: #95a5a6; }
</style>
