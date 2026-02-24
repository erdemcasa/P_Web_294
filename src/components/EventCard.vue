<script setup>
defineProps({
  ouvrage: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="event-card">
    <img :src="ouvrage.image_couverture" alt="Couverture" class="cover-img" />
    <div class="info">
      <span class="category">{{ ouvrage.categorie }}</span>
      <h3>{{ ouvrage.titre }}</h3>
      <p>Note: {{ ouvrage.moyenne_appreciations }}/5</p>
    </div>
  </div>
</template>

<style scoped>
.event-card {
  padding: 0;
  width: 200px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
  transition: all 0.2s ease;
  overflow: hidden;
  background: white;
  border-radius: 8px;
}

.cover-img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.info {
  padding: 10px;
}

.category {
  font-size: 0.8rem;
  text-transform: uppercase;
  color: #42b983;
  font-weight: bold;
}

h3 {
  margin: 5px 0;
  font-size: 1.1rem;
}

.event-card:hover {
  transform: scale(1.02);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
</style>
