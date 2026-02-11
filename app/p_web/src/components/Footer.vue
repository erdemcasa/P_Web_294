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
    <p>{{ contact.Name }} :</p>
    <p>{{ contact.Mail }}</p>
    <p>{{ contact.Tel }}</p>
  </div>
</template>

<style scoped>
.Contact-Us {
  color: #828282;
  width: 25vh;
}
</style>
