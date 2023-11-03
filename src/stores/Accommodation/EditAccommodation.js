import {ref,nextTick} from 'vue';
import {sendRequest } from "../../functions";

export function useAccommodationModal() {

  const title = ref('');
  const form = ref({
    name: '',
    state: '',
  }); // Datos del hotel
  const operation = ref(1);
  const ids = ref('');
  const close = ref([]);
  const nameInput = ref('');


  const openModal = (op,id,name,state) =>{
    clear();
    setTimeout( ()=> nextTick( ()=> nameInput.value.focus()),600);
    operation.value = op;
    ids.value = id; 
    if(op == 1){
        title.value = 'CREAR ACOMODACIÓN';
    }
    else{
        title.value = 'ACTUALIZAR ACOMODACIÓN';
        form.value.name = name;
        form.value.state = state;
    }
}
const clear = ()=>{
  form.value.name = '';
  form.value.state = '';
}

const reloadAccommodationData = () => {
  const event = new Event('reload-accommodation'); // Crea un evento personalizado
  window.dispatchEvent(event); // Dispara el evento para recargar datos
};
const save = async () =>{
  let res;
  if(operation.value ==1){
      res = await sendRequest('POST',form.value,'/api/accommodations','');
      if(res == true){
        reloadAccommodationData();         clear();
          nextTick( ()=> nameInput.value.focus());
        }
  }
  else{
      res = await sendRequest('PATCH',form.value,('/api/accommodations/'+ids.value),'');
      if(res == true){
        reloadAccommodationData(); 
        nextTick( ()=> close.value.click());
        }
  }
}
return {
  openModal,
  save,
  title,
  form,
  nameInput,
  close,
};
}