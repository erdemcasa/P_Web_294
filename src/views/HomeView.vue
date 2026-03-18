<script setup>
import { ref, onMounted } from 'vue'
import { bookService } from '@/services/bookService'
import BookCard from '@/components/BookCard.vue'

const ouvrages = ref([])
const loading = ref(true)

const fetchOuvrages = async () => {
  try {
    const data = await bookService.getAll()
    ouvrages.value = data.reverse()
  } catch (error) {
    console.error('Erreur lors de la récupération des ouvrages:', error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchOuvrages)
</script>

<template>
  <header class="hero-section">
    <div class="title-container">
      <h1>Passion Lecture</h1>
      <p>Votre bibliothèque, vos avis, votre passion.</p>
    </div>
  </header>

  <section class="about-section">
  <div class="container">
    <h2>Pourquoi Passion Lecture ?</h2>
    <p>
      Passion Lecture est une plateforme communautaire dédiée aux amoureux des livres. 
      Notre but est de vous permettre de <strong>répertorier vos ouvrages préférés</strong>, 
      de partager vos dernières découvertes et de consulter les avis de la communauté 
      pour choisir votre prochaine lecture. Que vous soyez fan de mangas, de romans ou 
      de bandes dessinées, cet espace est le vôtre.
    </p>
  </div>
</section>

  <main class="container">
    <section class="recent-section">
      <h2>Ajoutés récemment</h2>
      <p class="subtitle">Découvrez les derniers trésors de la communauté</p>

      <div v-if="loading" class="loader">Chargement des livres...</div>

      <div v-else class="book-grid">
        <BookCard
          v-for="ouvrage in ouvrages.slice(0, 5)"
          :key="ouvrage.id"
          :ouvrage="ouvrage"
        />
      </div>

      <div v-if="!loading && ouvrages.length === 0">
        Aucun livre trouvé.
      </div>
    </section>
  </main>
</template>

<style scoped>
.hero-section {
  height: 40vh;
  background: linear-gradient(rgba(0,0,0,0.05), rgba(0,0,0,0.02)), #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title-container {
  text-align: center;
  padding: 0 20px;
}

h1 {
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 800;
  margin: 0;
  color: #2c3e50;
}

.title-container p {
  font-size: clamp(1rem, 4vw, 2rem);
  color: #7f8c8d;
  margin-top: 10px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

h2 {
  font-size: 2rem;
  margin-bottom: 5px;
}

.subtitle {
  color: #95a5a6;
  margin-bottom: 40px;
}

.book-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
}

.loader {
  padding: 50px;
  font-style: italic;
  color: #95a5a6;
}

.about-section {
  padding: 40px 20px;
  background-color: #f8fafc; /* Un gris très léger pour détacher du blanc */
  text-align: center;
  border-bottom: 1px solid #e2e8f0;
}

.about-section .container {
  max-width: 800px;
  margin: 0 auto;
}

.about-section h2 {
  color: #1e293b;
  margin-bottom: 15px;
  font-size: 1.8rem;
}

.about-section p {
  color: #64748b;
  line-height: 1.6;
  font-size: 1.1rem;
}

.about-section strong {
  color: #42b983; /* Le vert de ton projet pour faire ressortir l'idée */
}

</style>
