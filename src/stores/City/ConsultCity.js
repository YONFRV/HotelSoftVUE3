import axios from 'axios';
import {ref,onMounted} from 'vue';
import { useAuthStore } from '../auth';


export function useGetCity() {
    const authStore = useAuthStore();
    axios.defaults.headers.common['Authorization'] = 'Bearer '+authStore.authToken;
    const CityData = ref([]);
    const getCity = async () => {
        const response = await axios.get('/api/citys-all');
        CityData.value = response.data;
    };
  
    onMounted(() => {
      getCity(1);
    });
  
    return {
      CityData
        };
  }

