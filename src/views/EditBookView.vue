<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '@/services/api'
import BookForm from '@/components/BookForm.vue'

const router = useRouter()
const route = useRoute()
const loading = ref(false)
const auteurs = ref([])
const book = ref({})

onMounted(async () => {
  const [resAuteurs, resBook] = await Promise.all([
    api.get('/auteurs'),
    api.get(`/ouvrages/${route.params.id}`),
  ])
  auteurs.value = resAuteurs.data
  book.value = resBook.data
})

const updateBook = async () => {
  loading.value = true
  try {
    await api.put(`/ouvrages/${route.params.id}`, book.value)
    router.push('/mes-ouvrages')
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="edit-book-container">
    <div class="header-section">
      <h1>Modifier l'ouvrage</h1>
      <p class="subtitle">
        Modification de : <strong>{{ book.titre }}</strong>
      </p>
    </div>
    <BookForm
      v-if="book.id"
      v-model="book"
      :auteurs="auteurs"
      :loading="loading"
      :isEditing="true"
      @submit="updateBook"
      @cancel="$router.push('/mes-ouvrages')"
    />
  </div>
</template>

<style scoped>
.edit-book-container {
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
}

input,
select,
textarea {
  padding: 12px;
  border: 1px solid #dcdde1;
  border-radius: 8px;
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
  background-color: #3498db;
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
</style>
