<template>
  <header>
    <div class="wrapper">
      <div class="logo-container">
        <RouterLink to="/">
          <img src="/logo.png" alt="Logo" class="logo" />
        </RouterLink>
      </div>

      <nav class="links">
        <RouterLink to="/">Accueil</RouterLink>
        <RouterLink to="/parcourir">Parcourir</RouterLink>
        <RouterLink to="/mes-ouvrages">Mes Ouvrages</RouterLink>

        <RouterLink to="/connexion" class="login-route">Se connecter</RouterLink>
        <RouterLink to="/inscription" class="signin-route">S'inscrire</RouterLink>
      </nav>
    </div>
  </header>
</template>
