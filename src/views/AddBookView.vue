<template>
  <div class="add-book-container">
    <div class="header-section">
      <h1>Ajouter un livre</h1>
      <p class="subtitle">Partagez votre nouvelle découverte avec la communauté.</p>
    </div>

    <BookForm 
      :initial-data="emptyBook" 
      :auteurs="auteurs" 
      :loading="loading"
      @submit="handleSaveBook"
      @cancel="goBack"
    />
  </div>
</template>

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
    console.error('Erreur lors de la récupération des auteurs:', error)
  }
}

const handleSaveBook = async (bookData) => {
  loading.value = true
  try {
    await api.post('/ouvrages', bookData)
    alert('Livre ajouté avec succès !')
    router.push('/catalog')
  } catch (error) {
    console.error("Erreur lors de l'envoi:", error)
    alert("Une erreur est survenue lors de l'ajout.")
  } finally {
    loading.value = false
  }
}

const goBack = () => router.push('/')

onMounted(fetchAuteurs)
</script>

<style scoped>
.add-book-container {
  max-width: 900px;
  margin: 3rem auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  font-family: 'Century Gothic', sans-serif;
}
.header-section { border-bottom: 2px solid #f0fdf4; margin-bottom: 25px; padding-bottom: 15px; }
h1 { color: #2c3e50; margin: 0; }
.subtitle { color: #7f8c8d; font-size: 0.9rem; }
</style>