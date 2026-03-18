<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

import BookForm from '@/components/BookForm.vue'

const router = useRouter()
const loading = ref(false)
const auteurs = ref([])

const emptyBook = {
  titre: '',
  categorie: 'roman',
  nombre_pages: null,
  extrait: '/assets/pdf/default.pdf',
  resume: '',
  auteur_id: null,
  editeur: '',
  annee_edition: new Date().getFullYear(),
  image_couverture: '',
  moyenne_appreciations: 0,
}

const fetchAuteurs = async () => {
  try {
    const response = await api.get('/auteurs')
    auteurs.value = response.data
  } catch (error) {
    console.error('Erreur auteurs:', error)
  }
}

const handleSaveBook = async (bookData) => {
  if (!bookData.titre || !bookData.auteur_id) {
    alert("Le titre et l'auteur sont obligatoires.")
    return
  }

  loading.value = true
  try {
    await api.post('/ouvrages', bookData)
    alert('Livre ajouté avec succès !')
    router.push('/browse')
  } catch (error) {
    console.error("Erreur d'envoi:", error)
    alert("Erreur lors de l'ajout. Vérifie que json-server est lancé.")
  } finally {
    loading.value = false
  }
}

const goBack = () => router.push('/')

onMounted(fetchAuteurs)
</script>

<template>
  <div class="add-book-container">
    <header class="header-section">
      <h1>Ajouter un livre</h1>
      <p class="subtitle">Partagez votre nouvelle découverte avec la communauté.</p>
    </header>

    <BookForm
      :initial-data="emptyBook"
      :auteurs="auteurs"
      :loading="loading"
      @submit="handleSaveBook"
      @cancel="goBack"
    />
  </div>
</template>

<style scoped>
.add-book-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 40px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.header-section {
  border-bottom: 1px solid #eee;
  margin-bottom: 30px;
  padding-bottom: 20px;
  text-align: left;
}

h1 {
  color: #2c3e50;
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
}

.subtitle {
  color: #94a3b8;
  font-size: 1rem;
  margin-top: 5px;
}
</style>
