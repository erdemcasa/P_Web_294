<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import BookForm from '@/components/BookForm.vue'

const router = useRouter()
const loading = ref(false)
const auteurs = ref([])

const book = ref({
  titre: '',
  categorie: 'roman',
  nombre_pages: null,
  resume: '',
  auteur_id: null,
  editeur: '',
  annee_edition: new Date().getFullYear(),
  image_couverture: '',
  moyenne_appreciations: 0,
})

onMounted(async () => {
  const res = await api.get('/auteurs')
  auteurs.value = res.data
  if (auteurs.value.length > 0) book.value.auteur_id = auteurs.value[0].id
})

const submitBook = async () => {
  loading.value = true
  try {
    await api.post('/ouvrages', book.value)
    router.push('/mes-ouvrages')
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="add-book-container">
    <div class="header-section">
      <h1>Ajouter un livre</h1>
    </div>
    <BookForm
      v-model="book"
      :auteurs="auteurs"
      :loading="loading"
      @submit="submitBook"
      @cancel="$router.push('/')"
    />
  </div>
</template>
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

.header-section {
  border-bottom: 2px solid #f0fdf4;
  margin-bottom: 25px;
  padding-bottom: 15px;
}

h1 {
  color: #2c3e50;
  margin: 0;
}
.subtitle {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.full-width {
  grid-column: span 2;
}

label {
  font-weight: bold;
  margin-bottom: 8px;
  color: #34495e;
  font-size: 0.9rem;
}

input,
select,
textarea {
  padding: 12px;
  border: 1px solid #dcdde1;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #42b983;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.btn-submit {
  background-color: #42b983;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.btn-cancel {
  background-color: #ecf0f1;
  color: #7f8c8d;
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.btn-submit:hover {
  background-color: #3aa876;
}
.btn-submit:disabled {
  background-color: #a8d5c2;
  cursor: not-allowed;
}
</style>
