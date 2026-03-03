<template>
  <div class="mybooks-container">
    <div class="header-section">
      <h1>Mes ouvrages</h1>
      <p class="subtitle">Gérez les livres que vous avez partagés avec la communauté.</p>
      <button @click="$router.push('/add-book')" class="btn-add">+ Ajouter un nouvel ouvrage</button>
    </div>

    <div class="table-container">
      <table v-if="myBooks.length > 0" class="books-table">
        <thead>
          <tr>
            <th>Couverture</th>
            <th>Titre</th>
            <th>Catégorie</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in myBooks" :key="book.id">
            <td>
              <img :src="book.image_couverture" alt="Couverture" class="thumbnail" />
            </td>
            <td><strong>{{ book.titre }}</strong></td>
            <td><span class="badge">{{ book.categorie }}</span></td>
            <td class="actions-cell">
              <button @click="editBook(book.id)" class="btn-edit">
                Modifier
              </button>
              <button @click="deleteBook(book.id)" class="btn-delete">
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-else class="empty-state">
        <p>Vous n'avez pas encore ajouté d'ouvrages.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';

const router = useRouter();
const myBooks = ref([]);

const fetchMyBooks = async () => {
  try {
    const response = await api.get('/ouvrages');
    myBooks.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des livres:", error);
  }
};

const editBook = (id) => {
  router.push(`/edit-book/${id}`);
};

const deleteBook = async (id) => {
  if (confirm("Êtes-vous sûr de vouloir supprimer cet ouvrage ? Cette action est irréversible.")) {
    try {
      await api.delete(`/ouvrages/${id}`);
      myBooks.value = myBooks.value.filter(book => book.id !== id);
      alert("Ouvrage supprimé avec succès.");
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      alert("Impossible de supprimer l'ouvrage.");
    }
  }
};

onMounted(fetchMyBooks);
</script>

<style scoped>
.mybooks-container {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 20px;
  font-family: 'Century Gothic', sans-serif;
}

.header-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;
}

.btn-add {
  align-self: flex-start;
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.table-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  overflow: hidden;
}

.books-table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f8f9fa;
  color: #2c3e50;
  text-transform: uppercase;
  font-size: 0.8rem;
}

.thumbnail {
  width: 50px;
  height: 70px;
  object-fit: cover;
  border-radius: 4px;
}

.badge {
  background: #e8f5e9;
  color: #2e7d32;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
}

.actions-cell {
  display: flex;
  gap: 10px;
}

.btn-edit {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-delete {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-edit:hover { background-color: #2980b9; }
.btn-delete:hover { background-color: #c0392b; }

.empty-state {
  padding: 40px;
  text-align: center;
  color: #7f8c8d;
}
</style>
