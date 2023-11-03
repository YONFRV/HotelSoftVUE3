import { confirmation } from "../../functions";

export function useTypeRoomDelete() {
    const deleteTypeRoom = (id, name) => {
        confirmation(name, "/api/typerooms/" + id, "/type-romm");
      };
      return {
        deleteTypeRoom,
      };
}