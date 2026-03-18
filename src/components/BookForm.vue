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
        <select v-model="localBook.auteur_id" required>
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
        <input v-model.number="localBook.nombre_pages" type="number" required />
      </div>

      <div class="form-group">
        <label>Année d'édition</label>
        <input v-model.number="localBook.annee_edition" type="number" required />
      </div>
    </div>

    <div class="form-group full-width">
      <label>Résumé de l'ouvrage</label>
      <textarea v-model="localBook.resume" rows="5" required placeholder="Décrivez brièvement l'histoire..."></textarea>
    </div>

    <div class="form-group full-width">
      <label>Lien de l'image de couverture</label>
      <input v-model="localBook.image_couverture" type="text" placeholder="Ex: public/Couvertures/mon-livre.jpg" />
    </div>

    <div class="actions">
      <button type="button" @click="$emit('cancel')" class="btn-cancel">Annuler</button>
      <button type="submit" class="btn-submit" :disabled="loading">
        {{ loading ? 'Enregistrement...' : submitLabel }}
      </button>
    </div>
  </form>
</template>

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

watch(() => props.auteurs, (newAuteurs) => {
  if (newAuteurs.length > 0 && !localBook.value.auteur_id) {
    localBook.value.auteur_id = newAuteurs[0].id
  }
}, { immediate: true })

const handleSubmit = () => {
  emit('submit', localBook.value)
}
</script>

<style scoped>
.form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
.form-group { display: flex; flex-direction: column; margin-bottom: 15px; }
.full-width { grid-column: span 2; }
label { font-weight: bold; margin-bottom: 8px; color: #34495e; font-size: 0.9rem; }
input, select, textarea { padding: 12px; border: 1px solid #dcdde1; border-radius: 8px; font-size: 1rem; }
.actions { display: flex; justify-content: flex-end; gap: 15px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; }
.btn-submit { background-color: #42b983; color: white; padding: 12px 30px; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; }
.btn-cancel { background-color: #ecf0f1; color: #7f8c8d; padding: 12px 30px; border: none; border-radius: 8px; cursor: pointer; }
</style>