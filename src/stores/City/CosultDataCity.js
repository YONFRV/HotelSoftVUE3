import axios from 'axios';
import {ref,onMounted} from 'vue';
import { useAuthStore } from '../auth';


export function useGetcitysData() {
    const authStore = useAuthStore();
    axios.defaults.headers.common['Authorization'] = 'Bearer '+authStore.authToken;
    const citysData = ref([]);
    const rows = ref(0);
    const load = ref(false);
    const getcitys = async (page) => {
      try {
        const response = await axios.get('/api/cityssl?page=' + page);
        citysData.value = response.data.data;
        rows.value = response.data.last_page;
        load.value = true;
      } catch (error) {
        load.value = false;
      }
    };
  
    onMounted(() => {
      getcitys(1);
    });
  
    return {
      citysData,
      rows,
      load,
      getcitys, // También puedes exponer esta función si deseas cargar datos en respuesta a eventos en la interfaz de usuario
    };
  }

