import axios from 'axios';
import {ref,onMounted} from 'vue';
import { useAuthStore } from '../../stores/auth';


export function useGetAccommodationData() {
    const authStore = useAuthStore();
    axios.defaults.headers.common['Authorization'] = 'Bearer '+authStore.authToken;
    const accommodationData = ref([]);
    const rows = ref(0);
    const load = ref(false);
    const getAccommodation = async (page) => {
      try {
        console.log('data'.page)
        const response = await axios.get('/api/accommodationssl?page=' + page);
        accommodationData.value = response.data.data;
        rows.value = response.data.last_page;
        load.value = true;
      } catch (error) {
        console.error('Error al obtener datos de hoteles:', error);
        load.value = false;
      }
    };
  
    onMounted(() => {
      getAccommodation(1);
    });
  
    return {
      accommodationData,
      rows,
      load,
      getAccommodation, // También puedes exponer esta función si deseas cargar datos en respuesta a eventos en la interfaz de usuario
    };
  }