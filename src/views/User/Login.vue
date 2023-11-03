<script setup>
    import { ref } from 'vue';
    import { useAuthStore } from '../../stores/auth';
    const authStore = useAuthStore();
    const form = ref({ email: '', password: '' });
</script>
<template>
    <section class="vh-100">
        <div class="container mt-5"> 
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">Iniciar sesión</div>
                        <div class="card-body">
                            <form @submit.prevent="authStore.login(form)">
                                <div class="mb-3">
                                    <label for="email" class="form-label">Correo electrónico</label>
                                    <input  v-model="form.email" type="email" class="form-control" id="email" name="email" required>
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="form-label">Contraseña</label>
                                    <input v-model="form.password" type="password" class="form-control" id="password" name="password" required>
                                </div>
                                <div class="row w-100 align-items-center">
                                    <div class="col text-center">
                                        <button type="submit" class="btn btn-primary">Iniciar sesión</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>