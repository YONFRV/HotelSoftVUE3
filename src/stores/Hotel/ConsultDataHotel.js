import axios from 'axios';
import {ref,onMounted} from 'vue';
import { useAuthStore } from '../../stores/auth';
 
export function useGetHotelData() {
    const authStore = useAuthStore();
    axios.defaults.headers.common['Authorization'] = 'Bearer '+authStore.authToken;
    const hotelsData = ref([]);
    const rows = ref(0);
    const load = ref(false);
    const getHotel = async (page) => {
      try {
        const response = await axios.get('/api/hotels?page=' + page);
        hotelsData.value = response.data.data;
        rows.value = response.data.last_page;
        load.value = true;
      } catch (error) {
        load.value = false;
      }
    };
  
    onMounted(() => {
      getHotel(1);
    });
  
    return {
      hotelsData,
      rows,
      load,
      getHotel, // También puedes exponer esta función si deseas cargar datos en respuesta a eventos en la interfaz de usuario
    };
  }