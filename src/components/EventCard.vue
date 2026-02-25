<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

defineProps({
  ouvrage: {
    type: Object,
    required: true,
  },
})

const auteurs = ref([])
const users = ref([])

onMounted(() => {
  axios
    .get('http://localhost:3000/auteurs')
    .then((response) => {
      auteurs.value = response.data
    })
    .catch((error) => {
      console.error('Erreur lors de la recuoeratiuon des auteurs :', error)
    })

  axios
    .get('http://localhost:3000/utilisateurs')
    .then((response) => {
      users.value = response.data
    })
    .catch((error) => {
      console.error('Erreur lors de la recuperation des utilisateurs :', error)
    })
})

function ReturnAuthorById(id) {
  const auteur = auteurs.value.find((item) => item.id == id)
  return auteur ? auteur.nom : 'Auteur inconnu'
}

function ReturnUserById(id) {
  const utilisateur = users.value.find((item) => item.id == id)
  return utilisateur ? utilisateur.nom : 'Utilisateur inconnu'
}
</script>

<template>
  <div class="event-card" @click="$router.push(`/book/${ouvrage.id}`)">
    <img :src="ouvrage.image_couverture" alt="Couverture" class="cover-img" />

    <div class="info">
      <span class="category">{{ ouvrage.categorie }}</span>

      <h3 class="title">{{ ouvrage.titre }}</h3>

      <p class="author">
        Par : <strong>{{ ReturnAuthorById(ouvrage.auteur_id) }}</strong>
      </p>

      <p class="posted-by">
        Posté par :
        <span class="user-link" @click.stop="$router.push(`/profile/${ouvrage.user_id}`)">
          {{ ReturnUserById(ouvrage.user_id) }}
        </span>
      </p>

      <div class="rating">
        <span v-for="star in ouvrage.moyenne_appreciations" :key="star">⭐</span>
        <span class="note-text">({{ ouvrage.moyenne_appreciations }}/5)</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.event-card {
  padding: 0;
  width: 220px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
  transition: all 0.2s ease;
  overflow: hidden;
  background: white;
  border-radius: 8px;
}

.cover-img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
}

.info {
  padding: 12px;
}

.category {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #42b983;
  font-weight: bold;
}

.title {
  margin: 5px 0;
  font-size: 1.1rem;
  color: #2c3e50;
}

.author {
  font-size: 0.9rem;
  margin: 2px 0;
  color: #555;
}

.posted-by {
  font-size: 0.85rem;
  margin: 5px 0;
  color: #777;
}

.user-link {
  color: #42b983;
  text-decoration: underline;
  cursor: pointer;
  font-weight: bold;
}

.user-link:hover {
  color: #33a06f;
}

.rating {
  margin-top: 8px;
  border-top: 1px solid #eee;
  padding-top: 5px;
}

.note-text {
  font-size: 0.8rem;
  color: #999;
  margin-left: 5px;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}
</style>
