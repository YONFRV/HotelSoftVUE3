import Swal from 'sweetalert2';
import { nextTick } from '@vue/runtime-core';
import { useAuthStore } from '@/stores/auth'
import axios from 'axios';


export function show_alerta(msj,icon,focus){
    if(focus !== ''){
        nextTick( () => focus.value.focus());
    }
    Swal.fire({
        title:msj,icon:icon,buttonsStyling:true
    });
}


export function confirmation(name,url,redirect){
    const alert = Swal.mixin({buttonsStyling:true});
    alert.fire({
        title:'Are you sure delete '+name+' ?',
        icon:'question',showCancelButton:true,
        confirmButtonText:'<i class="fa-solid fa-check"></i> Yes, delete',
        cancelButtonText:'<i class="fa-solid fa-ban"></i> Cancel'
    }).then( (result) =>{
        if(result.isConfirmed){
            sendRequest('DELETE',{},url,redirect);
        }
    });

}

export async function sendRequest(method,params,url,redirect=''){
    const authStore = useAuthStore();
    axios.defaults.headers.common['Authorization'] = 'Bearer '+authStore.authToken;
    let res;
    await axios({ method:method, url:url, data:params}).then(
        response =>{
            res= response.data.status,
            show_alerta(response.data.message,'success',''),
            setTimeout( 
                ()=> (redirect !=='') ? window.location.href = redirect:''
                ,2000)
        }).catch((errors) =>{
            let desc='';
            if (Array.isArray(errors.response.data.errors)) {
                // Si los errores son un array, puedes mapearlos
                desc = errors.response.data.errors.map((e) => e).join(' ');
              } else {
                // Si los errores no son un array, muestra el mensaje de error tal como está
                desc = errors.response.data.errors;
              }
            show_alerta(desc,'error','')
        })
        return res;
}



