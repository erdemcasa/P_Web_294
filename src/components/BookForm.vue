<script setup>
defineProps({
  modelValue: { type: Object, required: true },
  auteurs: { type: Array, required: true },
  loading: { type: Boolean, default: false },
  isEditing: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'submit', 'cancel'])
</script>

<template>
  <form @submit.prevent="emit('submit')" class="book-form">
    <div class="form-grid">
      <div class="form-group">
        <label>Titre de l'ouvrage</label>
        <input v-model="modelValue.titre" type="text" required />
      </div>

      <div class="form-group">
        <label>Catégorie</label>
        <select v-model="modelValue.categorie" required>
          <option value="bande dessinée">Bande dessinée</option>
          <option value="manga">Manga</option>
          <option value="roman">Roman</option>
          <option value="livre">Livre</option>
        </select>
      </div>

      <div class="form-group">
        <label>Auteur</label>
        <select v-model="modelValue.auteur_id" required>
          <option v-for="auteur in auteurs" :key="auteur.id" :value="auteur.id">
            {{ auteur.prenom }} {{ auteur.nom }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Éditeur</label>
        <input v-model="modelValue.editeur" type="text" required />
      </div>

      <div class="form-group">
        <label>Nombre de pages</label>
        <input v-model.number="modelValue.nombre_pages" type="number" required />
      </div>

      <div class="form-group">
        <label>Année d'édition</label>
        <input v-model.number="modelValue.annee_edition" type="number" required />
      </div>
    </div>

    <div class="form-group full-width">
      <label>Résumé</label>
      <textarea v-model="modelValue.resume" rows="5" required></textarea>
    </div>

    <div class="form-group full-width">
      <label>Lien de l'image de couverture</label>
      <input v-model="modelValue.image_couverture" type="text" />
    </div>

    <div class="actions">
      <button type="button" @click="emit('cancel')" class="btn-cancel">Annuler</button>
      <button type="submit" class="btn-submit" :disabled="loading">
        {{ loading ? 'Chargement...' : isEditing ? 'Enregistrer les modifications' : 'Publier' }}
      </button>
    </div>
  </form>
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
