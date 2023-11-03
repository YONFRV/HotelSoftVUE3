import axios from 'axios';
import { defineStore } from 'pinia';
import { show_alerta } from '../functions';


export const useAuthStore = defineStore('auth',{
    state: () => ({authUser:null, authToken:null }),
    getters:{
        user:(state) => state.authUser,
        token:(state) => state.authToken
    },
    actions:{
        async getToken(){
            await axios.get('/sanctum/csrf-cookie');
        },
        async login(form){
            await this.getToken();
            await axios.post('/api/auth/login',form).then(
                (res) => {
                    this.authToken = res.data.token;
                    this.authUser = res.data.data;
                    this.router.push('/hotel');
                }
            ).catch(
                (errors) => {
                    console.log(errors.response.data)
                    let desc ='';
                    errors.response.data.errors.map(
                        (e) => {desc = desc + ' ' +e }
                    )
                    show_alerta(desc,'errors','')
                }   
            )
        },
        async register(form){
            await this.getToken();
            await axios.post('/api/auth/register',form).then(
                (res) => {
                    show_alerta(res.data.message,'success','')
                    setTimeout(()=> this.router.push('/login'),2000)
                }
            ).catch(
                (errors) => {
                    let desc = '';
                    errors.response.data.errors.map(
                        (e) => {desc = desc + ' '+e}
                    )
                    show_alerta(desc,'error','');
                }
            )
        },
        async update(form){
            await this.getToken();
            await axios.patch('/api/auth/update-user',{password: form.password}).then(
                (res) => {
                    show_alerta(res.data.message,'success','')
                    setTimeout(()=> this.router.push('/hotel'),100)
                }
            ).catch(
                (errors) => {
                    let desc = '';
                    errors.response.data.errors.map(
                        (e) => {desc = desc + ' '+e}
                    )
                    show_alerta(desc,'error','');
                }
            )
        },
        async logout(){
            await axios.get('/api/auth/logout',this.authToken);
            this.authToken = null;
            this.authUser = null;
            this.router.push('/login');
        }
    },
    persist:true
});

export function updateUser(){
    
}
