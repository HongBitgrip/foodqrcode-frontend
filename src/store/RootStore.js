import { UiState } from "./UiState";
import { RestaurantStore } from "./RestaurantStore";

class RootStore {
  constructor() {
    this.uiState = new UiState(this);
    this.restaurantState = new RestaurantStore(this);
  }
}

const storeInstance = new RootStore();
export default storeInstance;
