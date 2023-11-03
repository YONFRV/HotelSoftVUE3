import axios from 'axios';
import {ref,onMounted} from 'vue';
import { useAuthStore } from '../auth';


export function useGetAccommodations() {
    const authStore = useAuthStore();
    axios.defaults.headers.common['Authorization'] = 'Bearer '+authStore.authToken;
    const accommodationsData = ref([]);
    const getAccommodations = async () => {
        const response = await axios.get('/api/accommodations-all');
        accommodationsData.value = response.data;
    };
  
    onMounted(() => {
      getAccommodations(1);
    });
  
    return {
      accommodationsData
        };
  }

