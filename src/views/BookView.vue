<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { bookService } from '@/services/bookService'
import { commentService } from '@/services/commentService'
import { authorService } from '@/services/authorService'
import { jsPDF } from 'jspdf'

const newComment = ref({
  utilisateur_pseudo: '',
  note: 0,
  texte: ''
})
const submitLoading = ref(false)
const submitSuccess = ref(false)
const hoverNote = ref(0)

const route = useRoute()
const ouvrage = ref(null)
const commentaires = ref([])
const loading = ref(true)
const bookId = route.params.id
const auteurs = ref([])

const submitComment = async () => {
  if (!newComment.value.utilisateur_pseudo || !newComment.value.texte || newComment.value.note === 0) {
    alert('Merci de remplir tous les champs et de donner une note.')
    return
  }

  submitLoading.value = true
  try {
    const commentData = {
      ouvrage_id: String(bookId),
      utilisateur_pseudo: newComment.value.utilisateur_pseudo,
      note: newComment.value.note,
      texte: newComment.value.texte,
      date: new Date().toISOString().split('T')[0]
    }

    const added = await commentService.add(commentData)
    commentaires.value.push(added)

    newComment.value = { utilisateur_pseudo: '', note: 0, texte: '' }
    hoverNote.value = 0
    submitSuccess.value = true
    setTimeout(() => submitSuccess.value = false, 3000)
  } catch (err) {
    console.error('Erreur ajout commentaire:', err)
  } finally {
    submitLoading.value = false
  }
}

const fetchData = async () => {
  try {
    loading.value = true
    const [dataBook, dataComments, dataAuteurs] = await Promise.all([
      bookService.getById(bookId),
      commentService.getAll(),
      authorService.getAll()
    ])

    ouvrage.value = dataBook
    auteurs.value = dataAuteurs

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

const getAuthorName = (id) => {
  const a = auteurs.value.find(item => String(item.id) === String(id))
  return a ? `${a.prenom} ${a.nom}` : 'Auteur inconnu'
}

const downloadExtrait = () => {
  const texte = ouvrage.value.extrait_texte
  const titre = ouvrage.value.titre
  const auteur = getAuthorName(ouvrage.value.auteur_id)

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  })

  const marginLeft = 25
  const marginRight = 25
  const marginTop = 30
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const maxWidth = pageWidth - marginLeft - marginRight
  let y = marginTop

  doc.setFont('times', 'bold')
  doc.setFontSize(24)
  doc.setTextColor(44, 62, 80)
  doc.text(titre, marginLeft, y)
  y += 8

  doc.setFont('times', 'italic')
  doc.setFontSize(13)
  doc.setTextColor(100, 100, 100)
  doc.text(auteur, marginLeft, y)
  y += 6

  doc.setDrawColor(66, 185, 131)
  doc.setLineWidth(0.8)
  doc.line(marginLeft, y, pageWidth - marginRight, y)
  y += 8

  doc.setFont('times', 'italic')
  doc.setFontSize(10)
  doc.setTextColor(150, 150, 150)
  doc.text('— Extrait de l\'ouvrage —', pageWidth / 2, y, { align: 'center' })
  y += 12

  doc.setFont('times', 'normal')
  doc.setFontSize(12)
  doc.setTextColor(60, 60, 60)

  const lignes = doc.splitTextToSize(texte, maxWidth)

  lignes.forEach((ligne) => {
    if (y + 7 > pageHeight - 20) {
      doc.addPage()
      y = marginTop
    }
    doc.text(ligne, marginLeft, y)
    y += 7
  })

  const totalPages = doc.internal.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    doc.setFont('times', 'italic')
    doc.setFontSize(9)
    doc.setTextColor(180, 180, 180)
    doc.line(marginLeft, pageHeight - 15, pageWidth - marginRight, pageHeight - 15)
    doc.text('Passion Lecture — extrait généré automatiquement', marginLeft, pageHeight - 9)
    doc.text(`Page ${i} / ${totalPages}`, pageWidth - marginRight, pageHeight - 9, { align: 'right' })
  }

  doc.save(`${titre} — extrait.pdf`)
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
          <img :src="formatPath(ouvrage.image_couverture)" :alt="ouvrage.titre" class="main-img"
            @error="handleImageError" />
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
              <span class="label">Auteur</span>
              <span class="value">
                <router-link :to="`/auteur/${ouvrage.auteur_id}`" class="author-link">
                  {{ getAuthorName(ouvrage.auteur_id) }}
                </router-link>
              </span>
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

          <div v-if="ouvrage.extrait_texte" class="excerpt-text-box">
            <div class="excerpt-actions">
              <button @click="downloadExtrait" class="btn-download-pdf">
                Télécharger l'extrait en PDF
              </button>
            </div>
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

        <section class="info-block add-comment">
          <div class="block-header">
            <h2>Laisser un avis</h2>
          </div>

          <div v-if="submitSuccess" class="success-msg">
            Votre avis a bien été publié !
          </div>

          <div class="comment-form">
            <div class="form-group">
              <label>Votre pseudo</label>
              <input v-model="newComment.utilisateur_pseudo" type="text" placeholder="Ex: BookWorm99" />
            </div>

            <div class="form-group">
              <label>Votre note</label>
              <div class="star-picker">
                <span v-for="n in 5" :key="n" class="star-pick" @click="newComment.note = n" @mouseenter="hoverNote = n"
                  @mouseleave="hoverNote = 0">
                  {{ n <= (hoverNote || newComment.note) ? '⭐' : '☆' }} </span>
                    <span class="note-label">
                      {{ newComment.note > 0 ? newComment.note + '/5' : 'Aucune note' }}
                    </span>
              </div>
            </div>

            <div class="form-group">
              <label>Votre commentaire</label>
              <textarea v-model="newComment.texte" rows="4"
                placeholder="Partagez votre avis sur ce livre..."></textarea>
            </div>

            <button @click="submitComment" class="btn-submit" :disabled="submitLoading">
              {{ submitLoading ? 'Publication...' : 'Publier mon avis' }}
            </button>
          </div>
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
/* ===== LAYOUT ===== */
.page-container {
  max-width: 1100px;
  margin: 40px auto;
  padding: 0 20px;
}

.header {
  margin-bottom: 35px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.header h1 {
  font-size: 2rem;
  color: #1e293b;
  margin: 0;
  font-weight: 800;
}

.badge-category {
  background: linear-gradient(135deg, #42b983, #33a06f);
  color: white;
  padding: 5px 14px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.main-content {
  display: flex;
  gap: 50px;
}

.col-visual {
  flex: 0 0 300px;
}

.col-details {
  flex: 1;
  min-width: 0;
}

/* ===== IMAGE ===== */
.main-img {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.18);
  transition: transform 0.3s;
}

.main-img:hover {
  transform: translateY(-4px);
}

/* ===== BLOCS INFO ===== */
.info-block {
  margin-bottom: 40px;
}

.block-header h2 {
  font-size: 1.25rem;
  color: #1e293b;
  margin-bottom: 15px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
}

.block-header h2::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 18px;
  background: linear-gradient(135deg, #42b983, #33a06f);
  border-radius: 2px;
}

/* ===== RÉSUMÉ ===== */
.resume-content {
  background: #f8fafc;
  border-left: 4px solid #42b983;
  padding: 20px 24px;
  line-height: 1.8;
  color: #475569;
  border-radius: 0 8px 8px 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  font-size: 0.97rem;
}

.resume-content p {
  margin: 0;
  word-break: break-word;
}

/* ===== SPECS TABLE ===== */
.specs-table {
  background: #f8fafc;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.spec-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  border-bottom: 1px solid #e2e8f0;
  transition: background 0.15s;
}

.spec-row:last-child {
  border-bottom: none;
}

.spec-row:hover {
  background: #f1f5f9;
}

.spec-row .label {
  color: #94a3b8;
  font-size: 0.88rem;
  font-weight: 500;
}

.spec-row .value {
  font-weight: 600;
  color: #1e293b;
  font-size: 0.95rem;
}

.stars {
  display: flex;
  align-items: center;
  gap: 6px;
}

.star-icon {
  color: #f59e0b;
  font-size: 1.1rem;
}

.average-note {
  font-weight: 700;
  color: #1e293b;
  font-size: 1rem;
}

.max-note {
  color: #94a3b8;
  font-size: 0.85rem;
}

.author-link {
  color: #42b983;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.author-link:hover {
  color: #33a06f;
  text-decoration: underline;
}

/* ===== EXTRAIT ===== */
.excerpt-text-box {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-left: 4px solid #42b983;
  padding: 24px 28px;
  border-radius: 0 10px 10px 0;
  line-height: 1.9;
  color: #475569;
  font-style: italic;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
  font-size: 0.97rem;
  position: relative;
}

.excerpt-text-box p {
  margin: 0 0 16px 0;
  word-break: break-word;
}

.excerpt-text-box p:last-child {
  margin-bottom: 0;
}

.excerpt-actions {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.btn-download-pdf {
  background: linear-gradient(135deg, #2c3e50, #34495e);
  color: white;
  border: none;
  padding: 11px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.88rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  letter-spacing: 0.3px;
}

.btn-download-pdf:hover {
  background: linear-gradient(135deg, #42b983, #33a06f);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(66, 185, 131, 0.3);
}

.no-excerpt {
  color: #94a3b8;
  font-style: italic;
  padding: 20px;
  background: #f8fafc;
  border-radius: 8px;
  text-align: center;
  border: 1px dashed #cbd5e1;
}

/* ===== COMMENTAIRES ===== */
.comments-list .block-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.comment-item {
  padding: 18px 0;
  border-bottom: 1px solid #f1f5f9;
  transition: background 0.15s;
}

.comment-item:last-child {
  border-bottom: none;
}

.com-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.com-meta strong {
  color: #1e293b;
  font-size: 0.95rem;
}

.com-note {
  background: #fef3c7;
  color: #d97706;
  font-weight: 700;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 0.85rem;
}

.com-text {
  font-size: 0.93rem;
  color: #64748b;
  margin: 0;
  line-height: 1.6;
}

.no-comments {
  color: #94a3b8;
  font-style: italic;
  text-align: center;
  padding: 30px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px dashed #cbd5e1;
}

/* ===== FORMULAIRE AVIS ===== */
.add-comment {
  border-top: 2px solid #f0f0f0;
  padding-top: 35px;
}

.comment-form {
  background: #f8fafc;
  padding: 28px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.form-group {
  margin-bottom: 22px;
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 8px;
  color: #334155;
  font-size: 0.88rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group input,
.form-group textarea {
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.97rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  background: white;
  color: #1e293b;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.12);
}

.star-picker {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 0;
}

.star-pick {
  font-size: 2rem;
  cursor: pointer;
  transition: transform 0.15s;
  line-height: 1;
}

.star-pick:hover {
  transform: scale(1.25);
}

.note-label {
  margin-left: 12px;
  font-size: 0.9rem;
  color: #94a3b8;
  font-weight: 500;
}

.btn-submit {
  background: linear-gradient(135deg, #42b983, #33a06f);
  color: white;
  border: none;
  padding: 13px 30px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  font-size: 0.97rem;
  transition: all 0.2s;
  width: 100%;
  letter-spacing: 0.3px;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(66, 185, 131, 0.35);
}

.btn-submit:disabled {
  background: #a8e6cf;
  cursor: not-allowed;
  transform: none;
}

.success-msg {
  background: #f0fdf4;
  border: 1px solid #86efac;
  color: #16a34a;
  padding: 14px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* ===== ÉTATS ===== */
.loading-state {
  text-align: center;
  padding: 120px 20px;
  color: #94a3b8;
}

.error-state {
  text-align: center;
  padding: 100px 20px;
  color: #94a3b8;
}

.btn-back {
  margin-top: 16px;
  background: #42b983;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.spinner {
  border: 3px solid #f1f5f9;
  border-top: 3px solid #42b983;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 20px;
}
<<<<<<< HEAD
=======
.author-link { 
  color: #334155; 
  text-decoration: none; 
}
.author-link:hover{ 
  color: #42b983; 
  text-decoration: none; 
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
>>>>>>> e8dfa957c26f099b8b35587315e034e6b9149e31

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
