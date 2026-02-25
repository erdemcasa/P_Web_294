<template>
  <div class="login-container">
    <div class="login-card">
      <h1>Se connecter</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Pseudo</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Entrez votre pseudo"
            required
          >
        </div>

        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="••••••••"
            required
          >
        </div>

        <button type="submit" class="btn-login">Connexion</button>
      </form>

      <p v-if="error" class="error-msg">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const handleLogin = () => {
  if (username.value === 'BookWorm99' || username.value === 'admin') {
    console.log("Connexion réussie pour :", username.value)

    // On stocke l'info dans le localStorage pour simuler une session
    localStorage.setItem('user', JSON.stringify({ pseudo: username.value, role: username.value === 'admin' ? 'admin' : 'user' }))

    // Redirection vers la page d'accueil
    router.push('/')
  } else {
    error.value = "Utilisateur inconnu. Essayez 'BookWorm99' ou 'admin'."
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
}

.login-card {
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-sizing: border-box; /* Important pour que le padding ne dépasse pas */
}

.btn-login {
  width: 100%;
  padding: 0.8rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background 0.3s;
}

.btn-login:hover {
  background-color: #3aa876;
}

.error-msg {
  color: #e74c3c;
  text-align: center;
  margin-top: 1rem;
}
</style>
