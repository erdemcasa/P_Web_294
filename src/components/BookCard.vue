<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  ouvrage: { type: Object, required: true },
  auteurs: { type: Array, default: () => [] },
  users: { type: Array, default: () => [] }
})


function ReturnAuthorById(id) {
  const auteur = props.auteurs.find((item) => item.id == id)
  return auteur ? auteur.nom : 'Auteur inconnu'
}

function ReturnUserById(id) {
  const utilisateur = props.users.find((item) => item.id == id)
  console.log(id)
  return utilisateur ? utilisateur.pseudo : 'Utilisateur inconnu' + id
}


</script>

<template>
  <div class="event-card" @click="$router.push(`/ouvrages/${ouvrage.id}`)">
    <img :src="ouvrage.image_couverture" alt="Couverture" class="cover-img" />

    <div class="info">
      <span class="category">{{ ouvrage.categorie }}</span>
      <h3 class="title">{{ ouvrage.titre }}</h3>

      <p class="author">
        <span class="author-link" @click.stop="$router.push(`/auteurs/${ouvrage.auteur_id}`)">
          {{ ReturnAuthorById(ouvrage.auteur_id) }}
        </span>
      </p>

      <p class="posted-by">
        Posté par :
        <span class="user-link" @click.stop="$router.push(`/profile/${ouvrage.user_id}`)">
          {{ ReturnUserById(ouvrage.user_id) }}
        </span>
      </p>

      <div class="rating">
        <span v-for="n in Math.round(ouvrage.moyenne_appreciations)" :key="n">⭐</span>
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
.cover-img { width: 100%; height: 250px; object-fit: cover; display: block; }
.info { padding: 12px; }
.category { font-size: 0.75rem; text-transform: uppercase; color: #42b983; font-weight: bold; }
.title { margin: 5px 0; font-size: 1.1rem; color: #2c3e50; }
.author { font-size: 0.9rem; margin: 2px 0; color: #555; }
.author-link { color: #2c3e50; font-weight: bold; cursor: pointer; }
.author-link:hover { color: #42b983; text-decoration: underline; }
.posted-by { font-size: 0.85rem; margin: 5px 0; color: #777; }
.user-link { color: #42b983; text-decoration: underline; cursor: pointer; font-weight: bold; }
.rating { margin-top: 8px; border-top: 1px solid #eee; padding-top: 5px; }
.note-text { font-size: 0.8rem; color: #999; margin-left: 5px; }
.event-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15); }
</style>
