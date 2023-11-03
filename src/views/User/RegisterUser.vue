<script setup>
import {ref} from 'vue';
import { useAuthStore } from '../../stores/auth';
const authStore = useAuthStore();
const form = ref({name:'',email:'',password:''});
</script>
<template>
    <div class="row mt-5">
        <div class="col-md-4 offset-md-4">
            <div class="card border ">
                <div class="card-header border ">REGISTER</div>
                <div class="card-body">
                    <form  @submit.prevent="authStore.register(form)">
                        <div class="input-group mb-3 ">
                            <span class="input-group-text col-12">
                                <i class="fa-solid fa-user"></i>
                                <input autofocus type="text" v-model="form.name"
                                placeholder="Name" class="form-control">
                            </span>
                        </div>
                        
                        <div class="input-group mb-3 ">
                            <span class="input-group-text col-12">
                                <i class="fa-solid fa-at"></i>
                                <input autofocus type="email" v-model="form.email"
                                placeholder="Email" class="form-control">
                            </span>
                        </div>
                        <div class="input-group mb-3 ">
                            <span class="input-group-text col-12">
                                <i class="fa-solid fa-key"></i>
                                <input autofocus type="password" v-model="form.password"
                                placeholder="Password" class="form-control" >
                            </span>
                        </div>
                        <div class="d-grid col-10 mx-auto">
                            <button class="btn btn-primary">Send</button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
</template>