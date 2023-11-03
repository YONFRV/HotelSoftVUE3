import axios from 'axios';
import {ref,onMounted} from 'vue';
import { useAuthStore } from '../../stores/auth';

export function useGetRoomData() {
    const authStore = useAuthStore();
    axios.defaults.headers.common['Authorization'] = 'Bearer '+authStore.authToken;
    const roomsData = ref([]);
    const rows = ref(0);
    const load = ref(false);
    const getRoom = async (page) => {
      try {
        const response = await axios.get('/api/rooms?page=' + page);
        roomsData.value = response.data.data;
        rows.value = response.data.last_page;
        load.value = true;
      } catch (error) {
        load.value = false;
      }
    };
  
    onMounted(() => {
        getRoom(1);
    });
  
    return {
      roomsData,
      rows,
      load,
      getRoom, // También puedes exponer esta función si deseas cargar datos en respuesta a eventos en la interfaz de usuario
    };
  }