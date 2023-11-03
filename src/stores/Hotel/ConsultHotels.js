import axios from 'axios';
import {ref,onMounted} from 'vue';
import { useAuthStore } from '../auth';


export function useGetHotels() {
    const authStore = useAuthStore();
    axios.defaults.headers.common['Authorization'] = 'Bearer '+authStore.authToken;
    const hotelsData = ref([]);
    const getHotel = async () => {
        const response = await axios.get('/api/hotel-all');
        hotelsData.value = response.data;
    };
  
    onMounted(() => {
      getHotel(1);
    });
  
    return {
      hotelsData
        };
  }

