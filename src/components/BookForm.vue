<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  initialData: { type: Object, required: true },
  auteurs: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  submitLabel: { type: String, default: "Publier l'ouvrage" }
})

const emit = defineEmits(['submit', 'cancel'])

const localBook = ref({ ...props.initialData })

watch(() => props.initialData, (newData) => {
  localBook.value = { ...newData }
}, { deep: true })

const handleSubmit = () => {
  if (!localBook.value.auteur_id) {
    alert("Veuillez sélectionner un auteur.");
    return;
  }
  emit('submit', { ...localBook.value })
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    localBook.value.extrait = `/assets/pdf/${file.name}`
  }
}
const handlePdfChange = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  const formData = new FormData()
  formData.append('pdf', file)

  try {
    const res = await fetch('http://localhost:3000/upload-pdf', {
      method: 'POST',
      body: formData
    })

    if (!res.ok) {
      const err = await res.json()
      console.error('Erreur serveur:', err)
      return
    }

    const data = await res.json()
    console.log('PDF uploadé:', data.path)
    localBook.value.extrait = data.path
  } catch (err) {
    console.error('Erreur upload PDF:', err)
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="book-form">
    <div class="form-grid">
      <div class="form-group">
        <label>Titre de l'ouvrage</label>
        <input v-model="localBook.titre" type="text" required placeholder="Ex: L'Incal" />
      </div>

      <div class="form-group">
        <label>Catégorie</label>
        <select v-model="localBook.categorie" required>
          <option value="bande dessinée">Bande dessinée</option>
          <option value="manga">Manga</option>
          <option value="roman">Roman</option>
          <option value="livre">Livre</option>
        </select>
      </div>

      <div class="form-group">
        <label>Auteur</label>
        <select v-model.number="localBook.auteur_id" required>
          <option disabled value="">Sélectionnez un auteur</option>
          <option v-for="auteur in auteurs" :key="auteur.id" :value="auteur.id">
            {{ auteur.prenom }} {{ auteur.nom }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Éditeur</label>
        <input v-model="localBook.editeur" type="text" required placeholder="Ex: Glénat" />
      </div>

      <div class="form-group">
        <label>Nombre de pages</label>
        <input v-model.number="localBook.nombre_pages" type="number" required min="1" />
      </div>

      <div class="form-group">
        <label>Année d'édition</label>
        <input v-model.number="localBook.annee_edition" type="number" required :max="new Date().getFullYear()" />
      </div>
    </div>

    <div class="form-group full-width">
      <label>Résumé de l'ouvrage</label>
      <textarea v-model="localBook.resume" rows="5" required placeholder="Décrivez brièvement l'histoire..."></textarea>
    </div>

    <div class="form-group full-width">
      <label>Extrait PDF</label>
      <div class="file-input-wrapper">
        <input type="file" accept=".pdf" @change="handlePdfChange" class="file-input" />
        <p v-if="localBook.extrait_texte" class="file-name">✅ PDF chargé et prêt</p>
        <p v-else class="file-hint">Sélectionnez un fichier PDF à associer à cet ouvrage</p>
      </div>
    </div>

    <div class="form-group full-width">
      <label>URL de la couverture (chemin public/)</label>
      <input v-model="localBook.image_couverture" type="text" placeholder="Ex: Couvertures/1984.jpg" />
    </div>

    <div class="actions">
      <button type="button" @click="$emit('cancel')" class="btn-cancel" :disabled="loading">
        Annuler
      </button>
      <button type="submit" class="btn-submit" :disabled="loading">
        {{ loading ? 'Enregistrement...' : submitLabel }}
      </button>
    </div>
  </form>
</template>

<style scoped>
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.field-hint {
  font-size: 0.8rem;
  color: #95a5a6;
  margin-top: 5px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  text-align: left;
}

.full-width {
  grid-column: span 2;
}


.file-input-wrapper {
  border: 2px dashed #dcdde1;
  padding: 15px;
  border-radius: 8px;
  background: #f8fafc;
  text-align: center;
}

.file-name {
  margin-top: 10px;
  font-size: 0.85rem;
  color: #42b983;
  font-weight: bold;
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
  transition: border-color 0.2s;
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

.btn-submit:disabled {
  background-color: #a8e6cf;
  cursor: not-allowed;
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
