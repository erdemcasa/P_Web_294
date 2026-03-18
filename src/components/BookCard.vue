<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { authorService } from '@/services/authorService'
import { userService } from '@/services/userService'
import { commentService } from '@/services/commentService'

const props = defineProps({
  ouvrage: { type: Object, required: true },
})

const router = useRouter()
const auteurs = ref([])
const users = ref([])
const commentaires = ref([])

onMounted(async () => {
  try {
    const [dataAuteurs, dataUsers, dataComms] = await Promise.all([
      authorService.getAll(),
      userService.getAll(),
      commentService.getByBookId(props.ouvrage.id)
    ])
    
    auteurs.value = dataAuteurs
    users.value = dataUsers
    commentaires.value = dataComms
  } catch (error) {
    console.error('Erreur Card:', error)
  }
})

const moyenne = computed(() => {
  if (!commentaires.value.length) return 0
  const somme = commentaires.value.reduce((acc, c) => acc + c.note, 0)
  return (somme / commentaires.value.length).toFixed(1)
})

const nbEtoiles = computed(() => Math.round(Number(moyenne.value)))

const getAuthorName = (id) => {
  const a = auteurs.value.find(item => item.id == id)
  return a ? `${a.prenom} ${a.nom}` : 'Chargement...'
}

const getUserPseudo = (id) => {
  const u = users.value.find(item => item.id == id || item.id == `u${id}`)
  return u ? u.pseudo : 'Anonyme'
}

const goTo = (path) => router.push(path)
</script>

<template>
  <div class="event-card" @click="goTo(`/book/${ouvrage.id}`)">
    <img :src="ouvrage.image_couverture" alt="Couverture" class="cover-img" loading="lazy" />

    <div class="info">
      <span class="category">{{ ouvrage.categorie }}</span>
      <h3 class="title">{{ ouvrage.titre }}</h3>

      <p class="author">
        <span class="author-link" @click.stop="goTo(`/auteur/${ouvrage.auteur_id}`)">
          {{ getAuthorName(ouvrage.auteur_id) }}
        </span>
      </p>

      <p class="posted-by">
        Par : <span class="user-link" @click.stop="goTo(`/profile/${ouvrage.user_id}`)">
          {{ getUserPseudo(ouvrage.user_id) }}
        </span>
      </p>

      <div class="rating">
        <div class="stars-container">
          <span v-for="n in 5" :key="n" class="star">
            {{ n <= nbEtoiles ? '⭐' : '☆' }}
          </span>
          <span class="note-text">
             ({{ moyenne > 0 ? moyenne + '/5' : 'Aucun avis' }})
          </span>
        </div>
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
.author-link {
  color: #2c3e50;
  font-weight: bold;
  cursor: pointer;
}

.author-link:hover {
  color: #42b983;
  text-decoration: underline;
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

.rating {
  margin-top: 8px;
  border-top: 1px solid #eee;
  padding-top: 5px;
}

.star {
  color: #f1c40f;
  font-size: 1rem;
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