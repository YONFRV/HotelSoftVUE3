import { confirmation } from "../../functions";

export function useCityDelete() {
    const deleteCity = (id, name) => {
        confirmation(name, "/api/citys/" + id, "/city");
      };
      return {
        deleteCity,
      };
}