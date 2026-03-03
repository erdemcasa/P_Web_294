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
  <div v-if="ouvrageSelectionne" class="page-container">
    <header class="header">
      <h1>{{ ouvrageSelectionne.titre }}</h1>
    </header>

    <div class="main-content">
      <div class="col-visual">
        <div class="main-image-wrapper">
          <img :src="`/${ouvrageSelectionne.image_couverture}`" alt="Couverture" class="main-img" />
        </div>
      </div>

      <div class="col-details">
        <section class="info-block">
          <div class="block-header">
            <h2>Résumé</h2>
            <a href="#" class="view-all">Voir tout</a>
          </div>
          <div class="resume-content">
            <p>{{ ouvrageSelectionne.resume }}</p>
          </div>
        </section>

        <section class="info-block">
          <div class="block-header">
            <h2>Caractéristiques</h2>
            <a href="#" class="view-all">Voir tout</a>
          </div>
          <div class="specs-table">
            <div class="spec-row">
              <span class="label">Date de parution</span>
              <span class="value">{{ ouvrageSelectionne.annee_edition }}</span>
            </div>
            <div class="spec-row">
              <span class="label">Editeur</span>
              <span class="value"
                ><a href="#">{{ ouvrageSelectionne.editeur }}</a></span
              >
            </div>
            <div class="spec-row">
              <span class="label">Nombre de pages</span>
              <span class="value">{{ ouvrageSelectionne.nombre_pages }}</span>
            </div>
            <div class="spec-row">
              <span class="label">Note</span>
              <div class="stars">
                <span class="star-icon">★</span>
                <span class="average-note">{{ ouvrageSelectionne.moyenne_appreciations }}</span>
                <span class="max-note">/5</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>

  <div v-else class="loading">Chargement...</div>
</template>
<style scoped>
.page-container {
  max-width: 1200px;
  margin: 30px auto;
  padding: 0 20px;
  font-family: sans-serif;
}

.header h1 {
  font-size: 2.2rem;
  margin-bottom: 23px;
}

.qa-link {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 30px;
}

/* LE LAYOUT PRINCIPAL */
.main-content {
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

/* --- COLONNE GAUCHE (IMAGE) --- */
.col-visual {
  flex: 0 0 380px; /* Largeur fixe pour l'image à gauche */
}

.main-img {
  width: 100%;
  height: auto;
  border-radius: 4px;
  display: block;
}

.thumbs {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.thumb {
  width: 65px;
  height: 85px;
  object-fit: cover;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.thumb.active {
  border: 2px solid #f39c12;
}

/* --- COLONNE ACTIONS --- */
.col-actions {
  flex: 0 0 100px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 50px;
}

.btn-action {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.85rem;
  color: #555;
  gap: 8px;
}

.icon-circle {
  width: 45px;
  height: 45px;
  border: 1px solid #ccc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

/* --- COLONNE DROITE (TEXTE) --- */
.col-details {
  flex: 1; /* Prend tout l'espace restant */
}

.block-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 15px;
}

.block-header h2 {
  font-size: 1.25rem;
  margin: 0;
}

.view-all {
  font-size: 0.85rem;
  color: #000;
  text-decoration: underline;
  font-weight: bold;
}

.resume-content {
  background-color: #f9f9f9;
  padding: 25px;
  line-height: 1.6;
  color: #333;
  margin-bottom: 30px;
}

.specs-table {
  width: 100%;
}

.spec-row {
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.spec-row .label {
  width: 200px;
  color: #666;
}

.spec-row .value {
  font-weight: bold;
}

.spec-row a {
  color: #2980b9;
  text-decoration: underline;
}
/* Style pour les appréciations */
.rating-summary {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  padding-bottom: 10px;
}

.stars {
  display: flex;
  align-items: baseline;
  gap: 4px;
}
.rating-summary .label {
  display: flex;
  align-items: center;
}
.star-icon {
  color: #f39c12; /* Orange pour l'étoile */
  font-size: 1.4rem;
}

.average-note {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

.max-note {
  color: #999;
  font-size: 0.9rem;
}
</style>
