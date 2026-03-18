<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { bookService } from '@/services/bookService'

const route = useRoute()
const ouvrage = ref(null)
const loading = ref(true)
const bookId = route.params.id

const fetchOuvrage = async () => {
  try {
    loading.value = true
    // On récupère directement le bon livre par son ID
    const data = await bookService.getById(bookId)
    ouvrage.value = data
  } catch (error) {
    console.error('Erreur lors de la récupération du livre:', error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchOuvrage)

const formatImageUrl = (path) => {
  if (!path) return 'https://placehold.co/380x500?text=Pas+d+image'
  if (path.startsWith('http')) return path
  // Si le chemin commence par Couvertures/, on s'assure qu'il y a un / devant
  return path.startsWith('/') ? path : `/${path}`
}

const handleImageError = (event) => {
  // Changement de fournisseur de placeholder (plus stable)
  event.target.src = 'https://placehold.co/380x500?text=Image+introuvable'
}
</script>

<template>
  <div v-if="loading" class="loading">Chargement du livre...</div>

  <div v-else-if="ouvrage" class="page-container">
    <header class="header">
      <h1>{{ ouvrage.titre }}</h1>
    </header>

    <div class="main-content">
      <div class="col-visual">
        <div class="main-image-wrapper">
          <img :src="formatImageUrl(ouvrage.image_couverture)" alt="Couverture" class="main-img"
            @error="handleImageError" />
        </div>
      </div>

      <div class="col-details">
        <section class="info-block">
          <div class="block-header">
            <h2>Résumé</h2>
          </div>
          <div class="resume-content">
            <p>{{ ouvrage.resume || 'Aucun résumé disponible.' }}</p>
          </div>
        </section>

        <section class="info-block">
          <div class="specs-table">
            <div class="spec-row">
              <span class="label">Date de parution</span>
              <span class="value">{{ ouvrage.annee_edition }}</span>
            </div>
            <div class="spec-row">
              <span class="label">Editeur</span>
              <span class="value">{{ ouvrage.editeur }}</span>
            </div>
            <div class="spec-row">
              <span class="label">Nombre de pages</span>
              <span class="value">{{ ouvrage.nombre_pages }}</span>
            </div>
            <div class="spec-row">
              <span class="label">Note</span>
              <div class="stars">
                <span class="star-icon">★</span>
                <span class="average-note">{{ ouvrage.moyenne_appreciations }}</span>
                <span class="max-note">/5</span>
              </div>
            </div>
          </div>
        </section>

        <section v-if="ouvrage.extrait" class="info-block excerpt-container">
          <div class="block-header">
            <a :href="ouvrage.extrait" :download="ouvrage.titre + '-extrait.pdf'" class="btn-download">
              Télécharger l'extrait
            </a>
          </div>

        </section>

      </div>
    </div>
  </div>

  <div v-else class="error">Livre introuvable.</div>
</template>

<style scoped>

.excerpt-container {
  margin-top: 30px;
}

.btn-download {
  background-color: #2c3e50;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: opacity 0.2s;
}

.btn-download:hover {
  opacity: 0.8;
}

.pdf-viewer {
  margin-top: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}
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

.main-content {
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

.col-visual {
  flex: 0 0 380px;
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

.col-details {
  flex: 1;
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
  color: #f39c12;
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
