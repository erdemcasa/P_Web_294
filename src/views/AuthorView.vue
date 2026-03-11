<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import BookCard from '../components/BookCard.vue'

const route = useRoute()
const auteurId = route.params.id

const auteur = ref(null)
const ouvragesAuteur = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const resAuteur = await axios.get(`http://localhost:3000/auteurs/${auteurId}`)
    auteur.value = resAuteur.data

    const resOuvrages = await axios.get(`http://localhost:3000/ouvrages?auteur_id=${auteurId}`)
    ouvragesAuteur.value = resOuvrages.data
  } catch (error) {
    console.error("Erreur lors du chargement :", error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div v-if="auteur" class="author-container">
    <header class="author-profile">

      <div class="author-info">
        <h1>{{ auteur.prenom }} {{ auteur.nom }}</h1>

        <div class="bio-container">
          <p class="nationality">Nationalité : <strong>{{ auteur.nationalite }}</strong></p>
          <p class="bio-demo">
            Cet auteur a actuellement <strong>{{ ouvragesAuteur.length }}</strong>
            ouvrage(s) répertorié(s) sur notre plateforme.
            Découvrez sa bibliographie complète ci-dessous.
          </p>
        </div>
      </div>
    </header>

    <hr class="separator" />

    <section class="works-section">
      <h2>Ouvrages de {{ auteur.nom }} (présents sur le site)</h2>

      <div v-if="ouvragesAuteur.length > 0" class="books-grid">
        <BookCard v-for="livre in ouvragesAuteur" :key="livre.id" :ouvrage="livre" :auteurs="[auteur]" :users="[]" />
      </div>

      <div v-else class="no-data-box">
        <p>Aucun ouvrage n'a encore été posté pour cet auteur.</p>
      </div>
    </section>
  </div>

  <div v-else-if="loading" class="state-msg">
    <div class="spinner"></div>
    <p>Chargement du profil auteur...</p>
  </div>

  <div v-else class="state-msg error">
    <p>Auteur non trouvé (ID: {{ auteurId }}). Vérifiez votre base de données.</p>
  </div>
</template>

<style scoped>
.author-container {
  max-width: 1100px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

/* --- Style du Header --- */
.author-profile {
  display: flex;
  align-items: center;
  gap: 40px;
  background: #ffffff;
  padding: 40px;
  border-radius: 16px;
  border: 1px solid #eaeaea;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.avatar-placeholder {
  flex-shrink: 0;
  width: 110px;
  height: 110px;
  background: linear-gradient(135deg, #42b983, #35495e);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  font-weight: bold;
  border-radius: 50%;
  text-transform: uppercase;
  box-shadow: 0 4px 10px rgba(66, 185, 131, 0.3);
}

.author-info h1 {
  margin: 0 0 10px 0;
  font-size: 2.4rem;
  color: #2c3e50;
  letter-spacing: -0.5px;
}

/* Limitation de la largeur du texte de présentation */
.bio-container {
  max-width: 600px;
  line-height: 1.6;
}

.nationality {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 10px;
}

.bio-demo {
  color: #5f676e;
  font-size: 1rem;
  margin: 0;
}

.separator {
  margin: 50px 0;
  border: 0;
  border-top: 2px solid #f4f4f4;
}

/* --- Grille des Livres --- */
.works-section h2 {
  font-size: 1.6rem;
  color: #2c3e50;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.works-section h2::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 24px;
  background-color: #42b983;
  border-radius: 3px;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 30px;
}

/* --- Messages d'état --- */
.state-msg {
  text-align: center;
  margin: 100px auto;
  color: #888;
}

.error {
  color: #e74c3c;
  font-weight: bold;
}

.no-data-box {
  padding: 40px;
  background: #f9f9f9;
  border-radius: 8px;
  text-align: center;
  border: 1px dashed #ccc;
}
</style>
