<template>
  <div class="edit-book-container">
    <div class="header-section">
      <h1>Modifier l'ouvrage</h1>
      <p class="subtitle">Modification de : <strong>{{ book.titre }}</strong></p>
    </div>

    <form @submit.prevent="updateBook" class="book-form">
      <div class="form-grid">
        <div class="form-group">
          <label>Titre de l'ouvrage</label>
          <input
            v-model="book.titre"
            type="text"
            required
          >
        </div>

        <div class="form-group">
          <label>Catégorie</label>
          <select v-model="book.categorie" required>
            <option value="bande dessinée">Bande dessinée</option>
            <option value="manga">Manga</option>
            <option value="roman">Roman</option>
            <option value="livre">Livre</option>
          </select>
        </div>

        <div class="form-group">
          <label>Auteur</label>
          <select v-model="book.auteur_id" required>
            <option v-for="auteur in auteurs" :key="auteur.id" :value="auteur.id">
              {{ auteur.prenom }} {{ auteur.nom }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Éditeur</label>
          <input v-model="book.editeur" type="text" required>
        </div>

        <div class="form-group">
          <label>Nombre de pages</label>
          <input v-model.number="book.nombre_pages" type="number" required>
        </div>

        <div class="form-group">
          <label>Année d'édition</label>
          <input v-model.number="book.annee_edition" type="number" required>
        </div>
      </div>

      <div class="form-group full-width">
        <label>Résumé de l'ouvrage</label>
        <textarea v-model="book.resume" rows="5" required></textarea>
      </div>

      <div class="form-group full-width">
        <label>Lien de l'image de couverture</label>
        <input v-model="book.image_couverture" type="text">
      </div>

      <div class="actions">
        <button type="button" @click="$router.push('/mybooks')" class="btn-cancel">Annuler</button>
        <button type="submit" class="btn-submit" :disabled="loading">
          {{ loading ? 'Mise à jour...' : 'Enregistrer les modifications' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import api from '@/services/api';

const router = useRouter();
const route = useRoute(); 
const loading = ref(false);
const auteurs = ref([]);

const bookId = route.params.id;

const book = ref({
  titre: '',
  categorie: '',
  nombre_pages: null,
  resume: '',
  auteur_id: null,
  editeur: '',
  annee_edition: null,
  image_couverture: '',
  extrait: ''
});

const loadInitialData = async () => {
  try {
    const resAuteurs = await api.get('/auteurs');
    auteurs.value = resAuteurs.data;

    const resBook = await api.get(`/ouvrages/${bookId}`);
    book.value = resBook.data;
  } catch (error) {
    console.error("Erreur de chargement:", error);
    alert("Impossible de trouver cet ouvrage.");
    router.push('/mybooks');
  }
};

const updateBook = async () => {
  loading.value = true;
  try {
    await api.put(`/ouvrages/${bookId}`, book.value);
    router.push('/mybooks');
  } catch (error) {
    console.error("Erreur PUT:", error);
    alert("Erreur lors de la sauvegarde.");
  } finally {
    loading.value = false;
  }
};

onMounted(loadInitialData);
</script>

<style scoped>
.edit-book-container {
  max-width: 900px;
  margin: 3rem auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
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

.full-width { grid-column: span 2; }

label { font-weight: bold; margin-bottom: 8px; color: #34495e; }

input, select, textarea {
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
