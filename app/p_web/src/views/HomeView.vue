<script setup>
import EventCard from '@/components/EventCard.vue'
import Footer from '@/components/Footer.vue'
import { ref } from 'vue'

const contacts = ref([
  {
    id: 0,
    Name: 'Snehan Gnanassorian',
    Mail: 'snehan.gnanassorian@mail.com',
    Tel: '+41 00 000 00 00',
  },
  {
    id: 1,
    Name: 'Zidane Sahraoui',
    Mail: 'zidane.sahraoui@mail.com',
    Tel: '+41 00 000 00 00',
  },
  {
    id: 2,
    Name: 'Ökkes Erdem Köse',
    Mail: 'erdem.kose@mail.com',
    Tel: '+41 00 000 00 00',
  },
])
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
      <h1>Passion Lecture</h1>
      <p>Un site vous permettant de consulter vos ouvrages favoris et laisser des reviews</p>
    </div>
  </header>

  <h2>Ajouté récemment</h2>
  <p>5 derniers ouvrages ajoutés</p>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>

  <h2>Nous contacter</h2>
  <div class="contacts">
    <Footer v-for="contact in contacts" :key="contact.id" :contact="contact" />
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
  flex-wrap: wrap;
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
.contacts {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
