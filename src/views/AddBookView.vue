<template>
  <div class="add-book-container">
    <div class="header-section">
      <h1>Ajouter un livre</h1>
      <p class="subtitle">Partagez votre nouvelle découverte avec la communauté.</p>
    </div>

    <form @submit.prevent="submitBook" class="book-form">
      <div class="form-grid">
        <div class="form-group">
          <label>Titre de l'ouvrage</label>
          <input
            v-model="book.titre"
            type="text"
            required
            placeholder="Ex: L'Incal"
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
          <input v-model="book.editeur" type="text" required placeholder="Ex: Glénat">
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
        <textarea
          v-model="book.resume"
          rows="5"
          required
          placeholder="Décrivez brièvement l'histoire..."
        ></textarea>
      </div>

      <div class="form-group full-width">
        <label>Lien de l'image de couverture</label>
        <input
          v-model="book.image_couverture"
          type="text"
          placeholder="Ex: public/Couvertures/mon-livre.jpg"
        >
      </div>

      <div class="actions">
        <button type="button" @click="$router.push('/catalog')" class="btn-cancel">Annuler</button>
        <button type="submit" class="btn-submit" :disabled="loading">
          {{ loading ? 'Enregistrement...' : 'Publier l\'ouvrage' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api'; // Ton instance Axios

const router = useRouter();
const loading = ref(false);
const auteurs = ref([]);

// Modèle de données initial pour un nouveau livre
const book = ref({
  titre: '',
  categorie: 'roman',
  nombre_pages: null,
  extrait: '/assets/pdf/default.pdf', // Valeur par défaut
  resume: '',
  auteur_id: null,
  editeur: '',
  annee_edition: new Date().getFullYear(),
  image_couverture: '',
  moyenne_appreciations: 0
});

const fetchAuteurs = async () => {
  try {
    const response = await api.get('/auteurs');
    auteurs.value = response.data;

    if (auteurs.value.length > 0) {
      book.value.auteur_id = auteurs.value[0].id;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des auteurs:", error);
  }
};
const submitBook = async () => {
  loading.value = true;
  try {
    await api.post('/ouvrages', book.value);
    alert('Livre ajouté avec succès !');
    router.push('/catalog');
  } catch (error) {
    console.error("Erreur lors de l'envoi:", error);
    alert("Une erreur est survenue lors de l'ajout.");
  } finally {
    loading.value = false;
  }
};

onMounted(fetchAuteurs);
</script>

<style scoped>
.add-book-container {
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

h1 { color: #2c3e50; margin: 0; }
.subtitle { color: #7f8c8d; font-size: 0.9rem; }

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

label {
  font-weight: bold;
  margin-bottom: 8px;
  color: #34495e;
  font-size: 0.9rem;
}

input, select, textarea {
  padding: 12px;
  border: 1px solid #dcdde1;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus, select:focus, textarea:focus {
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

.btn-submit:hover { background-color: #3aa876; }
.btn-submit:disabled { background-color: #a8d5c2; cursor: not-allowed; }
</style>
