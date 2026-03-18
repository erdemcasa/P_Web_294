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
      commentService.getAll() 
    ])

    auteurs.value = dataAuteurs
    users.value = dataUsers
    commentaires.value = dataComms
  } catch (error) {
    console.error('Erreur Card:', error)
  }
})

const avisOuvrage = computed(() =>
  commentaires.value.filter(c => String(c.ouvrage_id) === String(props.ouvrage.id))
)

const moyenneDynamique = computed(() => {
  if (avisOuvrage.value.length === 0) return 0
  const somme = avisOuvrage.value.reduce((acc, c) => acc + c.note, 0)
  return (somme / avisOuvrage.value.length).toFixed(1)
})

const nbEtoiles = computed(() => Math.round(Number(moyenneDynamique.value)))
const totalAvis = computed(() => avisOuvrage.value.length)

const formatPath = (path) => {
  if (!path) return 'https://placehold.co/200x300?text=Pas+d+image'
  if (path.startsWith('http')) return path
  return path.replace(/^public\//, '/')
}

const getAuthorName = (id) => {
  const a = auteurs.value.find(item => String(item.id) === String(id))
  return a ? `${a.prenom} ${a.nom}` : 'Auteur inconnu'
}

const getUserPseudo = (id) => {
  const u = users.value.find(item => String(item.id) === String(id) || String(item.id) === `u${id}`)
  return u ? u.pseudo : 'Anonyme'
}

const goTo = (path) => router.push(path)
</script>

<template>
  <div class="event-card" @click="goTo(`/book/${ouvrage.id}`)">
    <img :src="formatPath(ouvrage.image_couverture)" alt="Couverture" class="cover-img" loading="lazy" />

    <div class="info">
      <span class="category">{{ ouvrage.categorie }}</span>
      <h3 class="title">{{ ouvrage.titre }}</h3>

      <p class="author">
        <span class="author-link" @click.stop="goTo(`/auteur/${ouvrage.auteur_id}`)">
          {{ getAuthorName(ouvrage.auteur_id) }}
        </span>
      </p>

      <p class="posted-by">
        Par : <span class="user-link">{{ getUserPseudo(ouvrage.user_id) }}</span>
      </p>

      <div class="rating">
        <div class="stars-container">
          <span v-for="n in 5" :key="n" class="star">
            {{ n <= nbEtoiles ? '⭐' : '☆' }}
          </span>
          <span class="note-text">
            <strong>{{ moyenneDynamique > 0 ? moyenneDynamique + '/5' : 'Aucun avis' }}</strong>
            <span class="count">({{ totalAvis }} {{ totalAvis > 1 ? 'avis' : 'avis' }})</span>
          </span>
        </div>
      </div>

      <div v-if="avisOuvrage.length > 0" class="last-comm">
        "{{ avisOuvrage[0].texte.substring(0, 40) }}..."
      </div>
    </div>
  </div>
</template>

<style scoped>
.event-card {
  width: 240px;
  cursor: pointer;
  border: 1px solid #e2e8f0;
  margin-bottom: 20px;
  transition: transform 0.2s, box-shadow 0.2s;
  overflow: hidden;
  background: white;
  border-radius: 12px;
}

.cover-img {
  width: 100%;
  height: 280px;
  object-fit: cover;
}

.info {
  padding: 15px;
}

.category {
  font-size: 0.7rem;
  text-transform: uppercase;
  color: #42b983;
  font-weight: 800;
  letter-spacing: 0.5px;
}

.title {
  margin: 5px 0;
  font-size: 1.1rem;
  color: #1e293b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.author {
  font-size: 0.9rem;
  color: #64748b;
}

.author-link {
  font-weight: 600;
  color: #334155;
}

.author-link:hover {
  color: #42b983;
}

.posted-by {
  font-size: 0.8rem;
  color: #94a3b8;
  margin-top: 4px;
}

.rating {
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid #f1f5f9;
}

.star {
  color: #f1c40f;
  font-size: 0.9rem;
}

.note-text {
  font-size: 0.85rem;
  margin-left: 8px;
  color: #1e293b;
}

.count {
  color: #94a3b8;
  font-weight: normal;
  margin-left: 4px;
}

.last-comm {
  font-size: 0.75rem;
  font-style: italic;
  color: #64748b;
  margin-top: 8px;
  background: #f8fafc;
  padding: 5px;
  border-radius: 4px;
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}
</style>
