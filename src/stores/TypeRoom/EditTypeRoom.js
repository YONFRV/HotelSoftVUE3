import {ref,nextTick} from 'vue';
import {sendRequest } from "../../functions";

export function useTypeRoom() {

  const title = ref('');
  const form = ref({
    type: '',
    state: '',
  }); // Datos del hotel
  const operation = ref(1);
  const ids = ref('');
  const close = ref([]);
  const nameInput = ref('');


  const openModal = (op,id,type,state) =>{
    clear();
    setTimeout( ()=> nextTick( ()=> nameInput.value.focus()),600);
    operation.value = op;
    ids.value = id; 
    if(op == 1){
        title.value = 'CREAR TIPO DE HABITACION';
    }
    else{
        title.value = 'ACTUALIZAR TIPO DE HABITACION';
        form.value.type = type;
        form.value.state = state;
    }
}
const clear = ()=>{
  form.value.type = '';
  form.value.state = '';
}

const reloadTypeRoomData = () => {
  const event = new Event('reload-TypeRoom'); // Crea un evento personalizado
  window.dispatchEvent(event); // Dispara el evento para recargar datos
};
const save = async () =>{
  let res;
  if(operation.value ==1){
      res = await sendRequest('POST',form.value,'/api/typerooms','');
      if(res == true){
        reloadTypeRoomData();         clear();
          nextTick( ()=> nameInput.value.focus());
        }
  }
  else{
      res = await sendRequest('PATCH',form.value,('/api/typerooms/'+ids.value),'');
      if(res == true){
        reloadTypeRoomData(); 
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