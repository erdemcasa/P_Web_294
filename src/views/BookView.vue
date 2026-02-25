<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const ouvrages = ref([])

const bookId = route.params.id

onMounted(() => {
  axios
    .get('http://localhost:3000/ouvrages')
    .then((response) => {
      ouvrages.value = response.data
    })
    .catch((error) => {
      console.error('Erreurs lors de la recetupration :', error)
    })
})

const ouvrageSelectionne = computed(() => {
  return ouvrages.value.find((item) => item.id == bookId)
})
</script>

<template>
  <div class="show-book">
    <div v-if="ouvrageSelectionne" class="book-details">
      <h1>{{ ouvrageSelectionne.titre }}</h1>
      <img :src="`/${ouvrageSelectionne.image_couverture}`" alt="Couverture" />
      <p>Catégorie : {{ ouvrageSelectionne.categorie }}</p>
      <p>Note : {{ ouvrageSelectionne.moyenne_appreciations }}/5</p>
    </div>

    <div v-else class="loading">Chargement de l'ouvrage {{ bookId }}...</div>
  </div>
</template>

<style scoped>
.book-details img {
  max-width: 300px;
  border-radius: 8px;
}
.loading {
  font-style: italic;
  color: gray;
}
</style>
