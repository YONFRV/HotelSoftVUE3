import {ref,nextTick} from 'vue';
import {sendRequest } from "../../functions";

export function useHotelModal() {

  const title = ref('');
  const form = ref({
    name: '',
    city_id: '',
    address: '',
    nit: '',
    max_rooms: '',
    state: '',
  }); // Datos del hotel
  const operation = ref(1);
  const ids = ref('');
  const close = ref([]);
  const nameInput = ref('');


  const openModal = (op,id,name,city_id,address,nit,max_rooms,state) =>{
    clear();
    setTimeout( ()=> nextTick( ()=> nameInput.value.focus()),600);
    operation.value = op;
    ids.value = id; 
    if(op == 1){
        title.value = 'CREAR HOTEL';
    }
    else{
        title.value = 'ACTUALIZAR HOTEL';
        form.value.name = name;
        form.value.city_id = city_id;
        form.value.address = address;
        form.value.nit = nit;
        form.value.max_rooms = max_rooms;
        form.value.state = state;
    }
}
const clear = ()=>{
  form.value.name = '';
  form.value.city_id = '';
  form.value.address = '';
  form.value.nit = '';
  form.value.max_rooms = '';
  form.value.state = '';
}

const reloadHotelData = () => {
  const event = new Event('reload-hotel'); // Crea un evento personalizado
  window.dispatchEvent(event); // Dispara el evento para recargar datos
};
const save = async () =>{
  let res;
  if(operation.value ==1){
      res = await sendRequest('POST',form.value,'/api/hotels','');
      if(res == true){
        reloadHotelData();         clear();
          nextTick( ()=> nameInput.value.focus());
        }
  }
  else{
      res = await sendRequest('PATCH',form.value,('/api/hotels/'+ids.value),'');
      if(res == true){
        reloadHotelData(); 
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