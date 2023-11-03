import axios from 'axios';
import {ref,onMounted} from 'vue';
import { useAuthStore } from '../../stores/auth';


export function useGetTypeRooms() {
    const authStore = useAuthStore();
    axios.defaults.headers.common['Authorization'] = 'Bearer '+authStore.authToken;
    const typeRoomData = ref([]);
    const getTypeRoom = async () => {
        const response = await axios.get('/api/typerooms-all');
        typeRoomData.value = response.data;
    };
  
    onMounted(() => {
      getTypeRoom(1);
    });
  
    return {
      typeRoomData
        };
  }

