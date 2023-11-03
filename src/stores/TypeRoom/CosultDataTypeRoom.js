import axios from 'axios';
import {ref,onMounted} from 'vue';
import { useAuthStore } from '../../stores/auth';


export function useGetTypeRoomData() {
    const authStore = useAuthStore();
    axios.defaults.headers.common['Authorization'] = 'Bearer '+authStore.authToken;
    const typeRoomData = ref([]);
    const rows = ref(0);
    const load = ref(false);
    const getTypeRoom = async (page) => {
      try {
        const response = await axios.get('/api/typeroomssl?page=' + page);
        typeRoomData.value = response.data.data;
        rows.value = response.data.last_page;
        load.value = true;
      } catch (error) {
        load.value = false;
      }
    };
  
    onMounted(() => {
      getTypeRoom(1);
    });
  
    return {
      typeRoomData,
      rows,
      load,
      getTypeRoom, // También puedes exponer esta función si deseas cargar datos en respuesta a eventos en la interfaz de usuario
    };
  }

