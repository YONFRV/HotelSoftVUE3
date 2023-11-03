import {ref,nextTick} from 'vue';
import {sendRequest } from "../../functions";

export function useRoomModal() {

  const title = ref('');
  const form = ref({
    hotel_id: '',
    typeRoom_id: '',
    accommodation_id: '',
    amount: '',
    state: '',
  }); // Datos del hotel
  const operation = ref(1);
  const ids = ref('');
  const close = ref([]);
  const nameInput = ref('');


  const openModal = (op,id,hotel_id,typeRoom_id,accommodation_id,amount,state) =>{
    clear();
    setTimeout( ()=> nextTick( ()=> nameInput.value.focus()),600);
    operation.value = op;
    ids.value = id; 
    if(op == 1){
        title.value = 'CREAR HOTEL';
    }
    else{
        title.value = 'ACTUALIZAR HOTEL';
        form.value.hotel_id = hotel_id;
        form.value.typeRoom_id = typeRoom_id;
        form.value.accommodation_id = accommodation_id;
        form.value.amount = amount;
        form.value.state = state;
    }
}
const clear = ()=>{
  form.value.hotel_id = '';
  form.value.typeRoom_id = '';
  form.value.accommodation_id = '';
  form.value.amount = '';
  form.value.state = '';
}

const reloadRoomData = () => {
  const event = new Event('reload-room'); // Crea un evento personalizado
  window.dispatchEvent(event); // Dispara el evento para recargar datos
};
const save = async () =>{
  let res;
  if(operation.value ==1){
      res = await sendRequest('POST',form.value,'/api/rooms','');
      if(res == true){
        reloadRoomData();         clear();
          nextTick( ()=> nameInput.value.focus());
        }
  }
  else{
      res = await sendRequest('PATCH',form.value,('/api/rooms/'+ids.value),'');
      if(res == true){
        reloadRoomData(); 
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