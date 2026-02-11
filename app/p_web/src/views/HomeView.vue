<script setup>
import EventCard from '@/components/EventCard.vue'
import { ref } from 'vue'

const events = ref([
  {
    id: 5928101,
    category: 'animal welfare',
    title: 'Cat Adoption Day',
    description: 'Find your new feline friend at this event.',
    location: 'Meow Town',
    date: 'January 28, 2022',
    time: '12:00',
    petsAllowed: true,
    organizer: 'Kat Laydee',
  },
  {
    id: 4582797,
    category: 'food',
    title: 'Community Gardening',
    description: 'Join us as we tend to the community edible plants.',
    location: 'Flora City',
    date: 'March 14, 2022',
    time: '10:00',
    petsAllowed: true,
    organizer: 'Fern Pollin',
  },
  {
    id: 8419988,
    category: 'sustainability',
    title: 'Beach Cleanup',
    description: 'Help pick up trash along the shore.',
    location: 'Playa Del Carmen',
    date: 'July 22, 2022',
    time: '11:00',
    petsAllowed: false,
    organizer: 'Carey Wales',
  },
])
</script>

<template>
  <header class="section">
    <div class="Title">
      <h1>Livre Passion</h1>
      <p>Un site vous permettant de consulter vos ouvrages favoris et laisser des reviews</p>
    </div>
  </header>

  <h2>Ajouté récemment</h2>
  <p>5 derniers ouvrages ajoutés</p>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<style scoped>
.section {
  height: 50vh;
  background-color: #f5f5f5;
  background-size: cover;
  background-position: center;

  display: flex;
  align-items: center;
  justify-content: center;
}
.Title {
  margin-bottom: 10%;
}
.events {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.event-card {
  margin: 1vh;
}
h1 {
  font-size: 5rem;
  font-weight: 800;
}
.Title p {
  font-size: 2rem;
}
</style>
