<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/services/api'

const route = useRoute()
const ouvrage = ref(null)
const auteur = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const resOuvrage = await api.get(`/ouvrages/${route.params.id}`)
    ouvrage.value = resOuvrage.data

    const resAuteur = await api.get(`/auteurs/${ouvrage.value.auteur_id}`)
    auteur.value = resAuteur.data
  } catch (error) {
    console.error('Erreur lors du chargement des données :', error)
  } finally {
    loading.value = false
  }
})

const imagePath = computed(() => {
  if (!ouvrage.value?.image_couverture) return ''
  return ouvrage.value.image_couverture.replace('public/', '/')
})
</script>

<template>
  <div v-if="loading" class="state-msg">
    <div class="spinner"></div>
    <p>Chargement de l'ouvrage...</p>
  </div>

  <div v-else-if="ouvrage" class="page-container">
    <header class="header">
      <h1>{{ ouvrage.titre }}</h1>
      <p class="author-sub" v-if="auteur">
        Par
        <RouterLink :to="`/auteurs/${auteur.id}`">{{ auteur.prenom }} {{ auteur.nom }}</RouterLink>
      </p>
    </header>

    <div class="main-content">
      <div class="col-visual">
        <div class="main-image-wrapper">
          <img :src="imagePath" :alt="ouvrage.titre" class="main-img" />
        </div>
      </div>

      <div class="col-details">
        <section class="info-block">
          <div class="block-header">
            <h2>Résumé</h2>
          </div>
          <div class="resume-content">
            <p>{{ ouvrage.resume }}</p>
          </div>
        </section>

        <section class="info-block">
          <div class="specs-table">
            <div class="spec-row">
              <span class="label">Catégorie</span>
              <span class="value text-capitalize">{{ ouvrage.categorie }}</span>
            </div>
            <div class="spec-row">
              <span class="label">Date de parution</span>
              <span class="value">{{ ouvrage.annee_edition }}</span>
            </div>
            <div class="spec-row">
              <span class="label">Éditeur</span>
              <span class="value">{{ ouvrage.editeur }}</span>
            </div>
            <div class="spec-row">
              <span class="label">Nombre de pages</span>
              <span class="value">{{ ouvrage.nombre_pages }} pages</span>
            </div>
            <div class="spec-row">
              <span class="label">Note moyenne</span>
              <div class="stars">
                <span class="star-icon">★</span>
                <span class="average-note">{{ ouvrage.moyenne_appreciations }}</span>
                <span class="max-note">/5</span>
              </div>
            </div>
          </div>
        </section>

        <div class="actions-footer">
          <button class="btn-read" @click="window.open(ouvrage.extrait, '_blank')">
            Lire un extrait (PDF)
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="state-msg error">
    <p>Ouvrage introuvable.</p>
    <button @click="$router.push('/parcourir')">Retour au catalogue</button>
  </div>
</template>

<style scoped>

.page-container {
  max-width: 1100px;
  margin: 40px auto;
  padding: 0 20px;
}

.author-sub {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 20px;
}

.author-sub a {
  color: #42b983;
  text-decoration: none;
  font-weight: bold;
}

.main-content {
  display: flex;
  gap: 60px;
  margin-top: 30px;
}

.col-visual {
  flex: 0 0 350px;
}

.main-img {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.resume-content {
  background-color: #fcfcfc;
  padding: 20px;
  border-left: 4px solid #42b983;
  line-height: 1.7;
  font-size: 1.05rem;
}

.spec-row {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.label {
  color: #888;
}
.value {
  font-weight: 600;
}
.text-capitalize {
  text-transform: capitalize;
}

.star-icon {
  color: #f39c12;
  margin-right: 5px;
}

.btn-read {
  margin-top: 30px;
  background-color: #2c3e50;
  color: white;
  padding: 15px 25px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
}

.btn-read:hover {
  background-color: #42b983;
}

.state-msg {
  text-align: center;
  padding: 100px;
}
.error {
  color: #e74c3c;
}
</style>
