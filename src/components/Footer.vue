<script setup>
import { ref } from 'vue'

defineProps({
  contact: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="Contact-Us">
    <p>{{ contact.name }}</p>
    <p>{{ contact.mail }}</p>
    <p>{{ contact.tel }}</p>
  </div>
</template>

<style scoped>
.Contact-Us {
  color: #828282;
  width: 35vh;
}
</style>
