import { confirmation } from "../../functions";

export function useAccommodationDelete() {
    const deleteAccommodation = (id, name) => {
        confirmation(name, "/api/accommodations/" + id, "/accommodation");
      };
      return {
        deleteAccommodation,
      };
}