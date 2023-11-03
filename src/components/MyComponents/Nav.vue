<script setup>
import { useAuthStore } from '../../stores/auth';
const authStore = useAuthStore();
</script>
<template>
    <nav class="navbar navbar-expand-lg bg-light" >
  <div class="container-fluid">
    <a class="navbar-brand h1" href="#" to="/hotel">Software Hotel</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse"  id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0" >
        <li class="nav-item px-lg-2" v-if="authStore.user">
            <h2>{{ authStore.user.name }}</h2>
        </li>
        <li class="nav-item px-lg-3" v-if="authStore.user">
          <RouterLink to="/hotel" class="nav-link">Hoteles</RouterLink>
        </li>
        <li class="nav-item px-lg-3" v-if="authStore.user">
          <RouterLink to="/room" class="nav-link">Habitaciones</RouterLink>
        </li>
        <li class="nav-item px-lg-3">
            <RouterLink to="/type-romm" class="nav-link">Tipo De Habitación </RouterLink>
        </li>
        <li class="nav-item px-lg-3">
            <RouterLink to="/city" class="nav-link">Ciudades</RouterLink>
        </li>
        <li class="nav-item px-lg-3">
            <RouterLink to="/accommodation" class="nav-link">Acomodación</RouterLink>
        </li>
        <li class="nav-item px-lg-3">
            <RouterLink to="/login" class="nav-link" v-if="!authStore.user">Login</RouterLink>
        </li>
        <li class="nav-item px-lg-3">
            <RouterLink to="/register" class="nav-link" v-if="authStore.user">Crear Usuario</RouterLink>
        </li>
        <li class="nav-item px-lg-3">
            <RouterLink to="/update" class="nav-link" v-if="authStore.user">Actualizar Contraseña</RouterLink>
        </li>
      </ul>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="authStore.user">
        <li class="nav-item px-lg-5">
          <button @click="authStore.logout" class="btn btn-secondary">Salir</button>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>