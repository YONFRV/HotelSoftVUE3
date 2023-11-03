import { confirmation } from "../../functions";

export function useRoomDelete() {
    const deleteRoom = (id, name) => {
        confirmation(name, "/api/rooms/" + id, "/room");
      };
      return {
        deleteRoom,
      };
}
