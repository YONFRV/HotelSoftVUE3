import { confirmation } from "../../functions";

export function useHotelDelete() {
    const deleteHotel = (id, name) => {
        confirmation(name, "/api/hotels/" + id, "/hotel");
      };
      return {
        deleteHotel,
      };
}
