<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { bookService } from '@/services/bookService'
import { commentService } from '@/services/commentService'

const route = useRoute()
const ouvrage = ref(null)
const commentaires = ref([])
const loading = ref(true)
const bookId = route.params.id

const fetchData = async () => {
  try {
    loading.value = true
    const [dataBook, dataComments] = await Promise.all([
      bookService.getById(bookId),
      commentService.getAll()
    ])

    ouvrage.value = dataBook
    commentaires.value = dataComments.filter(
      c => String(c.ouvrage_id) === String(bookId)
    )
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)

const moyenneCalculee = computed(() => {
  if (commentaires.value.length === 0) return 0
  const somme = commentaires.value.reduce((acc, c) => acc + c.note, 0)
  return (somme / commentaires.value.length).toFixed(1)
})

const totalAvis = computed(() => commentaires.value.length)

const formatPath = (path) => {
  if (!path) return ''
  if (path.startsWith('http')) return path
  const cleanPath = path.replace(/^public\//, '')
  return cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`
}

const handleImageError = (event) => {
  event.target.src = 'https://placehold.co/380x500?text=Image+introuvable'
}
</script>

<template>
  <div v-if="loading" class="loading-state">
    <div class="spinner"></div>
    <p>Chargement de l'ouvrage...</p>
  </div>

  <div v-else-if="ouvrage" class="page-container">
    <header class="header">
      <h1>{{ ouvrage.titre }}</h1>
      <span class="badge-category">{{ ouvrage.categorie }}</span>
    </header>

    <div class="main-content">
      <div class="col-visual">
        <div class="main-image-wrapper">
          <img
            :src="formatPath(ouvrage.image_couverture)"
            :alt="ouvrage.titre"
            class="main-img"
            @error="handleImageError"
          />
        </div>
      </div>

      <div class="col-details">
        <section class="info-block">
          <div class="block-header">
            <h2>Résumé</h2>
          </div>
          <div class="resume-content">
            <p>{{ ouvrage.resume || 'Aucun résumé disponible pour cet ouvrage.' }}</p>
          </div>
        </section>

        <section class="info-block">
          <div class="specs-table">
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
              <span class="label">Note moyenne ({{ totalAvis }} avis)</span>
              <div class="stars">
                <span class="star-icon">★</span>
                <span class="average-note">{{ moyenneCalculee }}</span>
                <span class="max-note">/5</span>
              </div>
            </div>
          </div>
        </section>

        <section class="info-block excerpt-section">
          <div class="block-header">
            <h2>Extrait de l'ouvrage</h2>
          </div>

          <div v-if="ouvrage.extrait" class="excerpt-box">
            <p>Un extrait au format PDF est disponible pour ce livre.</p>
            <a
              :href="formatPath(ouvrage.extrait)"
              :download="ouvrage.titre + '_extrait.pdf'"
              class="btn-download"
            >
              Télécharger l'extrait
            </a>
          </div>

          <div v-else class="no-excerpt">
            <p>Aucun extrait n'est disponible pour cet ouvrage.</p>
          </div>
        </section>

        <section class="info-block comments-list">
          <div class="block-header">
            <h2>Commentaires clients</h2>
          </div>
          <div v-if="commentaires.length > 0">
             <div v-for="com in commentaires" :key="com.id" class="comment-item">
                <div class="com-meta">
                  <strong>{{ com.utilisateur_pseudo }}</strong>
                  <span class="com-note">{{ com.note }}/5</span>
                </div>
                <p class="com-text">{{ com.texte }}</p>
             </div>
          </div>
          <div v-else class="no-comments">Aucun commentaire pour le moment.</div>
        </section>

      </div>
    </div>
  </div>

  <div v-else class="error-state">
    <p>Le livre demandé est introuvable.</p>
    <button @click="$router.push('/')" class="btn-back">Retour à l'accueil</button>
  </div>
</template>

<style scoped>
.comment-item {
  border-bottom: 1px solid #eee;
  padding: 15px 0;
}
.com-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}
.com-note {
  color: #f39c12;
  font-weight: bold;
}
.com-text {
  font-size: 0.95rem;
  color: #555;
  margin: 0;
}
.no-comments {
  color: #999;
  font-style: italic;
}

.page-container { max-width: 1100px; margin: 40px auto; padding: 0 20px; }
.header { margin-bottom: 30px; border-bottom: 2px solid #eee; padding-bottom: 15px; }
.badge-category { background: #42b983; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: bold; text-transform: uppercase; }
.main-content { display: flex; gap: 50px; }
.col-visual { flex: 0 0 350px; }
.main-img { width: 100%; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); }
.col-details { flex: 1; }
.info-block { margin-bottom: 35px; }
.block-header h2 { font-size: 1.4rem; color: #2c3e50; margin-bottom: 15px; }
.resume-content { background: #fdfdfd; border-left: 4px solid #42b983; padding: 20px; line-height: 1.7; color: #444; border-radius: 4px; }
.spec-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f0f0f0; }
.spec-row .label { color: #7f8c8d; }
.spec-row .value { font-weight: 600; color: #2c3e50; }
.excerpt-box { background: #eef9f5; padding: 20px; border-radius: 8px; text-align: center; }
.btn-download { display: inline-block; margin-top: 10px; background-color: #2c3e50; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; transition: transform 0.2s; }
.btn-download:hover { transform: scale(1.02); }
.loading-state { text-align: center; padding: 100px; }
.spinner { border: 4px solid #f3f3f3; border-top: 4px solid #42b983; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto 20px; }
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
</style>
